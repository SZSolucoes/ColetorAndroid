import React, { Component } from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight 
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { 
       modificaCodCorte,
       modificaListaItem,
       modificaCodItem,
       modificaDescItem,
       modificaUn,
       modificaLote,
       modificaObrigatorio,
       modificaLocalizacao,
       modificaCorteSelec,
       modificaItemCorteSelec
} from '../../../actions/CorteCabosActions';

class ListaCorteCabos extends Component {
    onPressItem(corte) {
        this.props.modificaListaItem(corte.itens);
        this.props.modificaCodCorte(corte.codCorte);

        const item = corte.itens[0];
        const { codItem, descItem, un, lote, obrigatorio, localizacao } = item;

        this.props.modificaCodItem(codItem);
        this.props.modificaDescItem(descItem);
        this.props.modificaUn(un);
        this.props.modificaLote(lote);
        this.props.modificaObrigatorio(obrigatorio);
        this.props.modificaLocalizacao(localizacao);
        this.props.modificaCorteSelec(corte);
        this.props.modificaItemCorteSelec(item);

        Actions.pop();
    }
    keyExtractor(item, index) {
        const chave = item.codCorte;
        return (
            chave
        );
    }
    renderSeparator = () => {
        return (
            <View
                style={{
                height: 1,
                width: '100%',
                backgroundColor: '#607D8B',
                }}
            />
        );
    }
    renderItem = ({ item }) => {
        console.log(item);
        return (
            <TouchableHighlight
                onPress={() => this.onPressItem(item)}
            >
                <View style={styles.item}>
                    <Text style={styles.itemCodCorte}>{ item.codCorte}</Text>
                    <Text style={styles.itemLocal}>{ item.local}</Text>
                </View>
            </TouchableHighlight>            
        );
    }
    renderHeader = () => {
        const headerView = (
            <View style={styles.header}>
                <Text style={[styles.titleHeader, { flex: 1 }]}> 
                    Corte
                </Text>
                <Text style={styles.titleHeader}> 
                    Localização
                </Text>                
            </View>
        );
        return headerView;
    };
    render() {
        console.log(this.props.listaCortes);
        return (
            <View style={styles.viewLista}>
                <FlatList
                    data={this.props.listaCortes}
                    style={styles.container}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    numColumns='1'
                    ListHeaderComponent={this.renderHeader}
                    stickyHeaderIndices={[0]}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return (
        {
            listaCortes: state.CorteCabosReducer.listaCortes,
            codCorte: state.CorteCabosReducer.codCorte,
            local: state.CorteCabosReducer.local
        }
    );
};

export default connect(
    mapStateToProps, 
    { 
        modificaCodCorte,
        modificaListaItem,
        modificaCodItem,
        modificaDescItem,
        modificaUn,
        modificaLote,
        modificaObrigatorio,
        modificaLocalizacao,
        modificaCorteSelec,
        modificaItemCorteSelec
    }
)(ListaCorteCabos);

const styles = StyleSheet.create({
    viewLista: {
        flex: 1,
        backgroundColor: '#4b86b4'
    },
    container: {
        flex: 1,
        marginTop: 5,
        paddingHorizontal: 5,
        backgroundColor: '#4b86b4'
    },
    item: {
        backgroundColor: '#20293F',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 2,
        paddingHorizontal: 5
    },
    itemCodCorte: {
        color: '#fff',
        flex: 1,
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontSize: 14
    },
    itemDtCorte: {
        color: '#fff',
        flex: 1,
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontSize: 14
    },
    itemLocal: {
        color: '#fff',
        flex: 2,
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontSize: 14
    },
    header: {
        width: '100%', 
        height: 25, 
        backgroundColor: '#63ace5', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1
    },
    titleHeader: {
        textAlign: 'center', 
        color: '#fff', 
        fontSize: 14, 
        flex: 2, 
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium'
    }
});

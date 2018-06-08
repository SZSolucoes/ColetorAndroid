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
    modificaFornec,
    modificaNrNotaFis,
    modificaQtConferir,
    modificaQtTotal,
    modificaListaItem,
    modificaCodItem,
    modificaDesItem,
    modificaUnidMed,
    modificaNotaConfere,
    modificaItemConfere,
    modificaLocalPad    
} from '../../../actions/ConfereActions';

class ListaNotaFiscal extends Component {
    onPressItem(nota) {
        const item = nota.itens[0];
        const qtdConf = nota.itens.length;

        this.props.modificaFornec(nota.nomeEmit);
        this.props.modificaNrNotaFis(nota.nroDocto);
        this.props.modificaQtTotal(nota.qtdItem);
        this.props.modificaQtConferir(_.toString(qtdConf));
        this.props.modificaListaItem(nota.itens);
        this.props.modificaCodItem(item.itCode);
        this.props.modificaDesItem(item.itDesc);
        this.props.modificaLocalPad(item.localiz);
        this.props.modificaUnidMed(item.un);
        this.props.modificaNotaConfere(nota);
        this.props.modificaItemConfere(item);

        Actions.pop();
    }
    keyExtractor(item, index) {
        const chave = item.nroDocto + item.codEmit;
        console.log(chave);
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
        return (
            <TouchableHighlight
                onPress={() => this.onPressItem(item)}
            >
                <View style={styles.item}>
                    <Text style={styles.itemNroDoc}>{ item.nroDocto}</Text>
                    <Text style={styles.itemSerie}>{ item.serie}</Text>
                    <Text style={styles.itemEmitente}>{ item.codEmit}</Text>
                    <Text style={styles.itemNatureza}>{ item.natOper}</Text>
                </View>
            </TouchableHighlight>            
        );
    }
    renderHeader = () => {
        const headerView = (
            <View style={styles.header}>
                <Text style={styles.titleHeader}> 
                    Documento
                </Text>
                <Text style={[styles.titleHeader, { flex: 1 }]}> 
                    Série
                </Text>
                <Text style={styles.titleHeader}> 
                    Emitente
                </Text>
                <Text style={styles.titleHeader}> 
                    Natur Oper
                </Text>
            </View>
        );

        return headerView;
    };
    render() {
        return (
            <View style={styles.viewLista}>
                <FlatList
                    data={this.props.listaNF}
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
            listaNF: state.ConfereReducer.listaNF,
            nrNotaFis: state.ConfereReducer.nrNotaFis, 
            fornec: state.ConfereReducer.fornec,
            qtTotal: state.ConfereReducer.qtTotal,
            qtConferir: state.ConfereReducer.qtConferir,
            listaItem: state.ConfereReducer.listaItem
        }
    );
};

export default connect(
    mapStateToProps, 
    { 
        modificaFornec,
        modificaNrNotaFis,
        modificaQtConferir,
        modificaQtTotal,
        modificaListaItem,
        modificaCodItem,
        modificaDesItem,
        modificaUnidMed,
        modificaNotaConfere,
        modificaItemConfere,
        modificaLocalPad
    }
)(ListaNotaFiscal);

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
    itemNroDoc: {
        color: '#fff',
        flex: 2,
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontSize: 14
    },
    itemNatureza: {
        color: '#fff',
        flex: 2,
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontSize: 14
    },
    itemSerie: {
        color: '#fff',
        flex: 1,
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontSize: 14
    },
    itemEmitente: {
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

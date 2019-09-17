/* eslint-disable max-len */
import React from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight,
    ScrollView,
    Dimensions
} from 'react-native';

import { connect } from 'react-redux';

import { 
    modificaListaItem,
    modificaSequencia,
    modificaQtdItem,
    modificaObrigatorio,
    modificaNomeAbrev,
    modificaPedido,
    modificaEmbarque,
    modificaCodItem,
    modificaDescItem,
    modificaUn,
    modificaLote,
    modificaLocalizacao,
    modificaItemCorteSelec
} from '../../../actions/CorteCabosActions';

class ListaItem extends React.PureComponent {
    constructor(props) {
        super(props);

        this.pureFunctionComponentRenderItem = React.memo(this.renderItem);

        this.renderItem = this.renderItem.bind(this);
        this.state = { width: Dimensions.get('window').width };
    }

    onPressItem(item) {
        const { codItem, descItem, un, lote, obrigatorio, localizacao } = item;

        this.props.modificaCodItem(codItem);
        this.props.modificaDescItem(descItem);
        this.props.modificaUn(un);
        this.props.modificaLote(lote);
        this.props.modificaObrigatorio(obrigatorio);
        this.props.modificaLocalizacao(localizacao);
        this.props.modificaItemCorteSelec(item);
    }

    keyExtractor(item) {
        const chave = item.sequencia + item.ean1 + item.lote;
        return (
            chave
        );
    }

    renderSeparator() {
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
                <View
                    style={styles.item}
                >
                    <Text style={[styles.itemCol, { flex: 1 }]}>{item.sequencia}</Text>
                    <Text style={[styles.itemCol, { flex: 2 }]}>{item.qtdItem}</Text>
                    <Text style={[styles.itemCol, { flex: 2 }]}>{item.obrigatorio}</Text>
                    <Text style={[styles.itemCol, { flex: 2 }]}>{item.nomeAbrev}</Text>
                    <Text style={[styles.itemCol, { flex: 2 }]}>{item.pedido}</Text>
                    <Text style={[styles.itemCol, { flex: 2 }]}>{item.embarque}</Text>
                </View>
            </TouchableHighlight>            
        ); 
    }

    renderHeader = () => {
        const headerView = (
            <View style={styles.header}>
                <Text style={[styles.headerText, { flex: 1 }]}> 
                    Seq
                </Text>
                <Text style={[styles.headerText, { flex: 2 }]}> 
                    Quantidade
                </Text>
                <Text style={[styles.headerText, { flex: 2 }]}> 
                    Obrigatório
                </Text>
                <Text style={[styles.headerText, { flex: 2 }]}> 
                    Cliente
                </Text>
                <Text style={[styles.headerText, { flex: 2 }]}> 
                    Pedido
                </Text>
                <Text style={[styles.headerText, { flex: 2 }]}> 
                    Embarque
                </Text>                
            </View>
        );

        return headerView;
    };
    
    render() {
        return (
            <ScrollView horizontal>
                <FlatList
                    stickyHeaderIndices={[0]}
                    data={this.props.listaItem}
                    style={[styles.container, { width: this.state.width + 150 }]}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={this.keyExtractor}
                    renderItem={(propsItem) => <this.pureFunctionComponentRenderItem {...propsItem} />}
                    extraData={this.props}
                    ListHeaderComponent={this.renderHeader}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => (
    {
        listaItem: state.CorteCabosReducer.listaItem,
        sequencia: state.CorteCabosReducer.sequencia,
        qtdItem: state.CorteCabosReducer.qtdItem,
        obrigatorio: state.CorteCabosReducer.obrigatorio,
        nomeAbrev: state.CorteCabosReducer.nomeAbrev,
        pedido: state.CorteCabosReducer.pedido,
        embarque: state.CorteCabosReducer.embarque,
        codItem: state.CorteCabosReducer.codItem,
        descItem: state.CorteCabosReducer.descItem,
        um: state.CorteCabosReducer.um,
        lote: state.CorteCabosReducer.lote
    }
);

export default connect(mapStateToProps, 
    { 
        modificaListaItem,
        modificaSequencia,
        modificaQtdItem,
        modificaObrigatorio,
        modificaNomeAbrev,
        modificaPedido,
        modificaEmbarque,
        modificaCodItem,
        modificaDescItem,
        modificaUn,
        modificaLote,
        modificaLocalizacao,
        modificaItemCorteSelec
    }
)(ListaItem);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
        backgroundColor: 'rgba(255,255,255,0.2)'
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
    itemUser: {
        backgroundColor: '#EEC863',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 2,
        paddingHorizontal: 5
    },
    itemErro: {
        backgroundColor: '#9C0305',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 2,
        paddingHorizontal: 5
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemCol: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'sans-serif-medium'
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
    headerText: { 
        textAlign: 'center', 
        color: '#fff', 
        fontSize: 14,
        fontFamily: 'sans-serif-medium' 
    }
});

import React from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';

import { connect } from 'react-redux';
import ListaItemConsEtiqBatPc from './ListaItemConsEtiqBatPc';

class ListaItemConsEtiqBat extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { width: Dimensions.get('window').width };
        this.changedOrientation = this.changedOrientation.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.changedOrientation);
    }
    
    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.changedOrientation);
    }

    changedOrientation(e) {
        this.setState({ width: e.window.width });
    }
    
    keyExtractor(item, index) {
        return index.toString();
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

    renderItem({ item, index }) {
        return (
            <ListaItemConsEtiqBatPc
                key={index}
                item={item}
                styles={styles}
            />
        );
    }

    renderHeader = () => {
        const headerView = (
            <View style={styles.header}>
                <Text style={[styles.embarque, styles.sizeFldHeader]}> 
                    Embarque
                </Text>
                <Text style={[styles.itCode, styles.sizeFldHeader]}> 
                    Código
                </Text>
                <Text style={[styles.nome, styles.sizeFldHeader]}> 
                    Nome
                </Text>
                <Text style={[styles.pedido, styles.sizeFldHeader]}> 
                    Pedido
                </Text>
                <Text style={[styles.notaFiscal, styles.sizeFldHeader]}> 
                    Nota Fis
                </Text>
                <Text style={[styles.situacao, styles.sizeFldHeader]}> 
                    Situac
                </Text>
                <Text style={[styles.qtdItem, styles.sizeFldHeader]}> 
                    Qtd Item
                </Text>
                <Text style={[styles.qtdSepara, styles.sizeFldHeader]}> 
                    Qtd Sep
                </Text>
                <Text style={[styles.qtdConfere, styles.sizeFldHeader]}> 
                    Qtd Conf
                </Text>
                <Text style={[styles.range, styles.sizeFldHeader]}> 
                    Range
                </Text>
                <Text style={[styles.separador, styles.sizeFldHeader]}> 
                    Separador
                </Text>
                <Text style={[styles.conferente, styles.sizeFldHeader]}> 
                    Conferente
                </Text>
                <Text style={[styles.depos, styles.sizeFldHeader]}> 
                    Depósito
                </Text>
                <Text style={[styles.local, styles.sizeFldHeader]}> 
                    Local
                </Text>
            </View>
        );

        return headerView;
    };
    render() {
        return (
            <ScrollView horizontal >
                <FlatList
                    data={this.props.listaItens}
                    style={[styles.container, { width: this.state.width + 1000 }]}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    extraData={this.props}
                    numColumns='1'
                    ListHeaderComponent={this.renderHeader}
                    alwaysBounceHorizontal
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    listaItens: state.ConsEtiqBatSaidaReducer.listaItens
});

export default connect(mapStateToProps, {})(ListaItemConsEtiqBat);

const styleField = {
    itemHeaderAndRow: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'sans-serif-medium'
    }
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        width: 500,
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    item: {
        backgroundColor: '#20293F',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 2,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    embarque: { 
        ...styleField.itemHeaderAndRow, 
        flex: 5
    },
    itCode: { 
        ...styleField.itemHeaderAndRow, 
        flex: 7 
    },
    nome: { 
        ...styleField.itemHeaderAndRow, 
        flex: 7 
    },
    pedido: { 
        ...styleField.itemHeaderAndRow, 
        flex: 5
    },
    notaFiscal: { 
        ...styleField.itemHeaderAndRow, 
        flex: 5 
    },
    situacao: { 
        ...styleField.itemHeaderAndRow, 
        flex: 5
    },
    qtdItem: { 
        ...styleField.itemHeaderAndRow, 
        flex: 5 
    },
    qtdConfere: { 
        ...styleField.itemHeaderAndRow, 
        flex: 5
    },
    qtdSepara: { 
        ...styleField.itemHeaderAndRow, 
        flex: 5
    },
    range: { 
        ...styleField.itemHeaderAndRow, 
        flex: 5 
    },
    separador: { 
        ...styleField.itemHeaderAndRow, 
        flex: 6 
    },
    conferente: { 
        ...styleField.itemHeaderAndRow, 
        flex: 6 
    },
    depos: { 
        ...styleField.itemHeaderAndRow, 
        flex: 6 
    },
    local: { 
        ...styleField.itemHeaderAndRow, 
        flex: 6 
    },
    sizeFldHeader: {
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
    }
});

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
import ListaItemSepPc from './ListaItemSepPc';

import {
    modificaUm, 
    modificaQtdSep,
    modificaCodItem,
    modificaDesItem,
    modificaLocalizacao,
    modificaLote,
    modificaQuantidade,
    modificaCodEAN,
    modificaItemSelected 
} from '../../../actions/ListaSeparacaoActions';

class ListaItemSep extends React.PureComponent {
    constructor(props) { 
        super(props);

        this.state = { width: Dimensions.get('window').width };
        this.changedOrientation = this.changedOrientation.bind(this);
        this.onPressItem = this.onPressItem.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.changedOrientation);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.changedOrientation);
    }

    onPressItem(item, index) {
        const {
            un,
            qtdItem,
            itCode,
            itDesc,
            local,
            lote
        } = item;
        this.props.modificaUm(un);
        this.props.modificaQtdSep(qtdItem);
        this.props.modificaCodItem(itCode);
        this.props.modificaDesItem(itDesc);
        this.props.modificaLocalizacao(local);
        this.props.modificaLote(lote);
        this.props.modificaQuantidade('');
        this.props.modificaCodEAN('');
        this.props.modificaItemSelected(index);
        return false;
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
        let itemSelected = false;
        if (index === this.props.itemSelected) {
            itemSelected = true;
        }
        return (
            <ListaItemSepPc 
                key={index} 
                index={index} 
                item={item} 
                onPressItem={this.onPressItem}
                itemSelected={itemSelected}
            />
        );
    }
 
    renderHeader = () => {
        const headerView = (
            <View style={styles.header}>
                <Text style={[styles.codigo, styles.sizeFldHeader]}> 
                    Código
                </Text>
                <Text style={[styles.descricao, styles.sizeFldHeader]}> 
                    Descrição
                </Text>
                <Text style={[styles.qtdASep, styles.sizeFldHeader]}> 
                    Qtd Sep
                </Text>
                <Text style={[styles.localizacao, styles.sizeFldHeader]}> 
                    Localização
                </Text>
                <Text style={[styles.lote, styles.sizeFldHeader]}> 
                    Lote
                </Text>
                <Text style={[styles.seq, styles.sizeFldHeader]}> 
                    Seq
                </Text>
            </View>
        );

        return headerView;
    };
    render() {
        return (
            <View {...this.props} >
                <ScrollView horizontal>
                    <FlatList
                        stickyHeaderIndices={[0]}
                        data={this.props.listaItensSepPc}
                        extraData={this.state}
                        style={[styles.container, { width: this.state.width + 300 }]}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                        ListHeaderComponent={this.renderHeader}
                        initialNumToRender={10}
                    />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    listaItensSepPc: state.ListaSeparacaoReducer.listaItensSepPc,
    itemSelected: state.ListaSeparacaoReducer.itemSelected
});

export default connect(mapStateToProps, {
    modificaUm, 
    modificaQtdSep,
    modificaCodItem,
    modificaDesItem,
    modificaLocalizacao,
    modificaLote,
    modificaQuantidade,
    modificaCodEAN,
    modificaItemSelected
})(ListaItemSep);

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
        flex: 1,
        marginVertical: 20,
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    codigo: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1.5 
    },
    descricao: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2.5 
    },
    qtdASep: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1 
    },
    localizacao: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2 
    },
    lote: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2 
    },
    seq: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1 
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

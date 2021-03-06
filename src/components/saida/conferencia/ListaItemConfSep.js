import React, { Component } from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';

import { connect } from 'react-redux';
import _ from 'lodash';
import ListaItemConfSepPc from './ListaItemConfSepPc';

import {
    modificaQtde,
    modificaCodItem,
    modificaUm,
    modificaLote,
    modificaItemDesc,
    modificaSeparador,
    modificaLocalizacao,
    modificaItemSelected 
} from '../../../actions/ConfereSaidaActions';

class ListaItemConfSep extends Component {

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
            itCode,
            un,
            itDesc,
            local
        } = item;

        this.props.modificaQtde('');
        this.props.modificaCodItem(itCode);
        this.props.modificaUm(un);
        this.props.modificaLote('');
        this.props.modificaItemDesc(itDesc);
        this.props.modificaLocalizacao(local);
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
        let itemStyle = {};
        if (index === this.props.itemSelected) {
            itemSelected = true;
        }

        if (item.ean1.length > 0 ||
            item.ean2.length > 0 ||
            item.ean3.length > 0 ||
            item.ean4.length > 0 ||
            item.ean5.length > 0) {
             const itemsFound = _.filter(
                 this.props.listItems, 
                 (o) => o.itCode === item.itCode).length;
             if (itemsFound > 1) {
                 itemStyle = {
                    backgroundColor: '#EEC863',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    flexDirection: 'row',
                    marginVertical: 2,
                    paddingHorizontal: 5
                };
             }
        } else {
            itemStyle = {
                backgroundColor: '#9C0305',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                flexDirection: 'row',
                marginVertical: 2,
                paddingHorizontal: 5
            };
        }

        return (
            <ListaItemConfSepPc 
                key={index} 
                index={index} 
                item={item} 
                onPressItem={this.onPressItem}
                itemSelected={itemSelected}
                itemStyle={itemStyle}
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
                <Text style={[styles.qtd, styles.sizeFldHeader]}> 
                    Qtd
                </Text>
                <Text style={[styles.localizacao, styles.sizeFldHeader]}> 
                    Local
                </Text>
                <Text style={[styles.lote, styles.sizeFldHeader]}> 
                    Lote
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
                        data={this.props.listItems}
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
    listItems: state.ConfereSaidaReducer.listItems,
    itemSelected: state.ConfereSaidaReducer.itemSelected
});

export default connect(mapStateToProps, {
    modificaQtde,
    modificaCodItem,
    modificaUm,
    modificaLote,
    modificaItemDesc,
    modificaSeparador,
    modificaLocalizacao,
    modificaItemSelected 
})(ListaItemConfSep);

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
    qtd: { 
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

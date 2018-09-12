import React, { Component } from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight 
} from 'react-native';

import { connect } from 'react-redux';
import _ from 'lodash';

import { 
    modificaListaItem,
    modificaCodItem,
    modificaDesItem,
    modificaUnidMed,
    modificaItemConfere,
    modificaLocalPad
} from '../../../actions/ConfereActions';

class ListaItem extends Component {

    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
    }


    onPressItem(item) {
        const { itCode, itDesc, un, localiz } = item;

        this.props.modificaCodItem(itCode);
        this.props.modificaDesItem(itDesc);
        this.props.modificaUnidMed(un);
        this.props.modificaLocalPad(localiz);
        this.props.modificaItemConfere(item);
    }

    keyExtractor(item) {
        return (
            item.seq
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
        const listaItem = this.props.listaItem;
        // Se pelo menos um ean estiver disponivel entao não possue erro 
        if (item.ean1.length > 0 ||
            item.ean2.length > 0 ||
            item.ean3.length > 0 ||
            item.ean4.length > 0 ||
            item.ean5.length > 0) {
                const itemsFound = _.filter(listaItem, (o) => o.itCode === item.itCode).length;
                if (itemsFound > 1) {
                    return (
                        <TouchableHighlight
                            onPress={() => this.onPressItem(item)}
                        >
                            <View
                                style={styles.itemClone}
                            >
                                <Text style={styles.itemSeq}>{item.seq}</Text>
                                <Text style={styles.itemCode}>{item.itCode}</Text>
                                <Text style={styles.itemDesc}>{item.itDescAbrev}</Text>
                            </View>
                        </TouchableHighlight>            
                    ); 
                }
                return (
                    <TouchableHighlight
                        onPress={() => this.onPressItem(item)}
                    >
                        <View
                            style={styles.item}
                        >
                            <Text style={styles.itemSeq}>{item.seq}</Text>
                            <Text style={styles.itemCode}>{item.itCode}</Text>
                            <Text style={styles.itemDesc}>{item.itDescAbrev}</Text>
                        </View>
                    </TouchableHighlight>            
                );
            }
            
            return (
                <TouchableHighlight
                    onPress={() => this.onPressItem(item)}
                >
                    <View
                        style={styles.itemErro}
                    >
                        <Text style={styles.itemSeq}>{item.seq}</Text>
                        <Text style={styles.itemCode}>{item.itCode}</Text>
                        <Text style={styles.itemDesc}>{item.itDescAbrev}</Text>
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
                    Código
                </Text>
                <Text style={[styles.headerText, { flex: 4 }]}> 
                    Descrição
                </Text>
            </View>
        );

        return headerView;
    };
    
    render() {
        return (
            <FlatList
                data={this.props.listaItem}
                style={styles.container}
                ItemSeparatorComponent={this.renderSeparator}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                extraData={this.props}
                numColumns='1'
                ListHeaderComponent={this.renderHeader}
            />
        );
    }
}

const mapStateToProps = state => (
    {
        listaItem: state.ConfereReducer.listaItem,
        itemConfere: state.ConfereReducer.itemConfere
    }
);

export default connect(mapStateToProps, 
    { 
        modificaListaItem,
        modificaCodItem,
        modificaDesItem,
        modificaUnidMed,
        modificaItemConfere,
        modificaLocalPad
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
    itemClone: {
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
    itemSeq: {
        color: '#fff',
        flex: 1,
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'sans-serif-medium'
    },
    itemDesc: {
        color: '#fff',
        flex: 4,
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'sans-serif-medium'
    },
    itemCode: {
        color: '#fff',
        flex: 2,
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

import React, { Component } from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight,
    ScrollView 
} from 'react-native';

import { connect } from 'react-redux';

class ListaItemConsEtiqBat extends Component {

    constructor(props) {
        super(props);
        this.state = { listaItens: [
            { seq: '001', itCode: '00001', itDescAbrev: 'Descri', qtde: '1000', local: '01', lote: '01' },
            { seq: '002', itCode: '00002', itDescAbrev: 'Descri', qtde: '200', local: '02', lote: '01' },
            { seq: '003', itCode: '00001', itDescAbrev: 'Descri', qtde: '100', local: '03', lote: '01' },
            { seq: '004', itCode: '00002', itDescAbrev: 'Descri', qtde: '600', local: '01', lote: '01' },
            { seq: '005', itCode: '00003', itDescAbrev: 'Descri', qtde: '300', local: '01', lote: '01' }] };
    }
    
    keyExtractor(item, index) {
        return (
            item.seq
        );
    }
    renderSeparator = () => {
        const viewSep = (
            <View
                style={{
                height: 1,
                width: '100%',
                backgroundColor: '#607D8B',
                }}
            />
        );

        return viewSep;
    }
    renderItem = ({ item }) => {
        const viewItem = (
            <TouchableHighlight
                onPress={() => false}
            >
                <View
                    style={styles.item}
                >
                    <Text style={styles.seq}>{item.seq}</Text>
                    <Text style={styles.itCode}>{item.itCode}</Text>
                    <Text style={styles.itDescAbrev}>{item.itDescAbrev}</Text>
                    <Text style={styles.qtde}>{item.qtde}</Text>
                    <Text style={styles.local}>{item.local}</Text>
                    <Text style={styles.lote}>{item.lote}</Text>
                </View>
            </TouchableHighlight>            
        );

        return viewItem;
    }
    renderHeader = () => {
        const headerView = (
            <View style={styles.header}>
                <Text style={[styles.seq, styles.sizeFldHeader]}> 
                    Seq
                </Text>
                <Text style={[styles.itCode, styles.sizeFldHeader]}> 
                    Código
                </Text>
                <Text style={[styles.itDescAbrev, styles.sizeFldHeader]}> 
                    Descrição
                </Text>
                <Text style={[styles.qtde, styles.sizeFldHeader]}> 
                    Qtde
                </Text>
                <Text style={[styles.local, styles.sizeFldHeader]}> 
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
            <ScrollView horizontal >
                <FlatList
                    data={this.state.listaItens}
                    style={styles.container}
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

const mapStateToProps = state => {
    const maps = (
        {

        }
    );

    return maps;
};

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
        paddingHorizontal: 5
    },
    seq: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2 
    },
    itCode: { 
        ...styleField.itemHeaderAndRow, 
        flex: 6 
    },
    itDescAbrev: { 
        ...styleField.itemHeaderAndRow, 
        flex: 6 
    },
    qtde: { 
        ...styleField.itemHeaderAndRow, 
        flex: 6 
    },
    local: { 
        ...styleField.itemHeaderAndRow, 
        flex: 6 
    },
    lote: { 
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

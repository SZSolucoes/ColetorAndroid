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

class ListaItemConfSep extends Component {

    constructor(props) {
        super(props);
        this.state = { listaItens: [
            { seq: '001', itCode: '00001', itDescAbrev: 'Descri', num1: 'teste', num2: 'teste2' },
            { seq: '002', itCode: '00001', itDescAbrev: 'Descri', num1: 'teste', num2: 'teste2' },
            { seq: '003', itCode: '00001', itDescAbrev: 'Descri', num1: 'teste', num2: 'teste2' },
            { seq: '004', itCode: '00001', itDescAbrev: 'Descri', num1: 'teste', num2: 'teste2' },
            { seq: '005', itCode: '00001', itDescAbrev: 'Descri', num1: 'teste', num2: 'teste2' }] };
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
                    <Text style={styles.itemSeq}>{item.seq}</Text>
                    <Text style={styles.itemCode}>{item.itCode}</Text>
                    <Text style={styles.itemDesc}>{item.itDescAbrev}</Text>
                    <Text style={styles.itemDesc}>{item.num1}</Text>
                    <Text style={styles.itemDesc}>{item.num2}</Text>
                </View>
            </TouchableHighlight>            
        );

        return viewItem;
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
                <Text style={[styles.headerText, { flex: 4 }]}> 
                    Descrição
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

export default connect(mapStateToProps, {})(ListaItemConfSep);

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

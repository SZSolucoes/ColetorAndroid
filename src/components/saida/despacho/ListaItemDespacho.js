import React, { Component } from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';

class ListaItemDespacho extends Component {

    constructor(props) {
        super(props);
        this.state = { listaItens: [
            { seq: '001', volume: '000102' },
            { seq: '002', volume: '000102' },
            { seq: '003', volume: '000102' },
            { seq: '004', volume: '000102' },
            { seq: '005', volume: '000102' }] };
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
                    <Text style={styles.volume}>{item.seq}</Text>
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
                <Text style={[styles.volume, styles.sizeFldHeader]}> 
                    Volume
                </Text>
            </View>
        );

        return headerView;
    };
    render() {
        return (   
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

export default connect(mapStateToProps, {})(ListaItemDespacho);

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
    volume: { 
        ...styleField.itemHeaderAndRow, flex: 6 
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

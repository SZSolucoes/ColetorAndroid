import React, { Component } from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight 
} from 'react-native';

import { connect } from 'react-redux';

class ListaItemSep extends Component {
    
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
                onPress={() => this.onPressItem(item)}
            >
                <View
                    style={styles.item}
                >
                    <Text style={styles.seq}>{item.seq}</Text>
                    <Text style={styles.itCode}>{item.itCode}</Text>
                    <Text style={styles.itDescAbrev}>{item.itDescAbrev}</Text>
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

const mapStateToProps = state => {
    const maps = (
        {
            
        }
    );

    return maps;
};

export default connect(mapStateToProps, {})(ListaItemSep);

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
        justifyContent: 'center',
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

import React, { Component } from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight,
    Dimensions,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux';

class ListaItemSep extends Component {
 
    keyExtractor(item, index) {
        return (
            index
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
                    <Text style={styles.itCode}>{item.itCode}</Text>
                    <Text style={styles.itDesc}>{item.itDescAbrev}</Text>
                    <Text style={styles.itLocal}>{item.itDescAbrev}</Text>
                    <Text style={styles.itQtde}>{item.itDescAbrev}</Text>
                </View>
            </TouchableHighlight>            
        );

        return viewItem;
    }
    renderHeader = () => {
        const headerView = (
            <View style={styles.header}>
                <Text style={[styles.itCode, styles.sizeFldHeader]}> 
                    Código
                </Text>
                <Text style={[styles.itDesc, styles.sizeFldHeader]}> 
                    Descrição
                </Text>
                <Text style={[styles.itLocal, styles.sizeFldHeader]}> 
                    Local
                </Text>
                <Text style={[styles.itQtde, styles.sizeFldHeader]}> 
                    Qtde
                </Text>
            </View>
        );

        return headerView;
    };
    render() {
        return (
            <ScrollView horizontal >
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
        width: Dimensions.get('window').width > Dimensions.get('window').height ? 
                Dimensions.get('window').width : Dimensions.get('window').height,
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
    itCode: { 
        ...styleField.itemHeaderAndRow, 
        flex: 4 
    },
    itDesc: { 
        ...styleField.itemHeaderAndRow, 
        flex: 6 
    },
    itLocal: { 
        ...styleField.itemHeaderAndRow, 
        flex: 4 
    },
    itQtde: { 
        ...styleField.itemHeaderAndRow, 
        flex: 4 
    },
    sizeFldHeader: {
        fontSize: 14
    },
    header: { 
        height: 25, 
        backgroundColor: '#63ace5', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1
    }
});

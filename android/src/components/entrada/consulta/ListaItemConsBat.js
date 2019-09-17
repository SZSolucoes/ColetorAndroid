import React, { Component } from 'react';
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

class ListaItemConsBat extends Component {

    constructor(props) {
        super(props);

        this.state = { width: Dimensions.get('window').width };
        this.changedOrientation = this.changedOrientation.bind(this);
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

    keyExtractor(item) {
        return (
            item.itCode
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
                    <Text style={styles.itCode}>{item.itCode}</Text>
                    <Text style={styles.itNf}>{item.nroDocto}</Text>
                    <Text style={styles.itSituac}>{item.situacao}</Text>
                    <Text style={styles.itDesc}>{item.itDesc}</Text>
                </View>
            </TouchableHighlight>            
        );

        return viewItem;
    }
    renderHeader = () => {
        const headerView = (
            <View style={styles.header}>
                <Text style={[styles.itCode, styles.sizeFldHeader]}> 
                    Item
                </Text>
                <Text style={[styles.itNf, styles.sizeFldHeader]}> 
                    Nota Fiscal
                </Text>
                <Text style={[styles.itSituac, styles.sizeFldHeader]}> 
                    Situação
                </Text>
                <Text style={[styles.itDesc, styles.sizeFldHeader]}> 
                    Descricão
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
                    style={[styles.container, { width: this.state.width + 300 }]}
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
            listaItens: state.ConsEtiqBatEntradaReducer.listaItens
        }
    );

    return maps;
};

export default connect(mapStateToProps, {})(ListaItemConsBat);

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
    itCode: { 
        ...styleField.itemHeaderAndRow, 
        flex: 4 
    },
    itDesc: { 
        ...styleField.itemHeaderAndRow, 
        flex: 8 
    },
    itNf: { 
        ...styleField.itemHeaderAndRow, 
        flex: 6 
    },
    itSituac: { 
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

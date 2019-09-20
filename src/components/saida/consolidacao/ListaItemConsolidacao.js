import React from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';
import { leftStr } from '../../utils/StrComplex';

class ListaItemConsolidacao extends React.PureComponent {
    constructor(props) {
        super(props);

        this.pureFunctionComponentRenderItem = React.memo(this.renderItem);
    }

    keyExtractor(item) {
        return (
            leftStr(item.seq)
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
                <View style={styles.item} >
                    <Text style={styles.seq}>{leftStr(item.seq)}</Text>
                    <Text style={styles.volume}>{item.vol}</Text> 
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
                    Etiq Volume
                </Text>
            </View>
        );

        return headerView;
    };
    render() {
        return (   
            <FlatList
                data={this.props.listaItens}
                style={styles.container}
                ItemSeparatorComponent={this.renderSeparator}
                keyExtractor={this.keyExtractor}
                renderItem={(propsItem) => <this.pureFunctionComponentRenderItem {...propsItem} />}
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
            listaItens: state.ConsolidacaoReducer.listaItens
        }
    );

    return maps;
};

export default connect(mapStateToProps, {})(ListaItemConsolidacao);

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
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    seq: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2 
    },
    volume: { 
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

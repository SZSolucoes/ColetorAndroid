import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    FlatList 
} from 'react-native';
import { connect } from 'react-redux';
import { 
    modificaListaItem
} from '../../actions/EstoqueActions';

const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }

    return data;
};

const numColumns = 1;

const dataItem = [{ 
    key: '1', 
    codLocaliz: '', 
    qtdItemEmb: '',
    qtdTotal: ''
}];

class ListaItem extends Component {
    componentWillMount() {
        console.log(this.props.listaItem);

        if (this.props.listaItem === undefined) {
            this.props.modificaListaItem(dataItem);
        }
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                height: 1,
                width: '100%',
                backgroundColor: '#607D8B',
                }}
            />
        );
    };

    renderHeader = () => {
        const headerView = (
            <View style={styles.header}>
                <Text style={styles.titleHeaderLocal}> 
                    Local
                </Text>
                <Text style={styles.titleHeader}> 
                    Disponível
                </Text>
                <Text style={styles.titleHeader}> 
                    Total
                </Text>
            </View>
        );

        return headerView;
    };

    renderItem = ({ item, index }) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
            <View
                style={styles.item}
            >
                <Text style={styles.local}>{item.codLocaliz}</Text>
                <Text style={styles.disp}>{item.qtdDisp}</Text>
                <Text style={styles.total}>{item.qtdTotal}</Text>
            </View>
        );
    };

    render() {
        console.log(this.props.listaItem);
        return (
            <FlatList
                data={formatData(this.props.listaItem, numColumns)}
                ItemSeparatorComponent={this.renderSeparator}
                style={styles.container}
                renderItem={this.renderItem}
                numColumns={numColumns}
                ListHeaderComponent={this.renderHeader}
            />
        );
    }
}

const mapStateToProps = state => (
    {
        listaItem: state.EstoqueReducer.listaItem
    }
);

export default connect(mapStateToProps, { modificaListaItem })(ListaItem);

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
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    local: {
        color: '#fff',
        flex: 2,
        textAlign: 'left',
        fontFamily: 'sans-serif-medium'
    },
    total: {
        color: '#fff',
        flex: 1,
        textAlign: 'center',
        fontFamily: 'sans-serif-medium'
    },
    disp: {
        color: '#fff',
        flex: 1,
        textAlign: 'center',
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
    titleHeader: {
        textAlign: 'center', 
        color: '#fff', 
        fontSize: 14, 
        flex: 1, 
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium'
    },
    titleHeaderLocal: {
        textAlign: 'center', 
        color: '#fff', 
        fontSize: 14, 
        flex: 2, 
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium'
    }
});

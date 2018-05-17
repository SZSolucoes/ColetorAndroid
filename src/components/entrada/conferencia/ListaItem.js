import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    FlatList 
} from 'react-native';
import { connect } from 'react-redux';
import { 
    modificaListaItemConf
} from '../../../actions/ConfereActions';

const dataItem = [{ 
    key: '1', 
    code: '', 
    descricao: ''
}];

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
                <Text style={{ textAlign: 'center', color: '#fff', fontSize: 16, flex: 1 }}> 
                    Seq
                </Text>
                <Text style={{ textAlign: 'center', color: '#fff', fontSize: 16, flex: 2 }}> 
                    Código
                </Text>
                <Text style={{ textAlign: 'center', color: '#fff', fontSize: 16, flex: 4 }}> 
                    Descrição
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
                <Text style={styles.itemSeq}>{item.key}</Text>
                <Text style={styles.itemCode}>{item.code}</Text>
                <Text style={styles.itemDesc}>{item.descricao}</Text>
            </View>
        );
    };

    render() {
        return (
            <FlatList
                data={formatData(dataItem, numColumns)}
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

export default connect(mapStateToProps, { modificaListaItemConf })(ListaItem);

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
    itemSeq: {
        color: '#fff',
        flex: 1,
        textAlign: 'center'
    },
    itemDesc: {
        color: '#fff',
        flex: 4,
        textAlign: 'center'
    },
    itemCode: {
        color: '#fff',
        flex: 2,
        textAlign: 'center'
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

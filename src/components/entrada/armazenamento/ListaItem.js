import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    FlatList 
} from 'react-native';

const data = [
    { key: '10', code: '0001', descricao: 'Teste 1' }, 
    { key: '20', code: '0002', descricao: 'Teste 2' }, 
    { key: '30', code: '0003', descricao: 'Teste 3' }, 
    { key: '40', code: '0004', descricao: 'Teste 4' }, 
    { key: '50', code: '0005', descricao: 'Teste 5' }, 
    { key: '60', code: '0006', descricao: 'Teste 6' }, 
    { key: '70', code: '0007', descricao: 'Teste 7' }, 
    { key: '80', code: '0008', descricao: 'Teste 8' },
    { key: '90', code: '0009', descricao: 'Teste 9' }, 
    { key: '100', code: '0010', descricao: 'Teste 10' },
    { key: '110', code: '0011', descricao: 'Teste 11' },
    // { key: 'L' },
];

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
export default class ListaItem extends React.Component {

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
                data={formatData(data, numColumns)}
                ItemSeparatorComponent={this.renderSeparator}
                style={styles.container}
                renderItem={this.renderItem}
                numColumns={numColumns}
                ListHeaderComponent={this.renderHeader}
            />
        );
    }
}

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

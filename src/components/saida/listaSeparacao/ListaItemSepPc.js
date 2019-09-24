import React, { PureComponent } from 'react';
import { 
    TouchableHighlight, 
    View, 
    Text,
    StyleSheet 
} from 'react-native';

export default class ListaItemSepPc extends PureComponent {
    onPressItem = (item, index) => () => this.props.onPressItem(item, index)

    render = () => {
        const itemSelected = (
            this.props.itemSelected ? 
            styles.selectedStyle : { borderWidth: 2.5, borderColor: '#4b86b4' }
        );
        return (
            <TouchableHighlight
                onPress={this.onPressItem({ ...this.props.item }, this.props.index)}
            >
                <View
                    style={[styles.item, itemSelected]} 
                >
                    <Text style={styles.codigo}>
                        {this.props.item.itCode}
                    </Text>
                    <Text style={styles.descricao}>
                        {this.props.item.itDescAbrev}
                    </Text>
                    <Text style={styles.qtdASep}>
                        {this.props.item.qtdItem}
                    </Text>
                    <Text style={styles.localizacao}>
                        {this.props.item.local}
                    </Text>
                    <Text style={styles.lote}>
                        {this.props.item.lote}
                    </Text>
                    <Text style={styles.seq}>
                        {this.props.item.seq}
                    </Text>
                </View>
            </TouchableHighlight>      
        );
    }
  }

const styleField = {
    itemHeaderAndRow: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'sans-serif-medium'
    }
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#20293F',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 2,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    selectedStyle: {
        borderWidth: 2.5,
        borderColor: 'rgba(255, 255, 255, 0.8)',
    },
    codigo: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1.5 
    },
    descricao: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2.5 
    },
    qtdASep: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1 
    },
    localizacao: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2 
    },
    lote: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2 
    },
    seq: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1 
    }
});

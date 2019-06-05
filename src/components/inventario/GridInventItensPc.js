import React, { PureComponent } from 'react';
import { 
    TouchableHighlight, 
    View, 
    Text,
    StyleSheet 
} from 'react-native';

export default class GridInventItensPc extends PureComponent {
    render() {
        const { 
            item, 
            itemSelected, 
            itemStyle,
            onPressItem,
            index 
        } = this.props;

        const itemSelectedStyle = (
            itemSelected ? 
            styles.selectedStyle : { borderWidth: 2.5, borderColor: '#4b86b4' }
        );
        
        return (
            <TouchableHighlight
                onPress={() => onPressItem({ ...item }, index)}
            >
                <View
                    style={[styles.item, itemSelectedStyle, itemStyle]} 
                >
                    <Text style={styles.localizacao}>
                        {item.localiz}
                    </Text>
                    <Text style={styles.localizacao}>
                        {item.agrup}
                    </Text>
                    <Text style={styles.codigo}>
                        {item.itCode}
                    </Text>
                    <Text style={styles.descricao}>
                        {item.itDescAbrev}
                    </Text>
                    <Text style={styles.lote}>
                        {item.lote}
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
    localizacao: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2 
    },
    lote: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2 
    }
});

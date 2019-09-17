import React, { PureComponent } from 'react';
import { 
    TouchableHighlight, 
    View, 
    Text,
    StyleSheet 
} from 'react-native';

export default class ConsultaNFPushItem extends PureComponent {

    onNFSelect() {
        this.props.onNFSelect(this.props.item.itens);
    }

    render() {
      return (
        <TouchableHighlight
            onPress={() => this.onNFSelect()}
        >
            <View style={styles.itemlist} >
                <Text style={styles.documento}>
                    {this.props.item.documento}
                </Text>
                <Text style={styles.serie}>
                    {this.props.item.serie}
                </Text> 
                <Text style={styles.emitente}>
                    {this.props.item.emitente}
                </Text> 
                <Text style={styles.naturezaope}>
                    {this.props.item.naturezaope}
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
    itemlist: {
        backgroundColor: '#20293F',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 2,
        paddingHorizontal: 5
    },
    documento: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2 
    },
    serie: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1 
    },
    emitente: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2 
    },
    naturezaope: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2 
    },
    situacao: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2 
    }
});


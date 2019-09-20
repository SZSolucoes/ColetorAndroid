import React, { PureComponent } from 'react';
import { 
    TouchableHighlight, 
    View, 
    Text,
    StyleSheet 
} from 'react-native';

export default class ConsultaNFItem extends PureComponent {
    render() {
      return (
        <TouchableHighlight
            onPress={() => false}
        >
            <View style={styles.itemlist} >
                <Text style={styles.seq}>
                    {this.props.item.seq}
                </Text>
                <Text style={styles.item}>
                    {this.props.item.item}
                </Text> 
                <Text style={styles.batismo}>
                    {this.props.item.batismo}
                </Text> 
                <Text style={styles.conferente}>
                    {this.props.item.conferente}
                </Text> 
                <Text style={styles.armazenador}>
                    {this.props.item.armazenador}
                </Text> 
                <Text style={styles.situacao}>
                    {this.props.item.situacao}
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
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    seq: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1 
    },
    item: { 
        ...styleField.itemHeaderAndRow, 
        flex: 4 
    },
    batismo: { 
        ...styleField.itemHeaderAndRow, 
        flex: 4 
    },
    conferente: { 
        ...styleField.itemHeaderAndRow, 
        flex: 4 
    },
    armazenador: { 
        ...styleField.itemHeaderAndRow, 
        flex: 4 
    },
    situacao: { 
        ...styleField.itemHeaderAndRow, 
        flex: 5 
    }
});


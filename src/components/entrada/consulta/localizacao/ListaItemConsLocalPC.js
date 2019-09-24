import React, { PureComponent } from 'react';
import { 
    TouchableHighlight, 
    View, 
    Text,
    StyleSheet 
} from 'react-native';

export default class ListaItemConsLocalPC extends PureComponent {
    render = () => (
        <TouchableHighlight
            onPress={() => false}
        >
            <View
                style={styles.item} 
            >
                <Text style={styles.codigoDep}>
                    {this.props.item.CodDepos}
                </Text>
                <Text style={styles.codigoItem}>
                    {this.props.item.codItem}
                </Text>
                <Text style={styles.descricao}>
                    {this.props.item.DescItem}
                </Text>
                <Text style={styles.qtdTot}>
                    {this.props.item.qtdTotal}
                </Text>
                <Text style={styles.qtdDisp}>
                    {this.props.item.qtdDisp}
                </Text>
                <Text style={styles.um}>
                    {this.props.item.Un}
                </Text>
                <Text style={styles.lote}>
                    {this.props.item.Lote}
                </Text>
            </View>
        </TouchableHighlight>      
    )
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
    codigoDep: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1 
    },
    codigoItem: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1.5 
    },
    descricao: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2.5 
    },
    qtdTot: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1 
    },
    qtdDisp: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1 
    },
    um: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1 
    },
    lote: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2 
    }
});

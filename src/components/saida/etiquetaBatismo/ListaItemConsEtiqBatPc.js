import React from 'react';
import { 
    TouchableHighlight, 
    View, 
    Text
} from 'react-native';

export default class ListaItemConsEtiqBatPc extends React.PureComponent {
    render = () => {
        const { 
            item,
            styles 
        } = this.props;
 
        return (
            <TouchableHighlight
                onPress={() => false}
            >
                <View
                    style={styles.item}
                >
                    <Text style={styles.embarque}>{item.embarque}</Text>
                    <Text style={styles.itCode}>{item.itCode}</Text>
                    <Text style={styles.nome}>{item.nome}</Text>
                    <Text style={styles.pedido}>{item.pedido}</Text>
                    <Text style={styles.notaFiscal}>{item.notaFiscal}</Text>
                    <Text style={styles.situacao}>{item.situacao}</Text>
                    <Text style={styles.qtdItem}>{item.qtdItem}</Text>
                    <Text style={styles.qtdSepara}>{item.qtdSepara}</Text>
                    <Text style={styles.qtdConfere}>{item.qtdConfere}</Text>
                    <Text style={styles.range}>{item.range}</Text>
                    <Text style={styles.separador}>{item.separador}</Text>
                    <Text style={styles.conferente}>{item.conferente}</Text>
                    <Text style={styles.depos}>{item.depos}</Text>
                    <Text style={styles.local}>{item.local}</Text>
                </View>
            </TouchableHighlight>    
        );
    }
  }


import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const imgConf = require('../../../resources/imgs/conferencia_ar_64.png');
const imgArmazen = require('../../../resources/imgs/armazenamento.png');
const imgInvent = require('../../../resources/imgs/inventario_64.png');
const imgConsulta = require('../../../resources/imgs/consulta_estoque.png');
const imgTransEnt = require('../../../resources/imgs/transf_entrada.png');

export default class MenuEntrada extends Component {
    onPressConf() {
        Actions.conferencia();
    }

    onPressArm() {
        Actions.armazena();
    }

    onPressTransferencia() {
        Actions.transferencia();
    }

    onPressInvent() {
        alert('Press Inventario');
        //Actions.inventario();
    }

    onPressConsEstoq() {
        Actions.estoque();
    }
    render() {
        return (
            <ScrollView style={styles.opcao}>
                <TouchableHighlight onPress={this.onPressConf} >
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgConf}
                        />
                        <Text style={styles.txtMenu}>Conferência AR</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onPressArm}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgArmazen}
                        />
                        <Text style={styles.txtMenu}>Armazenamento</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onPressTransferencia}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgTransEnt}
                        />
                        <Text style={styles.txtMenu}>Transferência</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onPressInvent}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgInvent}
                        />
                        <Text style={styles.txtMenu}>Inventário</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onPressConsEstoq}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgConsulta}
                        />
                        <Text style={styles.txtMenu}>Consulta Estoque</Text>
                    </View>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    opcao: {
        backgroundColor: '#4b86b4'
    },
    menu: {
        flexDirection: 'row',
        backgroundColor: '#2a4d69',
        margin: 3,
        marginHorizontal: 5,
        alignItems: 'center',
        padding: 5,
        borderRadius: 10
    },
    imgMenu: {
        width: 48,
        height: 48
    },
    txtMenu: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5,
        color: 'white',
        flex: 1
    }
});

import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableHighlight
} from 'react-native';

const imgConf = require('../../../resources/imgs/conferencia_ar_64.png');
const imgConsolid = require('../../../resources/imgs/consolidacao_48.png');
const imgDespacho = require('../../../resources/imgs/despacho_64.png');
const imgListSep = require('../../../resources/imgs/lista_separacao_64.png');
const imgRelacto = require('../../../resources/imgs/relaciona_etiqueta_64.png');
const imgConsEtiq = require('../../../resources/imgs/consulta_etiq_48.png');
const imgConsulta = require('../../../resources/imgs/consulta_estoque.png');

export default class MenuSaida extends Component {
    onPressConf() {
        alert('Press Conferência AR');
    }

    onPressListSep() {
        alert('Press Lista de Separação');
    }

    onPressConfVol() {
        alert('Press Conferência - Volumes');
    }

    onPressConsultEtiq() {
        alert('Press Consulta Etiqueta Batismo');
    }

    onPressRelacEtiq() {
        alert('Press Relacionamento Etiqueta Batismo');
    }

    onPressConsolid() {
        alert('Press Consolidação');
    }

    onPressDespacho() {
        alert('Press Despacho');
    }
    render() {
        return (
            <ScrollView style={styles.opcao}>                
                <TouchableHighlight onPress={this.onPressListSep}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgListSep}
                        />
                        <Text style={styles.txtMenu}>Lista de Separação</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onPressConf}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgConf}
                        />
                        <Text style={styles.txtMenu}>Conferência</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onPressConsultEtiq}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgConsEtiq}
                        />
                        <Text style={styles.txtMenu}>Consulta Etiqueta Batismo</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onPressRelacEtiq}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgRelacto}
                        />
                        <Text style={styles.txtMenu}>Relacionamento Etiqueta Batismo</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onPressConsolid}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgConsolid}
                        />
                        <Text style={styles.txtMenu}>Consolidação</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onPressDespacho}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgDespacho}
                        />
                        <Text style={styles.txtMenu}>Despacho</Text>
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

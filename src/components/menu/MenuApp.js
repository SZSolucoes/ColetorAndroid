import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    Image,
    TouchableHighlight,
    //Alert,
    Platform,
    ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import LogoutBtn from '../login/Logout';

const imgTruck1 = require('../../../resources/imgs/truck1.png');
const imgTruck2 = require('../../../resources/imgs/truck2.png');
const imgConsulta = require('../../../resources/imgs/menuConsulta.png');
const imgInventario = require('../../../resources/imgs/inventariomenu.png');

export default class MenuApp extends Component {

    constructor(props) {
        super(props);

        this.onPressEntrada = this.onPressEntrada.bind(this);
        this.onPressSaida = this.onPressSaida.bind(this);
        this.onPressConsulta = this.onPressConsulta.bind(this);
        this.onPressInventario = this.onPressInventario.bind(this);
        this.renderMenuEntrada = this.renderMenuEntrada.bind(this);
        this.renderMenuSaida = this.renderMenuSaida.bind(this);
        this.renderMenuConsulta = this.renderMenuConsulta.bind(this);
        this.renderMenuInventario = this.renderMenuInventario.bind(this);
    }

    onPressEntrada() {
        Actions.menuEntrada();
    }

    onPressSaida() {
        /* Alert.alert(
            'Saída',
            'Em Desenvolvimento'
        );
        return; */
        Actions.menuSaida();
    }

    onPressConsulta() {
        Actions.menuConsulta();
    }

    onPressInventario() {
        Actions.menuInventario();
    }

    renderMenuEntrada(key) {
        return (
            <TouchableHighlight
                key={key} 
                onPress={this.onPressEntrada}
            >
                <View style={styles.menu}>
                    <Image 
                        style={styles.imgMenu} 
                        source={imgTruck2}
                    />
                    <Text style={styles.txtMenu}>Entrada de Mercadorias</Text>
                </View>
            </TouchableHighlight>
        );
    }

    renderMenuSaida(key) {
        return (
            <TouchableHighlight
                key={key} 
                onPress={this.onPressSaida}
            >
                <View style={styles.menu}>
                    <Image 
                        style={styles.imgMenu} 
                        source={imgTruck1}
                    />
                    <Text style={styles.txtMenu}>Saída de Mercadorias</Text>
                </View>
            </TouchableHighlight>
        );
    }

    renderMenuConsulta(key) {
        return (
            <TouchableHighlight
                key={key} 
                onPress={this.onPressConsulta}
            >
                <View style={styles.menu}>
                    <View style={styles.viewImgCenter}> 
                        <Image 
                            style={styles.imgMenuTwo} 
                            source={imgConsulta}
                        />
                    </View>
                    <Text style={styles.txtMenu}>Consulta</Text>
                </View>
            </TouchableHighlight>
        );
    }

    renderMenuInventario(key) {
        return (
            <TouchableHighlight
                key={key} 
                onPress={this.onPressInventario}
            >
                <View style={styles.menu}>
                    <View style={styles.viewImgCenter}> 
                        <Image 
                            style={styles.imgMenu} 
                            source={imgInventario}
                        />
                    </View>
                    <Text style={styles.txtMenu}>Inventário</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={styles.viewPrinc}>
                <View
                    style={styles.opcao}
                >
                    <ScrollView>
                        { Platform.OS !== 'windows' ? (
                        [
                            this.renderMenuEntrada('1'),
                            this.renderMenuSaida('2'),
                            this.renderMenuConsulta('3'),
                            this.renderMenuInventario('4')
                        ]
                    ) : (
                        [
                            this.renderMenuEntrada('1'),
                            this.renderMenuSaida('2')
                        ]
                    )}
                    </ScrollView>
                </View>
                <View style={styles.btLogout}>
                    <LogoutBtn />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1,
        backgroundColor: '#4b86b4'
    },
    btLogout: {
        flex: 1,
        paddingBottom: 15
    },
    opcao: {
        flex: 8,
        backgroundColor: '#4b86b4'
    },
    menu: {
        flexDirection: 'row',
        backgroundColor: '#2a4d69',
        margin: 5,
        alignItems: 'center',
        padding: 5,
        borderRadius: 10
    },
    imgMenu: {
        width: 100,
        height: 100
    },
    viewImgCenter: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgMenuTwo: {
        width: 70,
        height: 70
    },
    txtMenu: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5,
        color: 'white'
    }
});

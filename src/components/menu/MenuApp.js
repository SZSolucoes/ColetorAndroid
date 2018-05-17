import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import LogoutBtn from '../login/Logout';

const imgTruck1 = require('../../../resources/imgs/truck1.png');
const imgTruck2 = require('../../../resources/imgs/truck2.png');

class MenuApp extends Component {
    onPressEntrada() {
        Actions.menuEntrada();
    }

    onPressSaida() {
        Actions.menuSaida();
    }
    render() {
        console.log(this.props);
        return (
            <View style={styles.viewPrinc}>
                <View style={styles.opcao}>
                    <TouchableHighlight 
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
                    <TouchableHighlight onPress={this.onPressSaida}>
                        <View style={styles.menu}>
                            <Image 
                                style={styles.imgMenu} 
                                source={imgTruck1}
                            />
                            <Text style={styles.txtMenu}>Saída de Mercadorias</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.btLogout}>
                    <LogoutBtn />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return (
        {
            logConfReceb: state.LoginReducer.logConfReceb,
            logEstoque: state.LoginReducer.logEstoque,
            logDespacho: state.LoginReducer.logDespacho,
            logSeparacao: state.LoginReducer.logSeparacao,
            logConfSeparacao: state.LoginReducer.logConfSeparacao,
            logTransferencia: state.LoginReducer.logTransferencia,
            logArmazenamento: state.LoginReducer.logArmazenamento,
            logTodos: state.LoginReducer.logTodos
        }
    );
};

export default connect(mapStateToProps, null)(MenuApp);

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
    txtMenu: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5,
        color: 'white'
    }
});

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
import { connect } from 'react-redux';

const imgInvent = require('../../../resources/imgs/inventario_64.png');
const imgInventEst = require('../../../resources/imgs/inventarioestorno.png');

class MenuInventario extends Component {

    onPressInvent() {
        Actions.inventario({ estorno: false });
    }

    onPressInventEst() {
        Actions.inventarioEst({ estorno: true });
    }
    
    renderInventario(key) {
        return (
            <TouchableHighlight key={key} onPress={this.onPressInvent}>
                <View style={styles.menu}>
                    <Image 
                        style={styles.imgMenu} 
                        source={imgInvent}
                    />
                    <Text style={styles.txtMenu}>Inventário</Text>
                </View>
            </TouchableHighlight>
        );
    }

    renderInventarioEst(key) {
        return (
            <TouchableHighlight key={key} onPress={this.onPressInventEst}>
                <View style={styles.menu}>
                    <Image 
                        style={styles.imgMenu} 
                        source={imgInventEst}
                    />
                    <Text style={styles.txtMenu}>Inventário - Estorno</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ScrollView style={styles.opcao}>
                {this.renderInventario('1')}
                {/*this.renderInventarioEst('2')*/}
            </ScrollView>
        );
    }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {})(MenuInventario);

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

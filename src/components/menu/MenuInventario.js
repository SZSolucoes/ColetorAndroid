import React from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
    buscaContInventario,
    modificaLoadingInvent
} from '../../actions/InventarioActions';

import imgInvent from '../../../resources/imgs/inventario_64.png';
import imgInventEst from '../../../resources/imgs/inventarioestorno.png';

class MenuInventario extends React.PureComponent {
    onPressInvent() {
        //Actions.inventario({ estorno: false });
        this.props.modificaLoadingInvent();
        const usuario = this.props.usuario;

        this.props.buscaContInventario(usuario, true);
    }

    onPressInventEst() {
        Actions.inventarioEst({ estorno: true });
    }
    
    renderInventario(key) {
        return (
            <TouchableHighlight key={key} onPress={() => { this.onPressInvent(); }}>        
                    { this.props.loadingInvent ?
                        (   
                            <View style={[styles.menu, { justifyContent: 'center' }]}>
                                <View style={{ marginVertical: 6 }}>
                                    <ActivityIndicator size={'large'} />
                                </View>
                            </View>
                        ) : (
                                <View style={styles.menu}>
                                    <Image 
                                        style={styles.imgMenu} 
                                        source={imgInvent}
                                    />
                                    <Text style={styles.txtMenu}>Inventário</Text>
                                </View> 
                            )
                    } 
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

const mapStateToProps = state => (
    {
        usuario: state.LoginReducer.usuario,
        loadingInvent: state.InventarioReducer.loadingInvent
    }
);

export default connect(mapStateToProps, { 
    buscaContInventario, 
    modificaLoadingInvent 
})(MenuInventario);

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

import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableHighlight,
    ActivityIndicator,
    Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { 
    modificaLoadingConferencia,
    modificaLoadingConfPlaca
} from '../../actions/LoginActions';
import {
    buscaNotaConferencia
} from '../../actions/ConfereActions';

const imgConfPlaca = require('../../../resources/imgs/conferencia-volume-64.png');
const imgConf = require('../../../resources/imgs/conferencia_ar_64.png');
const imgArmazen = require('../../../resources/imgs/armazenamento.png');
const imgRelEan = require('../../../resources/imgs/relacionaean.png');
const imgTransEnt = require('../../../resources/imgs/transf_entrada.png');
const imgPrinter = require('../../../resources/imgs/impressao_etiq.png');

class MenuEntrada extends Component {
    onPressConfPlaca() {
        this.props.modificaLoadingConfPlaca();
        Actions.conferenciaPlaca();
    }
    onPressConf() {
        this.props.modificaLoadingConferencia();
        const usuario = this.props.usuario;

        this.props.buscaNotaConferencia(usuario);
    }
    onPressArm() {
        Actions.armazena();
    }
    onPressTransferencia() {
        Actions.transferencia();
    }
    onPressRelEan() {
        Actions.relacionaEan();
    }
    onPressImpressao() {
        Actions.impressao();
    }
    renderConfereciaPlaca(key) {
        if (this.props.logConfPlaca) {
            return (
                <TouchableHighlight key={key} onPress={() => { this.onPressConfPlaca(); }}>        
                        { this.props.loadingConfPlaca ?
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
                                            source={imgConfPlaca}
                                        />
                                        <Text style={styles.txtMenu}>Conferência Placa</Text>
                                    </View> 
                                )
                        } 
                </TouchableHighlight>
            );
        }
    }
    renderConferecia(key) {
        if (this.props.logConfReceb) {
            return (
                <TouchableHighlight key={key} onPress={() => { this.onPressConf(); }}>        
                        { this.props.loadingConf ?
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
                                            source={imgConf}
                                        />
                                        <Text style={styles.txtMenu}>Conferência AR</Text>
                                    </View> 
                                )
                        } 
                </TouchableHighlight>
            );
        }
    }
    renderArmazenamento(key) {
        if (this.props.logArmazenamento) {
            return (
                <TouchableHighlight key={key} onPress={this.onPressArm}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgArmazen}
                        />
                        <Text style={styles.txtMenu}>Armazenamento</Text>
                    </View>
                </TouchableHighlight>
            );
        }
    }
    renderTransferencia(key) {
        if (this.props.logTransferencia) {
            return (
                <TouchableHighlight key={key} onPress={this.onPressTransferencia}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgTransEnt}
                        />
                        <Text style={styles.txtMenu}>Transferência</Text>
                    </View>
                </TouchableHighlight>
            );
        }
    }
    renderRelacionaEan(key) {
        return (
            <TouchableHighlight key={key} onPress={this.onPressRelEan}>
                <View style={styles.menu}>
                    <Image 
                        style={styles.imgMenu} 
                        source={imgRelEan}
                    />
                    <Text style={styles.txtMenu}>Relaciona EAN</Text>
                </View>
            </TouchableHighlight>
        );
    }
    renderImpressao(key) {
        return (
            <TouchableHighlight key={key} onPress={this.onPressImpressao}>
                <View style={styles.menu}>
                    <Image 
                        style={styles.imgMenu} 
                        source={imgPrinter}
                    />
                    <Text style={styles.txtMenu}>Etiqueta EAN</Text>
                </View>
            </TouchableHighlight>
        );
    }
    render() {
        return (
            <ScrollView style={styles.opcao}>
                { Platform.OS !== 'windows' ? (
                    [
                        this.renderConfereciaPlaca('6'),
                        this.renderConferecia('1'),
                        this.renderArmazenamento('2'),
                        this.renderTransferencia('3'),
                        this.renderRelacionaEan('4'),
                        this.renderImpressao('5')
                    ]
                ) : (
                    this.renderConferecia('1')
                )}
            </ScrollView>
        );
    }
}

const mapStateToProps = state => (
        {
            logConfPlaca: state.LoginReducer.logConfPlaca,
            logConfReceb: state.LoginReducer.logConfReceb,
            logEstoque: state.LoginReducer.logEstoque,
            logDespacho: state.LoginReducer.logDespacho,
            logSeparacao: state.LoginReducer.logSeparacao,
            logConfSeparacao: state.LoginReducer.logConfSeparacao,
            logTransferencia: state.LoginReducer.logTransferencia,
            logArmazenamento: state.LoginReducer.logArmazenamento,
            logCorteCabos: state.LoginReducer.logCorteCabos,
            logTodos: state.LoginReducer.logTodos,
            loadingConf: state.LoginReducer.loadingConf,
            usuario: state.LoginReducer.usuario,
        }
);

export default connect(mapStateToProps, { 
    modificaLoadingConferencia,
    modificaLoadingConfPlaca,
    buscaNotaConferencia
})(MenuEntrada);

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

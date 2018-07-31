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
    modificaLoadingConferencia
} from '../../actions/LoginActions';
import {
    buscaNotaConferencia
} from '../../actions/ConfereActions';

const imgConf = require('../../../resources/imgs/conferencia_ar_64.png');
const imgArmazen = require('../../../resources/imgs/armazenamento.png');
const imgInvent = require('../../../resources/imgs/inventario_64.png');
const imgInventEst = require('../../../resources/imgs/inventarioestorno.png');
const imgConsulta = require('../../../resources/imgs/consulta_estoque.png');
const imgRelEan = require('../../../resources/imgs/relacionaean.png');
const imgTransEnt = require('../../../resources/imgs/transf_entrada.png');
const imgPrinter = require('../../../resources/imgs/impressao_etiq.png');
const imgConsBatismo = require('../../../resources/imgs/consulta_etiq_48.png');
const imgConsultaNF = require('../../../resources/imgs/consultanf.png');

class MenuEntrada extends Component {
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
    onPressInvent() {
        Actions.inventario({ estorno: false });
    }
    onPressInventEst() {
        Actions.inventarioEst({ estorno: true });
    }
    onPressConsEstoq() {
        Actions.estoque();
    }
    onPressConsBatismo() {
        Actions.consultaBatismoEntrada();
    }
    onPressRelEan() {
        Actions.relacionaEan();
    }
    onPressImpressao() {
        Actions.impressao();
    }
    onPressConsultaNF() {
        Actions.consultaNF();
    }
    renderConferecia(key) {
        if (this.props.loadingConf) {
            return (
                <ActivityIndicator key={key} size="large" />
            );
        }
        if (this.props.logConfReceb) {
            return (
                <TouchableHighlight key={key} onPress={() => { this.onPressConf(); }} >
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgConf}
                        />
                        <Text style={styles.txtMenu}>Conferência AR</Text>
                    </View>
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
    renderConsulta(key) {
        if (this.props.logEstoque) {
            return (
                <TouchableHighlight key={key} onPress={this.onPressConsEstoq}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgConsulta}
                        />
                        <Text style={styles.txtMenu}>Consulta Estoque</Text>
                    </View>
                </TouchableHighlight>
            );
        }
    }
    renderConsultaBatismo(key) {
        if (this.props.logEstoque) {
            return (
                <TouchableHighlight key={key} onPress={this.onPressConsBatismo}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgConsBatismo}
                        />
                        <Text style={styles.txtMenu}>Consulta Etiqueta Batismo</Text>
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
    renderConsultaNF(key) {
        return (
            <TouchableHighlight key={key} onPress={this.onPressConsultaNF}>
                <View style={styles.menu}>
                    <Image 
                        style={styles.imgMenu} 
                        source={imgConsultaNF}
                    />
                    <Text style={styles.txtMenu}>Consulta Nota Fiscal</Text>
                </View>
            </TouchableHighlight>
        );
    }
    render() {
        return (
            <ScrollView style={styles.opcao}>
                { Platform.OS !== 'windows' ? (
                    [
                        this.renderConferecia('1'),
                        this.renderArmazenamento('2'),
                        this.renderTransferencia('3'),
                        this.renderInventario('4'),
                        this.renderInventarioEst('5'),
                        this.renderConsulta('6'),
                        this.renderConsultaBatismo('7'),
                        this.renderRelacionaEan('8'),
                        this.renderImpressao('9'), 
                        this.renderConsultaNF('10') 
                    ]
                ) : (
                    this.renderConferecia()
                )}
            </ScrollView>
        );
    }
}

const mapStateToProps = state => (
        {
            logConfReceb: state.LoginReducer.logConfReceb,
            logEstoque: state.LoginReducer.logEstoque,
            logDespacho: state.LoginReducer.logDespacho,
            logSeparacao: state.LoginReducer.logSeparacao,
            logConfSeparacao: state.LoginReducer.logConfSeparacao,
            logTransferencia: state.LoginReducer.logTransferencia,
            logArmazenamento: state.LoginReducer.logArmazenamento,
            logTodos: state.LoginReducer.logTodos,
            loadingConf: state.LoginReducer.loadingConf,
            usuario: state.LoginReducer.usuario,
        }
);

export default connect(mapStateToProps, { 
    modificaLoadingConferencia,
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

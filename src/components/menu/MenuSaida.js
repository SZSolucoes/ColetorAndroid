import React, { Component } from 'react';
import { 
    View, 
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';

const imgConf = require('../../../resources/imgs/conferencia_ar_64.png');
const imgConsolid = require('../../../resources/imgs/consolidacao_48.png');
const imgDespacho = require('../../../resources/imgs/despacho_64.png');
const imgListSep = require('../../../resources/imgs/lista_separacao_64.png');
const imgRelacto = require('../../../resources/imgs/relaciona_etiqueta_64.png');
const imgConsEtiq = require('../../../resources/imgs/consulta_etiq_48.png');
const imgConsulta = require('../../../resources/imgs/consulta_estoque.png');

class MenuSaida extends Component {
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
    renderListaSep() {
        return (
            <TouchableHighlight onPress={this.onPressListSep}>
                <View style={styles.menu}>
                    <Image 
                        style={styles.imgMenu} 
                        source={imgListSep}
                    />
                    <Text style={styles.txtMenu}>Lista de Separação</Text>
                </View>
            </TouchableHighlight>
        );
    }
    renderConferencia() {
        return (
            <TouchableHighlight onPress={this.onPressConf}>
                <View style={styles.menu}>
                    <Image 
                        style={styles.imgMenu} 
                        source={imgConf}
                    />
                    <Text style={styles.txtMenu}>Conferência</Text>
                </View>
            </TouchableHighlight>
        );
    }
    renderConsultaEtiq() {
        return (
            <TouchableHighlight onPress={this.onPressConsultEtiq}>
                <View style={styles.menu}>
                    <Image 
                        style={styles.imgMenu} 
                        source={imgConsEtiq}
                    />
                    <Text style={styles.txtMenu}>Consulta Etiqueta Batismo</Text>
                </View>
            </TouchableHighlight>
        );
    }
    renderRelacEtiq() {
        return (
            <TouchableHighlight onPress={this.onPressRelacEtiq}>
                <View style={styles.menu}>
                    <Image 
                        style={styles.imgMenu} 
                        source={imgRelacto}
                    />
                    <Text style={styles.txtMenu}>Relacionamento Etiqueta Batismo</Text>
                </View>
            </TouchableHighlight>
        );
    }
    renderConsolid() {
        return (
            <TouchableHighlight onPress={this.onPressConsolid}>
                <View style={styles.menu}>
                    <Image 
                        style={styles.imgMenu} 
                        source={imgConsolid}
                    />
                    <Text style={styles.txtMenu}>Consolidação</Text>
                </View>
            </TouchableHighlight>
        );
    }
    renderDespacho() {
        return (
            <TouchableHighlight onPress={this.onPressDespacho}>
                <View style={styles.menu}>
                    <Image 
                        style={styles.imgMenu} 
                        source={imgDespacho}
                    />
                    <Text style={styles.txtMenu}>Despacho</Text>
                </View>
            </TouchableHighlight>
        );
    }
    renderConsultaEstoq() {
        return (
            <TouchableHighlight onPress={this.onPressConsEstoq}>
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
    render() {
        return (
            <ScrollView style={styles.opcao}>                
                {this.renderListaSep()}
                {this.renderConferencia()}
                {this.renderConsultaEtiq()}
                {this.renderRelacEtiq()}
                {this.renderConsolid()}
                {this.renderDespacho()}
                {this.renderConsultaEstoq()}
            </ScrollView>
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

export default connect(mapStateToProps, null)(MenuSaida);

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

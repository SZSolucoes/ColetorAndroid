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
import { Actions } from 'react-native-router-flux';

const imgConsulta = require('../../../resources/imgs/consulta_estoque.png');
const imgConsBatismo = require('../../../resources/imgs/consulta_etiq_48.png');
const imgConsultaNF = require('../../../resources/imgs/consultanf.png');
const imgLocation = require('../../../resources/imgs/location.png');
const imgEan = require('../../../resources/imgs/eanconsulta.png');

class MenuConsulta extends Component {

    constructor(props) {
        super(props);

        this.renderConsultaEstoq = this.renderConsultaEstoq.bind(this);
        this.onPressConsEstoq = this.onPressConsEstoq.bind(this);
        this.renderConsultaBatismoEntrada = this.renderConsultaBatismoEntrada.bind(this);
        this.onPressConsBatismoEntrada = this.onPressConsBatismoEntrada.bind(this);
        this.onPressConsBatismoSaida = this.onPressConsBatismoSaida.bind(this);
        this.renderConsultaNF = this.renderConsultaNF.bind(this);
        this.onPressConsultaNF = this.onPressConsultaNF.bind(this);
        this.renderConsultaLocalizacao = this.renderConsultaLocalizacao.bind(this);
        this.onPressConsultaLocalizacao = this.onPressConsultaLocalizacao.bind(this);
        this.onPressConsultaEAN = this.onPressConsultaEAN.bind(this);
    }

    onPressConsEstoq() {
        Actions.estoque();
    }

    onPressConsBatismoEntrada() {
        Actions.consultaBatismoEntrada();
    }

    onPressConsBatismoSaida() {
        Actions.consultaEtiqBatismoSaida();
    }

    onPressConsultaLocalizacao() {
        Actions.consultaLocalizacao();
    }

    onPressConsultaNF() {
        Actions.consultaNF();
    }

    onPressConsultaEAN() {
        Actions.consultaItemEan();
    }
    
    renderConsultaEstoq() {
        if (this.props.logEstoque) {
            return (
                <TouchableHighlight onPress={this.onPressConsEstoq}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgConsulta}
                        />
                        <Text style={styles.txtMenu}>Estoque</Text>
                    </View>
                </TouchableHighlight>
            );
        }
    }

    renderConsultaBatismoEntrada() {
        if (this.props.logEstoque) {
            return (
                <TouchableHighlight onPress={this.onPressConsBatismoEntrada}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgConsBatismo}
                        />
                        <Text style={styles.txtMenu}>Etiqueta Batismo - Entrada</Text>
                    </View>
                </TouchableHighlight>
            );
        }
    }

    renderConsultaBatismoSaida() {
        if (this.props.logEstoque) {
            return (
                <TouchableHighlight onPress={this.onPressConsBatismoSaida}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgConsBatismo}
                        />
                        <Text style={styles.txtMenu}>Etiqueta Batismo - Saída</Text>
                    </View>
                </TouchableHighlight>
            );
        }
    }

    renderConsultaLocalizacao() {
        if (this.props.logEstoque) {
            return (
                <TouchableHighlight onPress={this.onPressConsultaLocalizacao}>
                    <View style={styles.menu}>
                        <Image 
                            style={styles.imgMenu} 
                            source={imgLocation}
                        />
                        <Text style={styles.txtMenu}>Localização</Text>
                    </View>
                </TouchableHighlight>
            );
        }
    }

    renderConsultaNF() {
        return (
            <TouchableHighlight onPress={this.onPressConsultaNF}>
                <View style={styles.menu}>
                    <Image 
                        style={styles.imgMenu} 
                        source={imgConsultaNF}
                    />
                    <Text style={styles.txtMenu}>Nota Fiscal</Text>
                </View>
            </TouchableHighlight>
        );
    }

    renderConsultaEAN() {
        return (
            <TouchableHighlight onPress={this.onPressConsultaEAN}>
                <View style={styles.menu}>
                    <Image 
                        style={styles.imgMenu} 
                        source={imgEan}
                    />
                    <Text style={styles.txtMenu}>EAN</Text>
                </View>
            </TouchableHighlight>
        );
    }
    
    render() {
        return (
            <ScrollView style={styles.opcao}>  
                {this.renderConsultaEstoq()}
                {this.renderConsultaBatismoEntrada()}
                {this.renderConsultaBatismoSaida()}
                {this.renderConsultaLocalizacao()}
                {this.renderConsultaNF()}                   
                {this.renderConsultaEAN()}                   
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    logEstoque: state.LoginReducer.logEstoque
});

export default connect(mapStateToProps)(MenuConsulta);

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

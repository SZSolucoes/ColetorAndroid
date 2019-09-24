import React from 'react';
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

import imgConsulta from '../../../resources/imgs/consulta_estoque.png';
import imgConsBatismo from '../../../resources/imgs/consulta_etiq_48.png';
import imgConsultaNF from '../../../resources/imgs/consultanf.png';
import imgLocation from '../../../resources/imgs/location.png';
import imgEan from '../../../resources/imgs/eanconsulta.png';

class MenuConsulta extends React.PureComponent {
    onPressConsEstoq = () => {
        Actions.estoque();
    }

    onPressConsBatismoEntrada = () => {
        Actions.consultaBatismoEntrada();
    }

    onPressConsBatismoSaida = () => {
        Actions.consultaEtiqBatismoSaida();
    }

    onPressConsultaLocalizacao = () => {
        Actions.consultaLocalizacao();
    }

    onPressConsultaNF = () => {
        Actions.consultaNF();
    }

    onPressConsultaEAN = () => {
        Actions.consultaItemEan();
    }    
    
    renderConsultaEstoq = () => {
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

    renderConsultaBatismoEntrada = () => {
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

    renderConsultaBatismoSaida = () => {
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

    renderConsultaLocalizacao = () => {
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

    renderConsultaNF = () => {
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

    renderConsultaEAN = () => (
        <TouchableHighlight onPress={this.onPressConsultaEAN}>
            <View style={styles.menu}>
                <Image 
                    style={styles.imgMenu} 
                    source={imgEan}
                />
                <Text style={styles.txtMenu}>EAN</Text>
            </View>
        </TouchableHighlight>
    )
    
    render = () => (
        <ScrollView style={styles.opcao}>
            <View style={{ flex: 1, paddingVertical: 5 }}>
                {this.renderConsultaEstoq()}
                {this.renderConsultaBatismoEntrada()}
                {this.renderConsultaBatismoSaida()}
                {this.renderConsultaLocalizacao()}
                {this.renderConsultaNF()}
                {this.renderConsultaEAN()}
            </View>
        </ScrollView>
    )
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

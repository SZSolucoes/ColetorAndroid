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
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { store } from '../../App';
import { fetchListItensSep } from '../../actions/ListaSeparacaoActions';

const imgConf = require('../../../resources/imgs/conferencia_ar_64.png');
const imgConfCheck = require('../../../resources/imgs/conferencia-volume-64.png');
const imgConsolid = require('../../../resources/imgs/consolidacao_48.png');
const imgDespacho = require('../../../resources/imgs/despacho_64.png');
const imgListSep = require('../../../resources/imgs/lista_separacao_64.png');
const imgRelEan = require('../../../resources/imgs/relacionaean.png');
const imgPrinter = require('../../../resources/imgs/impressao_etiq.png');

class MenuSaida extends Component {

    constructor(props) {
        super(props);

        this.onPressListSep = this.onPressListSep.bind(this);
        this.onPressConf = this.onPressConf.bind(this);
        this.onPressConfVol = this.onPressConfVol.bind(this);
        this.onPressRelEan = this.onPressRelEan.bind(this);
        this.onPressConsolid = this.onPressConsolid.bind(this);
        this.onPressDespacho = this.onPressDespacho.bind(this);
        this.onPressImpressao = this.onPressImpressao.bind(this);
    }
    
    onPressListSep() {
        const userName = store.getState().LoginReducer.usuario;
        this.props.fetchListItensSep(userName);
    }
    onPressConf() {
        Actions.conferenciaSeparacao();
    } 
    onPressConfVol() {
        Actions.conferenciaVolumeSaida({ isMenu: true });
    } 
    onPressRelEan() {
        Actions.relacionaEan();
    }
    onPressConsolid() {
        Actions.consolidacaoSaida();
    }
    onPressDespacho() {
        Actions.despachoSaida();
    }
    onPressImpressao() {
        Actions.impressao();
    }
    renderListaSep(key) {
        return (
            <TouchableHighlight key={key} onPress={this.onPressListSep}>
                
                    { this.props.loadingListSep ?
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
                                        source={imgListSep}
                                    />
                                    <Text style={styles.txtMenu}>Lista de Separação</Text>
                                </View> 
                            )
                    }
                
            </TouchableHighlight>
        );
    }
    renderConferencia(key) {
        return (
            <TouchableHighlight key={key} onPress={this.onPressConf}>
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
    renderConferenciaVolume(key) {
        return (
            <TouchableHighlight key={key} onPress={this.onPressConfVol}>
                <View style={styles.menu}>
                    <Image 
                        style={styles.imgMenu} 
                        source={imgConfCheck}
                    />
                    <Text style={styles.txtMenu}>Conferência - Volumes</Text>
                </View>
            </TouchableHighlight>
        );
    }
    renderConsolid(key) {
        return (
            <TouchableHighlight key={key} onPress={this.onPressConsolid}>
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
    renderDespacho(key) {
        return (
            <TouchableHighlight key={key} onPress={this.onPressDespacho}>
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
                        this.props.logSeparacao && this.renderListaSep('1'),
                        this.props.logConfSeparacao && this.renderConferencia('2'),
                        this.props.logConfSeparacao && this.renderConferenciaVolume('3'),
                        this.renderConsolid('4'),
                        //this.renderDespacho('5'),
                        this.renderRelacionaEan('6'),
                        this.renderImpressao('7')
                    ]
                ) : (
                    [
                        this.props.logConfSeparacao && this.renderConferencia('2'),
                        this.props.logConfSeparacao && this.renderConferenciaVolume('3')
                    ]
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
            logTodos: state.LoginReducer.logTodos,
            loadingListSep: state.ListaSeparacaoReducer.loadingListSep
        }
);


export default connect(mapStateToProps, {
    fetchListItensSep
})(MenuSaida);

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

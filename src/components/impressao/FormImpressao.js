import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { 
    iniciaTela,
    modificaCodEAN,
    modificaCodItem,
    modificaDescItem,
    modificaUnidMed,
    modificaQtEtiq,
    imprimeEtiquetaEAN,
    buscaInfoEAN,
    limpaTela
} from '../../actions/ImpressaoActions';

const imgPrinter = require('../../../resources/imgs/impressao_etiq.png');

class FormImpressao extends Component {
    componentWillMount() {
        this.props.iniciaTela();
    }
    onPressPrint() {
        const { codEAN, qtEtiq, usuario } = this.props;

        if (codEAN.length === 0) {
            Alert.alert(
                'Impressão Etiqueta',
                'EAN deve ser informado!'
            );
            return;
        }
        if (qtEtiq.length === 0 || _.toInteger(qtEtiq) < 1) {
            Alert.alert(
                'Impressão Etiqueta',
                'Quantidade Etiqueta deve maior que 0!'
            );
            return;
        }

        this.props.imprimeEtiquetaEAN(usuario, codEAN, qtEtiq);
    }
    fnBuscaInfoEan() {
        const codEAN = this.props.codEAN;
        if (codEAN.length === 0) {
            Alert.alert(
                'Erro EAN',
                'Código EAN deve ser informado!'
            );
            return;
        }
        
        this.props.limpaTela();
        this.props.buscaInfoEAN(codEAN);
    }
    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>EAN</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            keyboardType="numeric"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            onChangeText={codEAN => this.props.modificaCodEAN(codEAN)}
                            value={this.props.codEAN}
                            onSubmitEditing={() => this.fnBuscaInfoEan()}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 4 }]}>
                        <Text style={styles.txtLabel}>Item</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={codItem => this.props.modificaCodItem(codItem)}
                            value={this.props.codItem}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>UM</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={unidMed => this.props.modificaUnidMed(unidMed)}
                            value={this.props.unidMed}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Descrição</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            multiline
                            numberOfLines={3}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.inputDescricao}
                            onChangeText={descItem => this.props.modificaDescItem(descItem)}
                            value={this.props.descItem}
                        />
                    </View>                    
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={[styles.txtLabel, { textAlign: 'left' }]}>Qtde Etiq</Text>
                        <View style={styles.viewBtEtiq}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={styles.input}
                                onChangeText={qtEtiq => this.props.modificaQtEtiq(qtEtiq)}
                                value={this.props.qtEtiq}
                                ref={(input) => { this.qtEtiq = input; }}
                            />
                            <TouchableOpacity
                                style={styles.btSearch}
                                onPress={() => { this.onPressPrint(); }}
                            >
                                <Image
                                    source={imgPrinter}
                                    style={styles.imgSearch}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => (
    {
        codEAN: state.ImpressaoReducer.codEAN,
        codItem: state.ImpressaoReducer.codItem,
        unidMed: state.ImpressaoReducer.unidMed,
        descItem: state.ImpressaoReducer.descItem,
        listaItem: state.ImpressaoReducer.listaItem,
        qtEtiq: state.ImpressaoReducer.qtEtiq,
        usuario: state.LoginReducer.usuario
    }
);

export default connect(mapStateToProps, { 
    iniciaTela,
    modificaCodEAN,
    modificaCodItem,
    modificaDescItem,
    modificaUnidMed,
    modificaQtEtiq,
    imprimeEtiquetaEAN,
    buscaInfoEAN,
    limpaTela
})(FormImpressao);

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1,
        backgroundColor: '#4b86b4'
    },
    viewLinha: {
        flexDirection: 'row'
    },
    viewCampo: {
        flexDirection: 'column',
        paddingHorizontal: 10
    },
    viewCampoLocal: {
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    viewLinhaLocal: {
        flexDirection: 'column'        
    },
    txtLabel: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 13,
        fontFamily: 'sans-serif-medium'
    },
    input: {
        height: 35,
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: '#20293F',
        color: 'white',
        borderRadius: 10,
        fontFamily: 'sans-serif-medium'
    },
    inputDescricao: {
        height: 70,
        fontSize: 14,
        textAlign: 'left',
        backgroundColor: '#20293F',
        color: 'white',
        borderRadius: 10,
        fontFamily: 'sans-serif-medium'
    },
    viewBotao: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 10
    },
    button: {
        alignItems: 'center',
        width: 90,
        height: 35,
        padding: 10,
        borderRadius: 10
    },
    btVoltar: { 
        color: 'white', 
        fontSize: 14, 
        alignItems: 'center' 
    },
    viewBtEtiq: {
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    btSearch: {
        width: 40,
        height: 35
    },
    imgSearch: {
        width: 35,
        height: 35
    }
});

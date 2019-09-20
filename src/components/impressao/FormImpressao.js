/* eslint-disable max-len */
import React from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Image,
    Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { 
    iniciaTela,
    modificaCodEAN,
    modificaQtEtiq,
    imprimeEtiquetaEAN,
    buscaInfoEAN,
    limpaTela,
    modificaImpressaoClear
} from '../../actions/ImpressaoActions';
import { defaultFormStyles } from '../utils/Forms';

import imgPrinter from '../../../resources/imgs/impressao_etiq.png';

class FormImpressao extends React.PureComponent {
    componentDidMount() {
        this.props.iniciaTela();
    }
    componentWillUnmount() {
        this.props.modificaImpressaoClear();
    }

    onBlurEan = () => {
        if (this.props.codEAN) this.fnBuscaInfoEan();
    }

    onChangeEan = (value) => {
        this.props.modificaCodEAN(value);
    }
    onChangeQtdeEtiq = (value) => {
        this.props.modificaQtEtiq(value);
    }

    onPressPrint() {
        const { codEAN, qtEtiq, usuario } = this.props;

        if (codEAN) {
            if (codEAN.length === 0) {
                Alert.alert(
                    'Impressão Etiqueta',
                    'EAN deve ser informado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Impressão Etiqueta',
                'EAN deve ser informado!'
            );
            return;
        }
        if (qtEtiq) {
            if (qtEtiq.length === 0 || _.toInteger(qtEtiq) < 1) {
                Alert.alert(
                    'Impressão Etiqueta',
                    'Quantidade Etiqueta deve ser maior que 0!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Impressão Etiqueta',
                'Quantidade Etiqueta deve ser maior que 0!'
            );
            return;
        }
        
        this.props.imprimeEtiquetaEAN(usuario, codEAN, qtEtiq);
    }
    fnBuscaInfoEan() {
        const codEAN = this.props.codEAN;

        Keyboard.dismiss();

        if (codEAN) {
            if (codEAN.length === 0) {
                Alert.alert(
                    'Erro EAN',
                    'Código EAN deve ser informado!'
                );
                return;
            }
        } else {
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
                        <View style={defaultFormStyles.inputView}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                keyboardType="numeric"
                                autoCorrect={false}
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="go"
                                style={defaultFormStyles.input}
                                onChangeText={this.onChangeEan}
                                value={this.props.codEAN}
                                onBlur={this.onBlurEan}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 4 }]}>
                        <Text style={styles.txtLabel}>Item</Text>
                        <View style={defaultFormStyles.inputView}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={false}
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={defaultFormStyles.input}
                                value={this.props.codItem}
                            />
                        </View>
                    </View>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>UM</Text>
                        <View style={defaultFormStyles.inputView}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={false}
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={defaultFormStyles.input}
                                value={this.props.unidMed}
                            />
                        </View>
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
                            style={defaultFormStyles.inputDescricao}
                            value={this.props.descItem}
                        />
                    </View>                    
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <View style={styles.viewBtEtiq}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.txtLabel}>Qtde Etiq</Text>
                                <View style={defaultFormStyles.inputView}>
                                    <TextInput
                                        placeholder=""
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="numeric"
                                        placeholderTextColor='rgba(255,255,255,0.7)'
                                        returnKeyType="next"
                                        style={defaultFormStyles.input}
                                        onChangeText={this.onChangeQtdeEtiq}
                                        value={this.props.qtEtiq}
                                        ref={(input) => { this.qtEtiq = input; }}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', marginTop: 20, marginLeft: 5 }}>
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
                    <View style={[styles.viewCampo, { flex: 1.5 }]} />
                </View>
                <View style={{ marginVertical: 20 }} />
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
    modificaQtEtiq,
    imprimeEtiquetaEAN,
    buscaInfoEAN,
    limpaTela,
    modificaImpressaoClear
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

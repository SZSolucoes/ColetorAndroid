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
import { Actions } from 'react-native-router-flux';
import { 
    iniciaTela,
    modificaCodEAN,
    modificaCodItem,
    modificaDescItem,
    modificaUnidMed,
    modificaListaItem,
    buscaEstoque,
    limpaTela,
    modificaEstoqueClear
} from '../../actions/EstoqueActions';

import ListaItemEstoque from './ListaItemEstoque';
import { defaultFormStyles } from '../utils/Forms';

import imgClear from '../../../resources/imgs/limpa_tela.png';

class FormEstoque extends React.PureComponent {
    componentDidMount() {
        this.props.iniciaTela();
        setTimeout(Actions.refresh, 500, { right: this._renderRightButton });
    }

    componentWillUnmount() {
        this.props.modificaEstoqueClear();
    }

    onBlurEan = () => {
        if (this.props.codEAN) this.fnBuscaEstoque();
    }

    onChangeEan = (value) => {
        this.props.modificaCodEAN(value);
    }

    limpaTela() {
        this.props.iniciaTela();
    }
    _renderRightButton = () => {
        return (
            <TouchableOpacity 
                onPress={() => this.limpaTela()}
                style={styles.btClear}
            >
                <Image
                    source={imgClear}
                    style={styles.imgClear}
                />
            </TouchableOpacity>
        );
    }
    fnBuscaEstoque() {
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
        this.props.buscaEstoque(codEAN);
    }
    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>EAN</Text>
                        <View style={styles.viewBtEtiq}>
                            <View style={[defaultFormStyles.inputView, { flex: 5 }]}>
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
                <View style={{ padding: 5 }} >
                    <ListaItemEstoque />
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => (
    {
        codEAN: state.EstoqueReducer.codEAN,
        codItem: state.EstoqueReducer.codItem,
        unidMed: state.EstoqueReducer.unidMed,
        descItem: state.EstoqueReducer.descItem,
        listaItem: state.EstoqueReducer.listaItem
    }
);

export default connect(mapStateToProps, { 
    iniciaTela,
    modificaCodEAN,
    modificaCodItem,
    modificaDescItem,
    modificaUnidMed,
    modificaListaItem,
    buscaEstoque,
    limpaTela,
    modificaEstoqueClear
})(FormEstoque);

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
    viewBtEtiq: {
        justifyContent: 'flex-start',
        flexDirection: 'row'
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
        //alignItems: 'flex-end',
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
    btClear: {
        width: 40,
        height: 35
    },
    imgClear: {
        width: 35,
        height: 35
    }
});

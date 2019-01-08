import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    Alert,
    Keyboard
} from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import GridInventItens from './GridInventItens';
import FormRow from '../utils/FormRow';

import {
    modificaCodLocal,
    modificaNrContagem,
    modificaCodEAN,
    modificaDtInventario,
    modificaCodLote,
    modificaQtItem,
    modificaModalVisible,
    cleanInventarioReducer,
    cleanInventarioReducerWDT,
    doConfirm,
    doConfirmEst,
    buscaInfoEAN
} from '../../actions/InventarioActions';

const imgClear = require('../../../resources/imgs/limpa_tela.png');

class FormInventario extends Component {

    constructor(props) {
        super(props);

        this.limpaTela = this.limpaTela.bind(this);
        this.renderRightButton = this.renderRightButton.bind(this);
        this.fnBuscaInfoEan = this.fnBuscaInfoEan.bind(this);
        this.confirmButton = this.confirmButton.bind(this);
        this.renderQtde = this.renderQtde.bind(this);
        this.onChangeQtdText = this.onChangeQtdText.bind(this);
    }


    componentDidMount() {
        Actions.refresh({ right: this.renderRightButton });
    }
    
    componentWillUnmount() {
        this.props.cleanInventarioReducer();
    }

    onChangeQtdText(value) {
        const txtParsed = value.replace(/[^0-9]/g, '');
        this.props.modificaQtItem(txtParsed);
    }
    
    limpaTela() {
        this.props.cleanInventarioReducerWDT();
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
        
        this.props.buscaInfoEAN(codEAN);
    }

    confirmButton() {
        const {
            username,
            codLocal,
            nrContagem,
            codEAN,
            dtInventario,
            qtItem,
            tpCont,
            codLote
        } = this.props;

        Keyboard.dismiss();

        if (codLocal) {
            if (codLocal.length === 0) {
                Alert.alert(
                    'Inventário',
                    'Local deve ser informado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Inventário',
                'Local deve ser informado!'
            );
            return;
        }
        
        if (nrContagem) {
            if (nrContagem.length === 0) {
                Alert.alert(
                    'Inventário',
                    'Contagem deve ser informada!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Inventário',
                'Contagem deve ser informada!'
            );
            return;
        }

        if (codEAN) {
            if (codEAN.length === 0) {
                Alert.alert(
                    'Inventário',
                    'EAN deve ser informado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Inventário',
                'EAN deve ser informado!'
            );
            return;
        }

        if (dtInventario) {
            if (dtInventario.length === 0) {
                Alert.alert(
                    'Inventário',
                    'Data Inventário deve ser informada!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Inventário',
                'Data Inventário deve ser informada!'
            );
            return;
        }

        if (tpCont === '3') {
            if (!codLote) {
                Alert.alert(
                    'Conferência',
                    'Lote deve ser informado!'
                );
                return;
            }
        } 

        const propparams = {
            username,
            codLocal,
            nrContagem,
            codEAN,
            dtInventario,
            qtItem,
            codLote
        };

        if (this.props.estorno) {
            this.props.doConfirmEst(propparams);
        } else {
            if (qtItem) {
                if (qtItem.length === 0 || _.toInteger(qtItem) < 1) {
                    Alert.alert(
                        'Conferência',
                        'Quantidade Item deve ser maior que 0!'
                    );
                    return;  
                }
            } else {
                Alert.alert(
                    'Conferência',
                    'Quantidade Item deve ser maior que 0!'
                );
                return; 
            }

            this.props.doConfirm(propparams);
        }
    }

    renderRightButton() {
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

    renderQtde() {
        if (!this.props.estorno) {
            return (
                <View style={{ flex: 1 }}>
                    <Text style={styles.txtLabel}>Qtde</Text>
                    <TextInput
                        selectTextOnFocus
                        placeholder=""
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType="go"
                        keyboardType="numeric"
                        style={styles.input}
                        onChangeText={value => this.onChangeQtdText(value)}
                        value={this.props.qtItem}
                        onBlur={() => this.props.qtItem && this.confirmButton()}
                        ref={(input) => { this.txtQtde = input; }}
                    />
                </View>
            );       
        }

        return (<View />);
    }

    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Localização</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.codLocal}
                            onChangeText={this.props.modificaCodLocal}
                            onSubmitEditing={() => { this.txtEAN.focus(); }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>EAN</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            keyboardType="numeric"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            onChangeText={codEAN => this.props.modificaCodEAN(codEAN)}
                            value={this.props.codEAN}
                            onBlur={() => this.props.codEAN && this.fnBuscaInfoEan()}
                            ref={(input) => { this.txtEAN = input; }}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View pointerEvents="none" style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Item</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.codItem}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                    <View pointerEvents="none" style={{ flex: 1.4 }}>
                        <Text style={styles.txtLabel}>UM</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.unidMed}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                    <View pointerEvents="none" style={{ flex: 3.7 }}>
                        <Text style={styles.txtLabel}>Lote</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.codLote}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View pointerEvents="none" style={{ flex: 1 }}>
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
                            value={this.props.descItem}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>                    
                </FormRow>
                <FormRow>
                    <View pointerEvents="none" style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Contagem</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={[styles.input, { flex: 1 }]}
                            value={this.props.nrContagem}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                    <View style={{ flex: 1.5 }}>
                        {this.renderQtde()}
                    </View>
                </FormRow>
                <FormRow>
                    <View style={styles.viewBotao}>
                        <Button
                            onPress={() => this.confirmButton()}
                            title="Confirmar"
                            color="green"
                        />
                    </View>
                </FormRow>
                <View style={{ padding: 5 }}>
                    <GridInventItens />
                </View>
                <View style={{ marginBottom: 50 }} />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => (
    {
        username: state.LoginReducer.usuario,
        codLocal: state.InventarioReducer.codLocal,
        nrContagem: state.InventarioReducer.nrContagem,
        codEAN: state.InventarioReducer.codEAN,
        codItem: state.InventarioReducer.codItem,
        unidMed: state.InventarioReducer.unidMed,
        descItem: state.InventarioReducer.descItem,
        codLote: state.InventarioReducer.codLote,
        dtInventario: state.InventarioReducer.dtInventario,
        qtItem: state.InventarioReducer.qtItem,
        modalVisible: state.InventarioReducer.modalVisible
    }
);

export default connect(mapStateToProps, {
    modificaCodLocal,
    modificaNrContagem,
    modificaCodEAN,
    modificaDtInventario,
    modificaCodLote,
    modificaQtItem,
    modificaModalVisible,
    cleanInventarioReducer,
    cleanInventarioReducerWDT,
    doConfirm,
    doConfirmEst,
    buscaInfoEAN
})(FormInventario);

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1,
        backgroundColor: '#4b86b4'
    },
    imgSeta: {
        width: 35,
        height: 35
    },
    txtLabel: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'sans-serif-medium',
        fontSize: 13
    },
    input: {
        height: 35,
        fontSize: 14,
        textAlign: 'center',
        backgroundColor: '#20293F',
        color: 'white',
        fontFamily: 'sans-serif-medium',
		borderRadius: 10
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
    dateInput: {
        height: 35,
        borderWidth: 0,
        backgroundColor: '#20293F',    
        borderRadius: 10,
        marginBottom: 5,
    },
    dateIcon: {
        marginBottom: 5
    },
    dateText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        fontFamily: 'sans-serif-medium'       
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

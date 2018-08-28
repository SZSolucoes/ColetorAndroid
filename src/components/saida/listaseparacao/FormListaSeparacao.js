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
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import FormRow from '../../utils/FormRow';
import ListaItemSep from './ListaItemSep';

import imgPrinter from '../../../../resources/imgs/impressao_etiq.png';
import imgUrgent from '../../../../resources/imgs/urgent.png';

import {
    modificaBatismo,
    modificaCodEAN,
    modificaLocalizacao,
    modificaLote,
    modificaQtdEtiq,
    modificaQuantidade,
    modificaClean,
    modificaUm, 
    modificaQtdSep,
    modificaCodItem,
    modificaDesItem,
    modificaItemSelected,
    modificaValidEan,
    modificaValidQtd,
    doSep
} from '../../../actions/ListaSeparacaoActions';

class FormListaSeparacao extends Component {

    constructor(props) {
        super(props);

        this.onPressSeparar = this.onPressSeparar.bind(this);
        this.findItemEAN = this.findItemEAN.bind(this);
        this.onChangeQtdText = this.onChangeQtdText.bind(this);
        this.onSubmitQtd = this.onSubmitQtd.bind(this);
        this.onPressNoQtd = this.onPressNoQtd.bind(this);
        this.eanError = this.eanError.bind(this);
        this.setValidQtd = this.setValidQtd.bind(this);
    }

    componentDidMount() {
        if (this.props.isUrgent) {
            Actions.refresh({ right: this.renderImgUrgent });
        }
    }
    
    componentWillUnmount() {
        this.props.modificaClean();
    }
    
    
    onPressNoQtd() {
        this.props.modificaQuantidade('');
    }
    
    onChangeQtdText(value) {
        const txtParsed = value.replace(/[^0-9]/g, '');
        this.props.modificaQuantidade(txtParsed);
    }
    
    onPressSeparar() {
        const {
            usuario,
            embarque,
            resumo,
            nomeAbrev,
            pedido,
            range,
            batismo,
            codEAN,
            quantidade,
            localizacao,
            lote,
            itemSelected,
            validEan,
            validQtd
        } = this.props;

        if (
            batismo.trim() && 
            codEAN.trim() && 
            quantidade.trim() &&
            localizacao.trim() &&  
            itemSelected !== -1 &&
            validEan &&
            (validQtd || this.onSubmitQtd(false))
        ) {
            const {
                estab,
                seq,
                itCode,
                refer,
                entrega,
                depos
            } = this.props.listaItensSepPc[itemSelected];
    
            const params = {
                userName: usuario,
                embarque,
                resumo,
                nome: nomeAbrev,
                pedido,
                range,
                estab,
                seq,
                item: itCode,
                refer,
                entrega,
                depos,
                local: localizacao,
                lote,
                etiqueta: batismo,
                ean: codEAN,
                qtdItem: quantidade
            };
    
            const newItemList = [...this.props.listaItensSepPc];
            newItemList.splice(itemSelected, 1);
            this.props.doSep(params, newItemList);
        } else if (!batismo.trim()) {
            Alert.alert('Separação', 'Campo (Batismo) deve ser informado.');
        } else if (!codEAN.trim()) {
            Alert.alert('Separação', 'Campo (EAN) deve ser informado.');
        } else if (!quantidade.trim()) {
            Alert.alert('Separação', 'Campo (Qtd) deve ser informado.');
        } else if (!localizacao.trim()) {
            Alert.alert('Separação', 'Campo (Localização) deve ser informado.');
        } else if (itemSelected === -1 || !validEan) {
            this.eanError();
            Alert.alert('Separação', 'EAN Não Localizado!');
        }
    }

    onSubmitQtd(fieldYesOrNo) {
        const { qtdSep, quantidade } = this.props;
        
        Keyboard.dismiss();

        if (!qtdSep) {
            Alert.alert('Separação', 'É necessário selecionar um item a separar.');
            this.props.modificaValidQtd(false);
            return false;
        }

        if (quantidade && quantidade !== '0') {
            if (Number(quantidade) < Number(qtdSep)) {
                Alert.alert(
                    'Aviso',
                    `A quantidade informada é inferior à quantidade de separação!\
                    \nQtd Sep: ${qtdSep}\
                    \nQtd: ${quantidade}\
                    \n\n Deseja prosseguir ?`,
                    [
                        { 
                            text: 'Sim', 
                            onPress: () => this.setValidQtd(fieldYesOrNo), 
                            style: 'cancel' 
                        },
                        { 
                            text: 'Não', 
                            onPress: () => this.onPressNoQtd() 
                        },
                    ],
                    { cancelable: false }
                );
                this.props.modificaValidQtd(false);
                return false;
            } else if (Number(quantidade) > Number(qtdSep)) {
                Alert.alert(
                    'Aviso',
                    `A quantidade informada é superior à quantidade de separação!\
                    \nQtd Sep: ${qtdSep}\
                    \nQtd: ${quantidade}\
                    \n\nQuantidade inválida.`,
                    [
                        { text: 'OK', onPress: () => this.onPressNoQtd() },
                    ],
                    { cancelable: false }
                );
                this.props.modificaValidQtd(false);
                return false;
            }
        } else if (quantidade && quantidade === '0') {
            this.onPressNoQtd();
            return false;
        }
        this.props.modificaValidQtd(true);
        return true;
    }

    setValidQtd(fieldYesOrNo) {
        if (fieldYesOrNo) {
            this.props.modificaValidQtd(true);
        } else {
            this.props.modificaValidQtd(true);
            setTimeout(() => this.onPressSeparar(), 500);
        }
    }

    findItemEAN() {
        const { codEAN, listaItensSepPc } = this.props;
        const itensEAN = _.values(listaItensSepPc);
        const indexItemEAN = _.findIndex(itensEAN, (itemCheck) => (
            itemCheck.ean1 === codEAN ||
            itemCheck.ean2 === codEAN ||
            itemCheck.ean3 === codEAN ||
            itemCheck.ean4 === codEAN ||
            itemCheck.ean5 === codEAN
        ));
        
        Keyboard.dismiss();
        
        if (indexItemEAN !== -1) {
            const {
                un,
                qtdItem,
                itCode,
                itDesc,
                local,
                lote
            } = itensEAN[indexItemEAN];
            this.props.modificaUm(un);
            this.props.modificaQtdSep(qtdItem);
            this.props.modificaCodItem(itCode);
            this.props.modificaDesItem(itDesc);
            this.props.modificaLocalizacao(local);
            this.props.modificaLote(lote);
            this.props.modificaQuantidade('');
            this.props.modificaValidEan(true);
            this.props.modificaItemSelected(indexItemEAN);
            this.quantidade.blur();
        } else {
            this.eanError();
            Alert.alert(
                'Serapação',
                'EAN Não Localizado!'
            );
        }
    }

    eanError() {
        this.props.modificaUm('');
        this.props.modificaQtdSep('');
        this.props.modificaCodItem('');
        this.props.modificaDesItem('');
        this.props.modificaLocalizacao('');
        this.props.modificaLote('');
        this.props.modificaQuantidade('');
        this.props.modificaItemSelected(-1);
        this.props.modificaValidEan(false);
    }

    renderImgUrgent() {
        return (
            <View
                style={styles.btUrgent}
            >
                <Image
                    source={imgUrgent}
                    style={styles.imgUrgent}
                />
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <FormRow>
                    <View pointerEvents="none" style={{ flex: 3 }}>
                        <Text style={styles.txtLabel}>Embarque</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={styles.input}
                            value={this.props.embarque}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View pointerEvents="none" style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Linhas</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={styles.input}
                            value={this.props.qtdItem}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View pointerEvents="none" style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Qtd Sep</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={styles.input}
                            value={this.props.qtdSep}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View pointerEvents="none">
                        <Text style={styles.txtLabel}>Pedido</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={styles.input}
                            value={this.props.pedido}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View pointerEvents="none">
                        <Text style={styles.txtLabel}>Nome Abrev</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={styles.input}
                            value={this.props.nomeAbrev}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Batismo</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.batismo}
                            ref={(input) => { this.batismo = input; }}
                            onSubmitEditing={() => this.codEAN.focus()}
                            onChangeText={(value) => this.props.modificaBatismo(value)}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>EAN</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.codEAN}
                            ref={(input) => { this.codEAN = input; }}
                            onSubmitEditing={() => this.findItemEAN()}
                            onBlur={() => this.props.codEAN && this.findItemEAN()}
                            onChangeText={(value) => this.props.modificaCodEAN(value)}
                            blurOnSubmit={false}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Localização</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.localizacao}
                            ref={(input) => { this.localizacao = input; }}
                            onSubmitEditing={() => this.lote.focus()}
                            onChangeText={(value) => this.props.modificaLocalizacao(value)}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.txtLabel}>Qtd</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='numeric'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.quantidade}
                            ref={(input) => { this.quantidade = input; }}
                            onSubmitEditing={() => this.onSubmitQtd(true)}
                            onBlur={() => this.props.quantidade && this.onSubmitQtd(true)}
                            onChangeText={(value) => this.onChangeQtdText(value)}
                            blurOnSubmit={false}
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
                            style={styles.input}
                            value={this.props.codItem}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View pointerEvents="none" style={{ flex: 1.5 }}>
                        <Text style={styles.txtLabel}>UM</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={styles.input}
                            value={this.props.um}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.txtLabel}>Lote</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.lote}
                            ref={(input) => { this.lote = input; }}
                            onSubmitEditing={() => this.quantidade.focus()}
                            onChangeText={(value) => this.props.modificaLote(value)}
                            blurOnSubmit={false}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View pointerEvents="none">
                        <Text style={styles.txtLabel}>Descrição</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            multiline
                            numberOfLines={3}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.inputDescricao}
                            value={this.props.desItem}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View style={styles.viewBotao}>
                        <Button
                            onPress={() => this.onPressSeparar()}
                            title="Separar"
                            color="green"
                        />
                    </View>
                    <View>
                        <Text style={[styles.txtLabel, { textAlign: 'left' }]}>Qtde Etiq</Text>
                        <View style={styles.viewBtEtiq}>
                            <TextInput
                                selectTextOnFocus
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="go"
                                style={styles.input}
                                value={this.props.qtEtiq}
                                ref={(input) => { this.qtEtiq = input; }}
                                onChangeText={(value) => this.props.modificaQtdEtiq(value)}
                            />
                            <TouchableOpacity
                                style={styles.btSearch}
                                onPress={() => false}
                            >
                                <Image
                                    source={imgPrinter}
                                    style={styles.imgSearch}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>                     
                </FormRow>
                <View style={{ padding: 5 }}>
                    <ListaItemSep />
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    embarque: state.ListaSeparacaoReducer.embarque,
    resumo: state.ListaSeparacaoReducer.resumo,
    pedido: state.ListaSeparacaoReducer.pedido,
    nomeAbrev: state.ListaSeparacaoReducer.nomeAbrev,
    range: state.ListaSeparacaoReducer.range,
    batismo: state.ListaSeparacaoReducer.batismo,
    codEAN: state.ListaSeparacaoReducer.codEAN,
    localizacao: state.ListaSeparacaoReducer.localizacao,
    um: state.ListaSeparacaoReducer.um,
    qtdItem: state.ListaSeparacaoReducer.qtdItem,
    qtdSep: state.ListaSeparacaoReducer.qtdSep,
    codItem: state.ListaSeparacaoReducer.codItem,
    lote: state.ListaSeparacaoReducer.lote,
    quantidade: state.ListaSeparacaoReducer.quantidade,
    desItem: state.ListaSeparacaoReducer.desItem,
    qtEtiq: state.ListaSeparacaoReducer.qtEtiq,
    listaItensSepPc: state.ListaSeparacaoReducer.listaItensSepPc,
    itemSelected: state.ListaSeparacaoReducer.itemSelected,
    usuario: state.LoginReducer.usuario,
    validEan: state.ListaSeparacaoReducer.validEan,
    validQtd: state.ListaSeparacaoReducer.validQtd
});

export default connect(mapStateToProps, {
    modificaBatismo,
    modificaCodEAN,
    modificaLocalizacao,
    modificaLote,
    modificaQtdEtiq,
    modificaQuantidade,
    modificaClean,
    modificaUm, 
    modificaQtdSep,
    modificaCodItem,
    modificaDesItem,
    modificaItemSelected,
    modificaValidEan,
    modificaValidQtd,
    doSep
})(FormListaSeparacao);

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1,
        backgroundColor: '#4b86b4'
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
        flex: 2,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 10
    },
    btSearch: {
        width: 40,
        height: 35
    },
    imgSearch: {
        width: 35,
        height: 35
    },
    viewBtEtiq: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    btUrgent: {
        width: 40,
        height: 35,
        marginHorizontal: 5
    },
    imgUrgent: {
        width: 35,
        height: 35
    }
});

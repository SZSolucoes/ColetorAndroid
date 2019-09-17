import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Platform,
    Keyboard,
    Image,
    Alert
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import FormRow from '../../utils/FormRow';
import LoadingSpin from '../../utils/LoadingSpin';
import ListaItemConfSep from './ListaItemConfSep';

import {
    modificaBatismo,
    modificaQtdConfItens,
    modificaCodEAN,
    modificaQtde,
    modificaLote,
    modificaCodItem,
    modificaUm,
    modificaItemDesc,
    modificaLocalizacao,
    modificaItemSelected,
    modificaClean,
    doFetchBatismo,
    doConfSaida
} from '../../../actions/ConfereSaidaActions';

import imgUrgent from '../../../../resources/imgs/urgent.png';

class FormConferenciaSeparacao extends Component {

    constructor(props) {
        super(props);

        this.renderBtEfetiva = this.renderBtEfetiva.bind(this);
        this.doFetchBatismo = this.doFetchBatismo.bind(this);
        this.doConferir = this.doConferir.bind(this);
        this.focusInField = this.focusInField.bind(this);
        this.checkIfUrgent = this.checkIfUrgent.bind(this);
        this.renderImgUrgent = this.renderImgUrgent.bind(this);
        this.doCheckEnableLote = this.doCheckEnableLote.bind(this);
        this.onBlurLote = this.onBlurLote.bind(this);
        this.onBlurEAN = this.onBlurEAN.bind(this);
        this.onBlurQtde = this.onBlurQtde.bind(this);
        this.onChangeQtdText = this.onChangeQtdText.bind(this);
        this.doChangePersistTap = this.doChangePersistTap.bind(this);

        this.fieldsChanged = {
            batismo: false,
            lote: false,
            codEAN: false,
            quantidade: false
        };

        this.state = {
            persistTap: 'never'
        };
    }

    componentWillUnmount() {
        this.props.modificaClean();
    }

    onBlurEAN() {
        if (this.props.listItems.length > 0) {
            const { codEAN, listItems } = this.props;
            const itensEAN = _.values(listItems);
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
                    itCode,
                    un,
                    itDesc,
                    local
                } = itensEAN[indexItemEAN];
        
                this.props.modificaQtde('');
                this.props.modificaCodItem(itCode);
                this.props.modificaUm(un);
                this.props.modificaLote('');
                this.props.modificaItemDesc(itDesc);
                this.props.modificaLocalizacao(local);
                this.props.modificaItemSelected(indexItemEAN);
    
                this.focusInField('quantidade'); 
            } else {
                this.focusInField('codean', true); 
                Alert.alert(
                    'Serapação',
                    'EAN Não Localizado!'
                );
            }
        }
    }

    onBlurLote() {
        if (this.props.itemSelected !== -1 && this.props.listItems.length > 0) {
            const { tpCont, lote } = this.props.listItems[this.props.itemSelected];
            if (tpCont === '3' && 
                (lote.toLowerCase() !== this.props.lote.toLowerCase())) {
                Alert.alert(
                    'Aviso',
                    `O Lote informado é inválido!\
                    \nLote Sugerido: ${lote}\
                    \nLote Informado: ${this.props.lote}\
                    \n\nLote inválido.`,
                    [
                        { text: 'OK', onPress: () => this.focusInField('lote', true) },
                    ],
                    { cancelable: false }
                );
                return;
            }
        }
    }

    onBlurQtde() {
        if (this.props.itemSelected !== -1 && this.props.listItems.length > 0) {
            const { quantidade } = this.props;
            const { qtdItem } = this.props.listItems[this.props.itemSelected];
            
            if (!qtdItem) {
                Alert.alert('Separação', 'É necessário selecionar um item a conferir.');
                this.focusInField('quantidade', true);
                return false;
            }
    
            if (quantidade) {
                if (Number(quantidade) < Number(qtdItem)) {
                    Alert.alert(
                        'Aviso',
                        `A quantidade informada é inferior à quantidade do item a conferir!\
                        \nQtd Sep: ${qtdItem}\
                        \nQtd: ${quantidade}\
                        \n\n Deseja prosseguir ?`,
                        [
                            { 
                                text: 'Sim', 
                                onPress: () => this.focusInField('lote'), 
                                style: 'cancel' 
                            },
                            { 
                                text: 'Não', 
                                onPress: () => this.focusInField('quantidade', true)
                            },
                        ],
                        { cancelable: false }
                    );
                    return false;
                } else if (Number(quantidade) > Number(qtdItem)) {
                    Alert.alert(
                        'Aviso',
                        `A quantidade informada é superior à quantidade do item a conferir!\
                        \nQtd Sep: ${qtdItem}\
                        \nQtd: ${quantidade}\
                        \n\nQuantidade inválida.`,
                        [
                            { text: 'OK', onPress: () => this.focusInField('quantidade', true) },
                        ],
                        { cancelable: false }
                    );
                    return false;
                }
            } else if (quantidade) {
                this.focusInField('quantidade', true);
                return false;
            }
            this.focusInField('lote');
            return true;
        }
    }

    onChangeQtdText(value) {
        const txtParsed = value.replace(/[^0-9]/g, '');
        this.props.modificaQtde(txtParsed);
    }
    
    checkIfUrgent() {
        if (this.props.isUrgent) {
            Actions.refresh({ right: () => this.renderImgUrgent(true) });
        } else {
            Actions.refresh({ right: () => this.renderImgUrgent(false) });
        }
    }

    doCheckEnableLote() {
        if (this.props.itemSelected !== -1 && this.props.listItems.length > 0 &&
            this.props.listItems[this.props.itemSelected].tpCont === '3') {
            return true;
        }
        return false;
    }

    doFetchBatismo() {
        const { usuario, batismo } = this.props;
        Keyboard.dismiss();
        this.props.doFetchBatismo(
            { userName: usuario, etiqueta: batismo }, 
            this.focusInField,
            this.checkIfUrgent);
    }

    doConferir() {
        const {
            usuario,
            embarque,
            resumo,
            nome,
            pedido,
            range,
            codEAN,
            quantidade,
            localizacao,
            lote,
            batismo,
            itemSelected
        } = this.props;

        if (
            batismo.trim() && 
            codEAN.trim() && 
            quantidade.trim() &&
            itemSelected !== -1
        ) {
            const {
                estab,
                seq,
                itCode,
                refer,
                entrega,
                depos,
                tpCont
            } = this.props.listItems[itemSelected];

            if (tpCont === '3' && !lote) {
                Alert.alert(
                    'Conferência',
                    'Campo (Lote) deve ser informado!'
                );
                return;
            }
    
            const params = {
                userName: usuario,
                embarque,
                resumo,
                nome,
                pedido,
                range,
                estab,
                seq,
                itCode,
                refer,
                entrega,
                depos,
                local: localizacao,
                lote,
                etiqueta: batismo,
                ean: codEAN,
                qtdItem: quantidade
            };
    
            const newItemList = [...this.props.listItems];
            newItemList.splice(itemSelected, 1);
            const listEmpty = !!(newItemList.length === 0);
            this.props.doConfSaida(params, newItemList, listEmpty);
        } else if (!batismo.trim()) {
            Alert.alert('Conferência', 'Campo (Batismo) deve ser informado.');
        } else if (!codEAN.trim()) {
            Alert.alert('Conferência', 'Campo (EAN) deve ser informado.');
        } else if (!quantidade.trim()) {
            Alert.alert('Conferência', 'Campo (Qtd) deve ser informado.');
        } else if (itemSelected === -1) {
            this.eanError();
            Alert.alert('Conferência', 'EAN Não Localizado!');
        }
    }

    doChangePersistTap(notPersist = true) {
        if (notPersist) {
            this.setState({ persistTap: 'never' });
        } else {
            this.setState({ persistTap: 'always' });
        }
    }

    focusInField(field, cleanField = false) {
        switch (field) {
            case 'batismo':
                this.batismo.focus();
                this.fieldsChanged.batismo = true;
                if (cleanField) {
                    this.props.modificaBatismo('');
                }
                break;
            case 'codean':
                this.codEAN.focus();
                this.fieldsChanged.codEAN = true;
                if (cleanField) {
                    this.props.modificaCodEAN('');
                }
                break; 
            case 'lote':
                if (this.props.itemSelected !== -1 && this.props.listItems.length > 0 && 
                    this.props.listItems[this.props.itemSelected].tpCont === '3') {
                    this.lote.focus();
                    this.fieldsChanged.lote = true;
                }
                if (cleanField) {
                    this.props.modificaLote('');
                }
                break;
            case 'quantidade':
                this.quantidade.focus();
                this.fieldsChanged.quantidade = true;
                if (cleanField) {
                    this.props.modificaQtde('');
                }
                break;
            default:  
        }
    }

    renderBtEfetiva() {
        if (Platform.OS === 'windows') {
            return (
                <View style={styles.viewBotao}>
                    <View style={{ width: 150 }}>
                        <Button
                            onPress={() => this.doConferir()}
                            title="Efetivar"
                            color="black"
                        />
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.viewBotao}>
                <Button
                    onPress={() => this.doConferir()}
                    title="Conferir"
                    color="green"
                />
            </View>
        );
    }

    renderImgUrgent(show) {
        if (show) {
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

        return (<View />);
    }

    render() {
        return (
            <ScrollView style={styles.viewPrinc} keyboardShouldPersistTaps={this.state.persistTap}>
                { Platform.OS !== 'windows' && <LoadingSpin /> }
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Batismo</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.batismo}
                            ref={(input) => { this.batismo = input; }}
                            onFocus={() => this.doChangePersistTap()}
                            onChangeText={value => {
                                this.fieldsChanged.batismo = true; 
                                this.props.modificaBatismo(value); 
                            }}
                            onBlur={() => { 
                                if (this.props.batismo && 
                                    this.fieldsChanged.batismo) {
                                        this.fieldsChanged.batismo = false;
                                        this.doFetchBatismo();
                                    } 
                            }}
                        />
                    </View>
                    <View pointerEvents="none" style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Embarque</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            underlineColorAndroid='transparent'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.embarque}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View pointerEvents="none" style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Pedido</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            underlineColorAndroid='transparent'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.pedido}
                        />
                    </View>
                    <View pointerEvents="none" style={{ flex: 3 }}>
                        <Text style={styles.txtLabel}>Total Itens</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            underlineColorAndroid='transparent'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.qtdTotItens}
                        />
                    </View>
                    <View pointerEvents="none" style={{ flex: 3 }}>
                        <Text style={styles.txtLabel}>Itens Conf</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={`${this.props.qtdConfItens}`}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View style={{ flex: 5 }}>
                        <Text style={styles.txtLabel}>EAN</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.codEAN}
                            ref={(input) => { this.codEAN = input; }}
                            onFocus={() => this.doChangePersistTap()}
                            onChangeText={value => {
                                this.fieldsChanged.codEAN = true; 
                                this.props.modificaCodEAN(value); 
                            }}
                            onBlur={() => { 
                                if (this.props.codEAN && this.fieldsChanged.codEAN) {
                                    this.fieldsChanged.codEAN = false;
                                    this.onBlurEAN();
                                } 
                            }}
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.txtLabel}>Qtde</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType={'numeric'}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.quantidade}
                            ref={input => { this.quantidade = input; }}
                            onFocus={() => this.doChangePersistTap()}
                            onChangeText={value => {
                                this.fieldsChanged.quantidade = true; 
                                this.onChangeQtdText(value); 
                            }}
                            onBlur={() => { 
                                if (this.props.quantidade && this.fieldsChanged.quantidade) {
                                    this.fieldsChanged.quantidade = false;
                                    this.onBlurQtde();
                                } 
                            }}
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
                            underlineColorAndroid='transparent'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.codItem}
                        />
                    </View>
                    <View pointerEvents="none" style={{ flex: 1.4 }}>
                        <Text style={styles.txtLabel}>UM</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            underlineColorAndroid='transparent'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.um}
                        />
                    </View>
                    <View style={{ flex: 3.7 }}>
                        <Text style={styles.txtLabel}>Lote</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.lote}
                            editable={this.doCheckEnableLote()}
                            ref={(input) => { this.lote = input; }}
                            onFocus={() => this.doChangePersistTap()}
                            onChangeText={value => {
                                this.fieldsChanged.lote = true; 
                                this.props.modificaLote(value); 
                            }}
                            onBlur={() => { 
                                if (this.props.lote && this.fieldsChanged.lote) {
                                    this.fieldsChanged.lote = false;
                                    this.onBlurLote();
                                } 
                            }}
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
                            underlineColorAndroid='transparent'
                            multiline
                            numberOfLines={3}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.inputDescricao}
                            value={this.props.itemDesc}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View pointerEvents="none" style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Separador</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            underlineColorAndroid='transparent'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.separador}
                        />
                    </View>
                    <View pointerEvents="none" style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Localização</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            underlineColorAndroid='transparent'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.localizacao}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View pointerEvents="none" style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Cidade</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            value={this.props.cidade}
                        />
                    </View>
                    <View pointerEvents="none" style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Entrega</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            value={this.props.entrega}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    {this.renderBtEfetiva()}
                    <View pointerEvents="none" style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Cliente</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            value={this.props.nome}
                        />
                    </View>
                </FormRow>
                <View style={{ padding: 5 }}>
                    <ListaItemConfSep />
                </View>
                <View style={{ marginBottom: 50 }} />
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    batismo: state.ConfereSaidaReducer.batismo,
    embarque: state.ConfereSaidaReducer.embarque,
    resumo: state.ConfereSaidaReducer.resumo,
    nome: state.ConfereSaidaReducer.nome,
    range: state.ConfereSaidaReducer.range,
    pedido: state.ConfereSaidaReducer.pedido,
    qtdTotItens: state.ConfereSaidaReducer.qtdTotItens,
    qtdConfItens: state.ConfereSaidaReducer.qtdConfItens,
    codEAN: state.ConfereSaidaReducer.codEAN,
    quantidade: state.ConfereSaidaReducer.quantidade,
    itemDesc: state.ConfereSaidaReducer.itemDesc,
    codItem: state.ConfereSaidaReducer.codItem,
    um: state.ConfereSaidaReducer.um,
    lote: state.ConfereSaidaReducer.lote,
    separador: state.ConfereSaidaReducer.separador,
    localizacao: state.ConfereSaidaReducer.localizacao,
    cidade: state.ConfereSaidaReducer.cidade,
    entrega: state.ConfereSaidaReducer.entrega,
    isUrgent: state.ConfereSaidaReducer.isUrgent,
    usuario: state.LoginReducer.usuario,
    listItems: state.ConfereSaidaReducer.listItems,
    itemSelected: state.ConfereSaidaReducer.itemSelected
});

export default connect(mapStateToProps, {
    modificaBatismo,
    modificaQtdConfItens,
    modificaCodEAN,
    modificaQtde,
    modificaLote,
    modificaCodItem,
    modificaUm,
    modificaItemDesc,
    modificaLocalizacao,
    modificaItemSelected,
    modificaClean,
    doFetchBatismo,
    doConfSaida
})(FormConferenciaSeparacao);

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
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        marginTop: 10,
        paddingHorizontal: 10
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

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
import LoadingSpin from '../../utils/LoadingSpin';
import ListaItemSep from './ListaItemSep';

import imgPrinter from '../../../../resources/imgs/impressao_etiq.png';
import imgUrgent from '../../../../resources/imgs/urgent.png';
import imgRefresh from '../../../../resources/imgs/refresh.png';

import {
    modificaBatismo,
    modificaCodEAN,
    modificaLocalizacao,
    modificaLocalizacaoConf,
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
    doSep,
    fetchListItensSep,
    doPrintEtiqEAN
} from '../../../actions/ListaSeparacaoActions';

class FormListaSeparacao extends Component {

    constructor(props) {
        super(props);

        this.onPressSeparar = this.onPressSeparar.bind(this);
        this.findItemEAN = this.findItemEAN.bind(this);
        this.onChangeQtdText = this.onChangeQtdText.bind(this);
        this.onChangeQtdEtiq = this.onChangeQtdEtiq.bind(this);
        this.onSubmitQtd = this.onSubmitQtd.bind(this);
        this.onBlurLote = this.onBlurLote.bind(this);
        this.onPressNoQtd = this.onPressNoQtd.bind(this);
        this.onPressNoLote = this.onPressNoLote.bind(this);
        this.eanError = this.eanError.bind(this);
        this.setValidQtd = this.setValidQtd.bind(this);
        this.validLocalConf = this.validLocalConf.bind(this);
        this.doCheckEnableLote = this.doCheckEnableLote.bind(this);
        this.loteFocus = this.loteFocus.bind(this);
        this.doChangePersistTap = this.doChangePersistTap.bind(this);
        this.onPressPrint = this.onPressPrint.bind(this);
        this.renderToolIcons = this.renderToolIcons.bind(this);
        this.refreshTools = this.refreshTools.bind(this);
        this.onPressRefreshIcon = this.onPressRefreshIcon.bind(this);

        this.fieldsChanged = {
            localizacaoConf: false, 
            codEAN: false,
            quantidade: false,
            lote: false
        };

        this.state = {
            persistTap: 'never'
        };
    }

    componentDidMount() {
        this.refreshTools();
    }
    
    componentWillUnmount() {
        this.props.modificaClean();
    }

    onPressNoQtd() {
        this.props.modificaQuantidade('');
        this.quantidade.focus();
    }

    onPressNoLocalConf() {
        this.props.modificaLocalizacaoConf('');
        this.localizacaoConf.focus();
    }

    onPressNoLote() {
        this.props.modificaLote('');
        this.loteFocus();
    }

    onBlurLote() {
        const { listaItensSepPc, itemSelected } = this.props;
        if (itemSelected !== -1 && 
            listaItensSepPc && 
            listaItensSepPc.length > 0) {
            const { tpCont, lote } = listaItensSepPc[itemSelected];
            if (tpCont === '3' && 
                (lote.toLowerCase() !== this.props.lote.toLowerCase())) {
                Alert.alert(
                    'Aviso',
                    `O Lote informado é inválido!\
                    \nLote Sugerido: ${lote}\
                    \nLote Informado: ${this.props.lote}\
                    \n\nLote inválido.`,
                    [
                        { text: 'OK', onPress: () => this.onPressNoLote() },
                    ],
                    { cancelable: false }
                );
                return;
            }
        }
        //this.onPressSeparar();
    }
    
    onChangeQtdText(value) {
        const txtParsed = value.replace(/[^0-9]/g, '');
        this.props.modificaQuantidade(txtParsed);
    }

    onChangeQtdEtiq(value) {
        const txtParsed = value.replace(/[^1-9]/g, '');
        this.props.modificaQtdEtiq(txtParsed);
    }

    onPressRefreshIcon() {
        const { usuario } = this.props;
        this.props.fetchListItensSep(usuario, this.refreshTools);
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
            localizacaoConf,
            lote,
            itemSelected,
            validEan,
            validQtd,
            listaItensSepPc
        } = this.props;

        if (
            listaItensSepPc && 
            listaItensSepPc.length > 0 &&
            batismo.trim() && 
            codEAN.trim() && 
            quantidade.trim() &&
            localizacaoConf.trim() &&  
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
                depos,
                tpCont
            } = listaItensSepPc[itemSelected];

            if (tpCont === '3' && !lote) {
                Alert.alert(
                    'Separação',
                    'Campo (Lote) deve ser informado!'
                );
                return;
            }
    
            const params = {
                userName: usuario,
                embarque,
                resumo,
                nome: nomeAbrev,
                pedido,
                range,
                estab,
                seq,
                itCode,
                refer,
                entrega,
                depos,
                local: localizacaoConf,
                lote,
                etiqueta: batismo,
                ean: codEAN,
                qtdItem: quantidade
            };
    
            const newItemList = [...listaItensSepPc];
            newItemList.splice(itemSelected, 1);
            this.props.doSep(params, newItemList, this.refreshTools);
        } else if (!batismo.trim()) {
            Alert.alert('Separação', 'Campo (Batismo) deve ser informado.');
        } else if (!codEAN.trim()) {
            Alert.alert('Separação', 'Campo (EAN) deve ser informado.');
        } else if (!quantidade.trim()) {
            Alert.alert('Separação', 'Campo (Qtd) deve ser informado.');
        } else if (!localizacaoConf.trim()) {
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

        if (quantidade) {
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
        } else if (quantidade) {
            this.onPressNoQtd();
            return false;
        }
        this.props.modificaValidQtd(true);
        this.loteFocus();
        
        return true;
    }

    onPressPrint() {
        const { codEAN, qtEtiq, usuario, lote } = this.props;
        const params = {
            usuario,
            codEAN,
            qtdEtiq: qtEtiq,
            lote
        };

        if (codEAN && qtEtiq && qtEtiq !== '0') {
            this.props.doPrintEtiqEAN(params);
        } else if (!codEAN) {
            Alert.alert(
                'Impressão Etiqueta',
                'Campo (EAN) deve ser informado.'
            );
        } else if (!qtEtiq || qtEtiq === '0') {
            Alert.alert(
                'Impressão Etiqueta',
                'Campo (Qtde Etiq) deve ser informado'
            );
        }
    }

    setValidQtd(fieldYesOrNo) {
        if (fieldYesOrNo) {
            this.props.modificaValidQtd(true);
            this.loteFocus();
        } else {
            this.props.modificaValidQtd(true);
            setTimeout(() => this.onPressSeparar(), 500);
        }
    }

    doCheckEnableLote() {
        const { listaItensSepPc, itemSelected } = this.props;
        if (itemSelected !== -1 && 
            listaItensSepPc && 
            listaItensSepPc.length > 0 &&
            listaItensSepPc[itemSelected].tpCont === '3') {
            return true;
        }
        return false;
    }

    findItemEAN() {
        const { codEAN, listaItensSepPc } = this.props;

        if (listaItensSepPc && listaItensSepPc.length > 0) {
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
    
                if (this.props.localizacaoConf && 
                    (local.toLowerCase() !== this.props.localizacaoConf.toLowerCase())) {
                    Alert.alert(
                        'Aviso',
                        `A localização informada é divergente da localização sugerida!\
                        \nLocal Sugerido: ${local}\
                        \nLocal Informado: ${this.props.localizacaoConf}\
                        \n\nLocalização inválida.`,
                        [
                            { text: 'OK', onPress: () => this.onPressNoLocalConf() },
                        ],
                        { cancelable: false }
                    );
                } else {
                    this.quantidade.focus();
                }
            } else {
                this.eanError();
                Alert.alert(
                    'Serapação',
                    'EAN Não Localizado!'
                );
            }
        }
    }

    doChangePersistTap(notPersist = true) {
        if (notPersist) {
            this.setState({ persistTap: 'never' });
        } else {
            this.setState({ persistTap: 'always' });
        }
    }

    eanError() {
        this.props.modificaItemSelected(-1);
        this.props.modificaValidEan(false);
    }

    loteFocus() {
        const { listaItensSepPc, itemSelected } = this.props;
        if (itemSelected !== -1 && 
            listaItensSepPc && 
            listaItensSepPc.length > 0 &&
            listaItensSepPc[itemSelected].tpCont === '3') {
            this.lote.focus();
        }
    }

    validLocalConf() {
        if (this.props.localizacao.toLowerCase() !== this.props.localizacaoConf.toLowerCase()) {
            Alert.alert(
                'Aviso',
                `A localização informada é divergente da localização sugerida!\
                \nLocal Sugerido: ${this.props.localizacao}\
                \nLocal Informado: ${this.props.localizacaoConf}\
                \n\nLocalização inválida.`,
                [
                    { text: 'OK', onPress: () => this.onPressNoLocalConf() },
                ],
                { cancelable: false }
            );
        }

        this.codEAN.focus();
    }

    refreshTools() {
        Actions.refresh({ right: () => this.renderToolIcons() });
    }

    renderToolIcons() {
        return (
            <View style={{ flexDirection: 'row' }}>
                { 
                    this.props.enableFetchBtn &&
                    (
                        <TouchableOpacity
                            onPress={() => this.onPressRefreshIcon()}
                        >
                            <View
                                style={styles.btnTools}
                            >
                                <Image
                                    source={imgRefresh}
                                    style={{
                                        marginTop: 5,
                                        width: 30,
                                        height: 30
                                    }}
                                />
                            </View> 
                        </TouchableOpacity>
                    )
                }
                {
                    this.props.isUrgent &&
                    (
                        <View
                            style={styles.btnTools}
                        >
                            <Image
                                source={imgUrgent}
                                style={styles.imgTools}
                            />
                        </View>
                    )
                }
            </View>
        );
    }
    
    render() {
        return (
            <ScrollView style={styles.viewPrinc} keyboardShouldPersistTaps={this.state.persistTap}>
                <LoadingSpin />
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
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Local Sugerido</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={[styles.input, { fontSize: 13 }]}
                            value={this.props.localizacao}
                            underlineColorAndroid='transparent'
                        />
                    </View>
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
                            onFocus={() => this.doChangePersistTap(false)}
                            onSubmitEditing={() => this.localizacaoConf.focus()}
                            onChangeText={(value) => this.props.modificaBatismo(value)}
                            blurOnSubmit={false}
                        />
                    </View>
                </FormRow>
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
                            style={[styles.input, { fontSize: 13 }]}
                            value={this.props.localizacaoConf}
                            ref={(input) => { this.localizacaoConf = input; }}
                            onFocus={() => this.doChangePersistTap()}
                            onChangeText={value => {
                                this.fieldsChanged.localizacaoConf = true; 
                                this.props.modificaLocalizacaoConf(value); 
                            }}
                            onBlur={() => { 
                                if (this.props.localizacaoConf && 
                                    this.fieldsChanged.localizacaoConf) {
                                        this.fieldsChanged.localizacaoConf = false;
                                        this.validLocalConf();
                                }
                            }}
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
                            onFocus={() => this.doChangePersistTap()}
                            onChangeText={value => {
                                this.fieldsChanged.codEAN = true; 
                                this.props.modificaCodEAN(value); 
                            }}
                            onBlur={() => { 
                                if (this.props.codEAN && this.fieldsChanged.codEAN) {
                                    this.fieldsChanged.codEAN = false;
                                    this.findItemEAN();
                                } 
                            }}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View pointerEvents="none" style={{ flex: 0.8 }}>
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
                    <View pointerEvents="none" style={{ flex: 1 }}>
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
                    <View style={{ flex: 0.5 }}>
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
                            onFocus={() => this.doChangePersistTap()}
                            onChangeText={value => {
                                this.fieldsChanged.quantidade = true; 
                                this.onChangeQtdText(value); 
                            }}
                            onBlur={() => { 
                                if (this.props.quantidade && this.fieldsChanged.quantidade) {
                                    this.fieldsChanged.quantidade = false;
                                    this.onSubmitQtd(true);
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
                            editable={this.doCheckEnableLote()}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.lote}
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
                                //this.onPressSeparar();
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
                    <View pointerEvents="none">
                        <Text style={styles.txtLabel}>Entrega</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={styles.input}
                            value={this.props.entrega}
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View pointerEvents="none">
                        <Text style={styles.txtLabel}>Cond Pagamento</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={styles.input}
                            value={this.props.condPagto}
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
                                onFocus={() => this.doChangePersistTap(false)}
                                onChangeText={(value) => this.onChangeQtdEtiq(value)}
                            />
                            <TouchableOpacity
                                style={styles.btSearch}                                
                                onPress={() => this.onPressPrint()}
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
    localizacaoConf: state.ListaSeparacaoReducer.localizacaoConf,
    um: state.ListaSeparacaoReducer.um,
    qtdItem: state.ListaSeparacaoReducer.qtdItem,
    qtdSep: state.ListaSeparacaoReducer.qtdSep,
    codItem: state.ListaSeparacaoReducer.codItem,
    lote: state.ListaSeparacaoReducer.lote,
    quantidade: state.ListaSeparacaoReducer.quantidade,
    desItem: state.ListaSeparacaoReducer.desItem,
    qtEtiq: state.ListaSeparacaoReducer.qtEtiq,
    entrega: state.ListaSeparacaoReducer.entrega,
    condPagto: state.ListaSeparacaoReducer.condPagto,
    listaItensSepPc: state.ListaSeparacaoReducer.listaItensSepPc,
    itemSelected: state.ListaSeparacaoReducer.itemSelected,
    usuario: state.LoginReducer.usuario,
    validEan: state.ListaSeparacaoReducer.validEan,
    validQtd: state.ListaSeparacaoReducer.validQtd,
    enableFetchBtn: state.ListaSeparacaoReducer.enableFetchBtn,
    isUrgent: state.ListaSeparacaoReducer.isUrgent
});

export default connect(mapStateToProps, {
    modificaBatismo,
    modificaCodEAN,
    modificaLocalizacao,
    modificaLocalizacaoConf,
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
    doSep,
    fetchListItensSep,
    doPrintEtiqEAN
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
    btnTools: {
        width: 40,
        height: 35,
        marginHorizontal: 5
    },
    imgTools: {
        marginTop: 2,
        width: 35,
        height: 35
    }
});

/* eslint-disable max-len */
import React from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    Button,
    Platform,
    Keyboard
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ListaItem from './ListaItemConf';
import InfoItemConferencia from './InfoItemConferencia';
import { 
    modificaBatismo,
    modificaCodEAN,
    modificaCodItemConf,
    modificaDesItem,
    modificaFornec,
    modificaLocalPad,
    modificaNrNotaFis,
    modificaQtConferir,
    modificaQtEtiq,
    modificaQtItem,
    modificaQtTotal,
    modificaUnidMed,
    iniciaTela,
    limpaTela,
    buscaNotaConferencia,
    efetivaConfere,
    modificaListaItem,
    modificaNotaConfere,
    modificaItemConfere,
    modificaInfoVisible,
    modificaOnEfetivar,
    modificaConferenciaEntradaClear
} from '../../../actions/ConfereActions';
import {
    imprimeEtiquetaEAN
} from '../../../actions/ImpressaoActions';
import { 
    modificaCodEan,
    modificaCodItem
} from '../../../actions/RelEanActions';
import { defaultFormStyles } from '../../utils/Forms';

import LoadingSpin from '../../utils/LoadingSpin';

import imgZoom from '../../../../resources/imgs/zoom_nf.png';
import imgPrinter from '../../../../resources/imgs/impressao_etiq.png';
import imgClear from '../../../../resources/imgs/limpa_tela.png';
import imgRelEan from '../../../../resources/imgs/relacionaean.png';

class FormConf extends React.PureComponent {
    constructor() {
        super();
     
        this.state = {
            qtdDisable: true,
            batismoDisable: true
        };

        this.fieldsChanged = {
            nf: false, 
            ean: false,
            qtitem: false,
            batismo: false 
        };
    }

    componentDidMount = () => {
        this.setState({ ...this.state, qtdDisable: true, batismoDisable: true });
        this.props.iniciaTela();
    }

    componentWillUnmount = () => {
        this.props.modificaConferenciaEntradaClear();
    }

    onPressEfetivar = () => {
        const { 
            usuario, 
            notaConfere, 
            codEAN, 
            qtItem, 
            batismo,
            pesoItem,
            largura,
            altura,
            comprimento,
            listaItemLote
        } = this.props;

        const conferencia = {
            batismo,
            codEAN,
            qtItem,
            pesoItem,
            largura,
            altura,
            comprimento,
            listaItemLote
        };

        let itemConfere = this.props.itemConfere;

        let qtConferida = 0;

        Keyboard.dismiss();

        if (batismo) {
            if (batismo.length === 0) {
                Alert.alert(
                    'Conferência',
                    'Etiqueta Batismo deve ser informada!'
                );
                return;
            } else if (batismo.toLowerCase().charAt(0) !== 'b') {
                Alert.alert(
                    'Conferência',
                    'Etiqueta Batismo inválida!'
                );
                return;   
            }
        } else {
            Alert.alert(
                'Conferência',
                'Etiqueta Batismo deve ser informada!'
            );
            return;
        }

        if (codEAN) {
            if (codEAN.length === 0) {
                Alert.alert(
                    'Conferência',
                    'EAN deve ser informado!'
                );
                return;
            } 
            
            const itensNF = _.values(notaConfere.itens);
   
            const itemConf = [_.find(itensNF, (itemCheck) => (
                itemCheck.ean1 === codEAN ||
                itemCheck.ean2 === codEAN ||
                itemCheck.ean3 === codEAN ||
                itemCheck.ean4 === codEAN ||
                itemCheck.ean5 === codEAN
            ))];

            if (itemConf[0]) {
                if (itemConf.length === 0) {
                    Alert.alert(
                        'Conferência',
                        'EAN Não Localizado!'
                    );
                    return;
                }
            } else {
                Alert.alert(
                    'Conferência',
                    'EAN Não Localizado!'
                );
                return;
            }
            
            itemConfere = itemConf[0];
        } else {
            Alert.alert(
                'Conferência',
                'EAN deve ser informado!'
            );
            return;
        }

        if (itemConfere.tpCont === '3') {
            if (listaItemLote.length === 0) {
                Alert.alert(
                    'Conferência',
                    'Lote deve ser informado!'
                );
                return;
            }

            for (let i = 0; i < listaItemLote.length; i++) {
                qtConferida += _.toInteger(listaItemLote[i].qtdItemLote);
            }
    
            if (_.toInteger(qtConferida) !== _.toInteger(qtItem)) {
                Alert.alert(
                    'Conferência',
                    'Quantidade Inválida!'
                );
                return;
            }
        } 
        
        if (qtItem) {
            if (qtItem.length === 0 || _.toInteger(qtItem) < 0) {
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

        this.props.modificaOnEfetivar(true);
        this.props.efetivaConfere({ usuario, notaConfere, itemConfere, conferencia });
    }
    onPressRelaciona = () => {
        //this.props.modificaCodEan(firstEan);
        this.props.modificaCodItem(this.props.codItem);

        Actions.relacionaEan();
    }
    onPressPrint = () => {
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

    onBlurNotaFiscal = () => {
        if (this.props.nrNotaFis && this.fieldsChanged.nf) {
            this.fieldsChanged.nf = false;
            this.carregaNF();
        } 
    }
    onBlurEan = () => {
        if (this.props.codEAN && this.fieldsChanged.ean) {
            this.fieldsChanged.ean = false;
            this.validEAN();
        } 
    }
    onBlurQuantidade = () => {
        if (this.props.qtItem && this.fieldsChanged.qtitem) {
            this.fieldsChanged.qtitem = false;
            this.validQtd();
        }
    }
    onBlurBatismo = () => {
        if (this.props.batismo && this.fieldsChanged.batismo) {
            this.fieldsChanged.batismo = false;
            this.validQtdItem();
        } 
    }

    onChangeNotaFiscal = (value) => {
        this.fieldsChanged.nf = true; 
        this.props.modificaNrNotaFis(value); 
    }
    onChangeEan = (value) => {
        this.fieldsChanged.ean = true; 
        this.props.modificaCodEAN(value); 
    }
    onChangeQuantidade = (value) => {
        this.fieldsChanged.qtitem = true; 
        this.props.modificaQtItem(value);
    }
    onChangeBatismo = (value) => {
        this.fieldsChanged.batismo = true; 
        this.props.modificaBatismo(value); 
    }
    onChangeQtdEtiq = (value) => {
        this.props.modificaQtEtiq(value);
    }

    onPressCleanEan = () => {
        this.props.modificaCodEAN();
    }

    validQtdItem = () => {
        const item = this.props.itemConfere;
        const { qtItem } = this.props;

        Keyboard.dismiss();

        if (qtItem) {
            if (qtItem.length === 0 || _.toInteger(qtItem) < 0) {
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

        if (item.qtdItem !== qtItem) {
            Alert.alert(
                'Conferência',
                'Quantidade Item Divergente! Deseja continuar?',
                [
                    { 
                        text: 'Não', 
                        onPress: () => false, 
                        style: 'cancel' 
                    },
                    { 
                        text: 'Sim', 
                        onPress: () => this.onPressEfetivar() 
                    },
                ],
                { cancelable: false }
            );
        } else {
            this.onPressEfetivar();
        }
    }
    carregaNF = () => {
        const nrNota = this.props.nrNotaFis;
        const listaConfere = _.values(this.props.listaNF);

        const notaConf = _.filter(listaConfere, { nroDocto: nrNota });

        Keyboard.dismiss();
        
        if (nrNota !== '') {
            if (notaConf.length === 0) {
                Alert.alert(
                    'Conferência',
                    'Nota Fiscal não Localizada!'
                );
                return;
            }

            const item = notaConf[0].itens[0];
            const qtdConf = notaConf[0].itens.length;

            this.props.modificaFornec(notaConf[0].nomeEmit);
            this.props.modificaNrNotaFis(notaConf[0].nroDocto);
            this.props.modificaQtTotal(notaConf[0].qtdItem);
            this.props.modificaQtConferir(_.toString(qtdConf));
            this.props.modificaListaItem(notaConf[0].itens);
            this.props.modificaCodItemConf(item.itCode);
            this.props.modificaDesItem(item.itDesc);
            this.props.modificaLocalPad(item.localiz);
            this.props.modificaUnidMed(item.un);
            this.props.modificaNotaConfere(notaConf[0]);
            this.props.modificaItemConfere(item);

            this.codEAN.focus();
        }
    }
    validEAN = () => {
        const { notaConfere, codEAN } = this.props;
        const itensNF = _.values(notaConfere.itens);

        const itemConf = [_.find(itensNF, (itemCheck) => (
                itemCheck.ean1 === codEAN ||
                itemCheck.ean2 === codEAN ||
                itemCheck.ean3 === codEAN ||
                itemCheck.ean4 === codEAN ||
                itemCheck.ean5 === codEAN
        ))];

        Keyboard.dismiss();
        
        if (itemConf[0]) {
            if (itemConf.length === 0) {
                Alert.alert(
                    'Conferência',
                    'EAN Não Localizado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Conferência',
                'EAN Não Localizado!'
            );
            return;
        }

        this.props.modificaCodItemConf(itemConf[0].itCode);
        this.props.modificaDesItem(itemConf[0].itDesc);
        this.props.modificaLocalPad(itemConf[0].localiz);
        this.props.modificaUnidMed(itemConf[0].un);
        this.props.modificaItemConfere(itemConf[0]);
        this.props.modificaQtItem();
        this.props.modificaBatismo();

        this.setState({ ...this.state, qtdDisable: true });

        this.qtItem.focus();

        if (_.toInteger(itemConf.peso) <= 0) {
            if (Platform.OS === 'windows') {
                Actions.winInfoItemConf();
            } else {
                //this.props.modificaInfoVisible(true);
            }
        }        
    }
    validQtd = () => {
        this.setState({ ...this.state, batismoDisable: true });

        const item = this.props.itemConfere;

        const { qtItem } = this.props;

        if (qtItem) {
            if (qtItem.length === 0 || _.toInteger(qtItem) < 0) {
                Alert.alert(
                    'Conferência',
                    'Quantidade Item deve ser maior que 0!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Conferência',
                'Quantidade Item deve ser informada!'
            );
            return;
        }

        if (item.tpCont === '3') {
            Actions.conferenciaLote();
        }

        this.batismo.focus();
    }
    procuraNFLista = () => {
        Actions.listaNFConf();
    }
    renderBtEfetiva = () => {
        if (Platform.OS === 'windows') {
            return (
                <View style={styles.viewBotao}>
                    <View style={{ width: 150 }}>
                        <Button
                            onPress={this.validQtdItem}
                            title="Efetivar"
                            color="black"
                        />
                    </View>
                </View>
            );
        }

        return (
            <View style={[styles.viewBotao, { flex: 2 }]}>
                <Button
                    onPress={this.validQtdItem}
                    title="Efetivar"
                    color="green"
                />
            </View>
        );
    }
    render = () => (
        <ScrollView style={styles.viewPrinc}>
            { Platform.OS !== 'windows' && <LoadingSpin /> }
            <View style={styles.viewLinha}>
                <View style={[styles.viewCampo, { flex: 2 }]}>
                    <Text style={styles.txtLabel}>Nota Fiscal</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={defaultFormStyles.input}
                            value={this.props.nrNotaFis}
                            ref={(input) => { this.nrNotaFis = input; }}
                            onChangeText={this.onChangeNotaFiscal}
                            onBlur={this.onBlurNotaFiscal}
                        />
                    </View>
                </View>
                <View style={styles.viewBtSearch}>
                    <TouchableOpacity
                        style={styles.btSearch}
                        onPress={this.procuraNFLista}                            
                    >
                        <Image
                            source={imgZoom}
                            style={styles.imgSearch}
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.viewCampo, { flex: 3 }]}>
                    <Text style={styles.txtLabel}>Fornecedor</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            value={this.props.fornec}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.viewLinha}>
                <View style={[styles.viewCampo, { flex: 2 }]}>
                    <Text style={styles.txtLabel}>Total</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            value={this.props.qtTotal}
                        />
                    </View>
                </View>
                <View style={[styles.viewCampo, { flex: 2 }]}>
                    <Text style={styles.txtLabel}>Conferir</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            value={this.props.qtConferir}
                        />
                    </View>
                </View>
                <View style={[styles.viewCampo, { flex: 6 }]}>
                    <Text style={[styles.txtLabel, { marginLeft: -30 }]}>EAN</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[defaultFormStyles.inputView, { flex: 6 }]}>
                            <TextInput
                                selectTextOnFocus
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="go"
                                style={defaultFormStyles.input}
                                value={this.props.codEAN}
                                ref={(input) => { this.codEAN = input; }}
                                onChangeText={this.onChangeEan}
                                onBlur={this.onBlurEan}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.btClear}
                            onPress={this.onPressCleanEan}
                        >
                            <Image
                                source={imgClear}
                                style={styles.imgClear}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.viewLinha}>
                <View style={[styles.viewCampo, { flex: 1 }]}>
                    <Text style={styles.txtLabel}>Qtde</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            editable={this.state.qtdDisable}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={defaultFormStyles.input}
                            value={this.props.qtItem}
                            ref={(input) => { this.qtItem = input; }}
                            onChangeText={this.onChangeQuantidade}
                            onBlur={this.onBlurQuantidade}
                        />
                    </View>
                </View>
                <View style={[styles.viewCampo, { flex: 3 }]}>
                    <Text style={styles.txtLabel}>Localização Padrão</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            value={this.props.localPad}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.viewLinha}>
                <View style={[styles.viewCampo, { flex: 5 }]}>
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
                <View style={[styles.viewCampo, { flex: 2 }]}>
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
                <View style={[styles.viewCampo, { flex: 3 }]}>
                    <Text style={styles.txtLabel}>Batismo</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            editable={this.state.batismoDisable}
                            returnKeyType="go"
                            style={defaultFormStyles.input}
                            value={this.props.batismo}
                            ref={(input) => { this.batismo = input; }}
                            onChangeText={this.onChangeBatismo}
                            onBlur={this.onBlurBatismo}
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
                        editable={false}
                        multiline
                        numberOfLines={3}
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType="next"
                        style={defaultFormStyles.inputDescricao}
                        value={this.props.desItem}
                    />
                </View>
            </View>
            { Platform.OS !== 'windows' ? (
                <View style={styles.viewLinha}>
                    {this.renderBtEfetiva()}
                    <View style={[styles.viewCampo, { flex: 2 }]}>
                        <View style={styles.viewBtEtiq}>
                            <View style={[styles.viewCampo, { flex: 2 }]}>
                                <Text style={styles.txtLabel}>Qtde Etiq</Text>
                                <View style={defaultFormStyles.inputView}>
                                    <TextInput
                                        selectTextOnFocus
                                        placeholder=""
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="numeric"
                                        placeholderTextColor='rgba(255,255,255,0.7)'
                                        editable={this.state.qtdDisable}
                                        returnKeyType="go"
                                        style={defaultFormStyles.input}
                                        onChangeText={this.onChangeQtdEtiq}
                                        value={this.props.qtEtiq}
                                        ref={(input) => { this.qtEtiq = input; }}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', marginTop: 20 }}>
                                <TouchableOpacity
                                    style={styles.btSearch}
                                    onPress={this.onPressPrint}
                                >
                                    <Image
                                        source={imgPrinter}
                                        style={styles.imgSearch}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', marginTop: 20, marginLeft: 5 }}>
                                <TouchableOpacity
                                    style={styles.btSearch}
                                    onPress={this.onPressRelaciona}
                                >
                                    <Image
                                        source={imgRelEan}
                                        style={styles.imgSearch}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            ) : (
                // WINDOWS RENDER
                <View style={styles.viewLinha}>
                    <View style={{ flex: 2 }}>
                        {this.renderBtEfetiva()}
                    </View>
                    <View style={[styles.viewCampo, { flex: 2 }]}>
                        <Text style={styles.txtLabel}>Qtde Etiq</Text>
                        <View style={styles.viewBtEtiq}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                editable={this.state.qtdDisable}
                                returnKeyType="go"
                                style={defaultFormStyles.input}
                                onChangeText={this.onChangeQtdEtiq}
                                value={this.props.qtEtiq}
                                ref={(input) => { this.qtEtiq = input; }}
                            />
                        </View>
                    </View>
                    <View 
                        style={{
                            justifyContent: 'center', 
                            alignItems: 'center',
                            marginTop: 15,
                            marginRight: 5 
                        }}
                    >
                        <TouchableOpacity
                            style={styles.btSearch}
                            onPress={this.onPressPrint}
                        >
                            <Image
                                source={imgPrinter}
                                style={styles.imgSearch}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                                style={styles.btSearch}
                                onPress={this.onPressRelaciona}
                        >
                            <Image
                                source={imgRelEan}
                                style={styles.imgSearch}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            ) }
            <View style={{ padding: 5 }} >
                <ListaItem />
            </View>
            <InfoItemConferencia />
        </ScrollView>
    )
}

const mapStateToProps = state => (
        {
            nrNotaFis: state.ConfereReducer.nrNotaFis,
            fornec: state.ConfereReducer.fornec,
            qtTotal: state.ConfereReducer.qtTotal,
            qtConferir: state.ConfereReducer.qtConferir,
            codEAN: state.ConfereReducer.codEAN,
            qtItem: state.ConfereReducer.qtItem,
            localPad: state.ConfereReducer.localPad,
            codItem: state.ConfereReducer.codItem,
            unidMed: state.ConfereReducer.unidMed,
            batismo: state.ConfereReducer.batismo,
            desItem: state.ConfereReducer.desItem,
            qtEtiq: state.ConfereReducer.qtEtiq,
            usuario: state.LoginReducer.usuario,
            notaConfere: state.ConfereReducer.notaConfere,
            itemConfere: state.ConfereReducer.itemConfere,
            listaNF: state.ConfereReducer.listaNF,
            pesoItem: state.ConfereReducer.pesoItem,
            altura: state.ConfereReducer.altura,
            comprimento: state.ConfereReducer.comprimento,
            largura: state.ConfereReducer.largura,
            listaItemLote: state.ConfereReducer.listaItemLote,
            onEfetivar: state.ConfereReducer.onEfetivar
        }
    );

export default connect(mapStateToProps, { 
    modificaBatismo,
    modificaCodEAN,
    modificaCodItemConf,
    modificaDesItem,
    modificaFornec,
    modificaLocalPad,
    modificaNrNotaFis,
    modificaQtConferir,
    modificaQtEtiq,
    modificaQtItem,
    modificaQtTotal,
    modificaUnidMed,
    iniciaTela,
    limpaTela,
    buscaNotaConferencia,
    imprimeEtiquetaEAN,
    efetivaConfere,
    modificaListaItem,
    modificaNotaConfere,
    modificaItemConfere,
    modificaInfoVisible,
    modificaOnEfetivar,
    modificaCodEan,
    modificaCodItem,
    modificaConferenciaEntradaClear
})(FormConf);

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
    txtLabel: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'sans-serif-medium',
        fontSize: 13
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
    button: {
        alignItems: 'center',
        width: 90,
        height: 35,
        padding: 10,
        borderRadius: 10
    },
    viewBtSearch: {
        justifyContent: 'flex-end'
    },
    viewBtEtiq: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    btClear: {
        width: 30,
        height: 35
    },
    imgClear: {
        width: 30,
        height: 35
    }
});

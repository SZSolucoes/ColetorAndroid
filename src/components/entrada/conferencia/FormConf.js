import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    Button
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ListaItem from './ListaItemConf';
import InfoItemConferencia from './InfoItemConferencia';
import { 
    modificaBatismo,
    modificaCodEAN,
    modificaCodItem,
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
    modificaInfoVisible
} from '../../../actions/ConfereActions';
import {
    imprimeEtiquetaEAN
} from '../../../actions/ImpressaoActions';

const imgZoom = require('../../../../resources/imgs/zoom_nf.png');
const imgPrinter = require('../../../../resources/imgs/impressao_etiq.png');

class FormConf extends Component {
    constructor() {
        super();
     
        this.state = {
            qtdDisable: true,
            batismoDisable: true
        };
    }
    componentWillMount() {
        this.setState({ qtdDisable: true });
        this.setState({ batismoDisable: true });

        this.props.iniciaTela();
    }
    onPressEfetivar() {
        const { 
            usuario, 
            notaConfere, 
            itemConfere, 
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

        const item = this.props.itemConfere;

        if (batismo.length === 0) {
            Alert.alert(
                'Conferência',
                'Etiqueta Batismo deve ser informada!'
            );
            return;
        }

        if (codEAN.length === 0) {
            Alert.alert(
                'Conferência',
                'EAN deve ser informado!'
            );
            return;
        }

        if (item.tpCont === '3') {
            if (listaItemLote.length === 0) {
                Alert.alert(
                    'Conferência',
                    'Lote deve ser informado!'
                );
                return;
            }
        } 
        
        if (qtItem.length === 0 || _.toInteger(qtItem) < 1) {
            Alert.alert(
                'Conferência',
                'Quantidade Item deve ser maior que 0!'
            );
            return;  
        }

        this.props.efetivaConfere({ usuario, notaConfere, itemConfere, conferencia });        
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
    validQtdItem() {
        const item = this.props.itemConfere;
        const { qtItem } = this.props;

        if (qtItem.length === 0 || _.toInteger(qtItem) < 1) {
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
    carregaNF() {
        const nrNota = this.props.nrNotaFis;
        const listaConfere = _.values(this.props.listaNF);

        const notaConf = _.filter(listaConfere, { nroDocto: nrNota });
        
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
            this.props.modificaCodItem(item.itCode);
            this.props.modificaDesItem(item.itDesc);
            this.props.modificaLocalPad(item.localiz);
            this.props.modificaUnidMed(item.un);
            this.props.modificaNotaConfere(notaConf[0]);
            this.props.modificaItemConfere(item);

            this.codEAN.focus();
        }
    }
    validEAN() {
        const { notaConfere, codEAN } = this.props;
        const itensNF = _.values(notaConfere.itens);

        const itemConf = _.filter(itensNF, { ean: codEAN });
        
        if (itemConf.length === 0) {
            Alert.alert(
                'Conferência',
                'EAN Não Localizado!'
            );
            return;
        }

        this.props.modificaCodItem(itemConf.itCode);
        this.props.modificaDesItem(itemConf.itDesc);
        this.props.modificaLocalPad(itemConf.localiz);
        this.props.modificaUnidMed(itemConf.un);
        this.props.modificaItemConfere(itemConf);

        this.setState({ qtdDisable: true });

        this.qtItem.focus();

        if (itemConf.peso < 1) {
            this.props.modificaInfoVisible(true);
        }        
    }
    validQtd() {
        this.setState({ batismoDisable: true });

        const item = this.props.itemConfere;

        const { qtItem } = this.props;

        if (qtItem.length === 0 || _.toInteger(qtItem) < 1) {
            Alert.alert(
                'Conferência',
                'Quantidade Item deve ser maior que 0!'
            );
            return;
        }

        if (item.tpCont === '3') {
            Actions.conferenciaLote();
        }

        this.batismo.focus();
    }
    procuraNFLista() {
        Actions.listaNFConf();
    }
    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Nota Fiscal</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            onChangeText={nrNotaFis => this.props.modificaNrNotaFis(nrNotaFis)}
                            value={this.props.nrNotaFis}
                            ref={(input) => { this.nrNotaFis = input; }}
                            onSubmitEditing={() => { this.carregaNF(); }}
                            onBlur={() => { this.carregaNF(); }}
                        />
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
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Fornecedor</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={fornec => this.props.modificaFornec(fornec)}
                            value={this.props.fornec}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Total</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={qtTotal => this.props.modificaQtTotal(qtTotal)}
                            value={this.props.qtTotal}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Conferir</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={qtConferir => this.props.modificaQtConferir(qtConferir)}
                            value={this.props.qtConferir}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 3 }]}>
                        <Text style={styles.txtLabel}>EAN</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            onChangeText={codEAN => this.props.modificaCodEAN(codEAN)}
                            value={this.props.codEAN}
                            ref={(input) => { this.codEAN = input; }}
                            onSubmitEditing={() => { this.validEAN(); }}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Qtde</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            editable={this.state.qtdDisable}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            onChangeText={qtItem => this.props.modificaQtItem(qtItem)}
                            value={this.props.qtItem}
                            ref={(input) => { this.qtItem = input; }}
                            onSubmitEditing={() => { this.validQtd(); }}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 3 }]}>
                        <Text style={styles.txtLabel}>Localização Padrão</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={localPad => this.props.modificaLocalPad(localPad)}
                            value={this.props.localPad}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 5 }]}>
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
                    <View style={[styles.viewCampo, { flex: 2 }]}>
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
                    <View style={[styles.viewCampo, { flex: 3 }]}>
                        <Text style={styles.txtLabel}>Batismo</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            editable={this.state.batismoDisable}
                            returnKeyType="go"
                            style={styles.input}
                            onChangeText={batismo => this.props.modificaBatismo(batismo)}
                            value={this.props.batismo}
                            ref={(input) => { this.batismo = input; }}
                            onSubmitEditing={() => { this.onPressEfetivar(); }}
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
                            editable={false}
                            multiline
                            numberOfLines={3}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.inputDescricao}
                            onChangeText={desItem => this.props.modificaDesItem(desItem)}
                            value={this.props.desItem}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewBotao, { flex: 2 }]}>
                        <Button
                            onPress={() => { this.validQtdItem(); }}
                            title="Efetivar"
                            color="green"
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={[styles.txtLabel, { textAlign: 'left' }]}>Qtde Etiq</Text>
                        <View style={styles.viewBtEtiq}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                editable={this.state.qtdDisable}
                                returnKeyType="go"
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
                <View style={{ padding: 5 }} >
                    <ListaItem />
                </View>
                <InfoItemConferencia />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return (
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
            listaItemLote: state.ConfereReducer.listaItemLote
        }
    );
};

export default connect(mapStateToProps, { 
    modificaBatismo,
    modificaCodEAN,
    modificaCodItem,
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
    modificaInfoVisible
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
    input: {
        height: 35,
        fontSize: 16,
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
    }
});

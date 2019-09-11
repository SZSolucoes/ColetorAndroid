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
    Button,
    Platform,
    Keyboard,
    ActivityIndicator
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';

import { 
    modificaCodCorte,
    modificaEquipamento,
    modificaCodEAN,
    modificaLocalizacao,
    modificaQtdItem,
    modificaObrigatorio,
    modificaCodItem,
    modificaDescItem,
    modificaUn,
    modificaLote,
    modificaListaItem,
    modificaCorteSelec,
    modificaItemCorteSelec,
    iniciaTela,
    modificaClean,
    efetivaCorteCabos,
    imprimeEtiquetaCorte,
    fetchListCortes
} from '../../../actions/CorteCabosActions';

import ListaItem from './ListaItemCorte';

import LoadingSpin from '../../utils/LoadingSpin';

const imgZoom = require('../../../../resources/imgs/zoom_nf.png');
const imgPrinter = require('../../../../resources/imgs/impressao_etiq.png');
const imgClear = require('../../../../resources/imgs/limpa_tela.png');

class FormCorteCabos extends Component {
    constructor() {
        super();
     
        this.fieldsChanged = {
            cdCorte: false,
            eqpto: false,
            qtitem: false,
            ean: false
        };
    }
    componentDidMount() {
        this.setState({ ...this.state });
        this.props.iniciaTela();
    }    
    onPressCortar() {
        const { 
            usuario,
            codCorte,
            equipamento,
            codEAN,
            qtdItem,
            corteSelec
        } = this.props;

        const corte = {
            codCorte,
            equipamento,
            codEAN,
            qtdItem
        };

        let itemCorte = this.props.itemSelec;

        Keyboard.dismiss();

        if (codCorte) {
            if (codCorte.length === 0) {
                Alert.alert(
                    'Corte Cabos',
                    'Corte Cabo deve ser informada!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Corte Cabos',
                'Corte Cabo deve ser informada!'
            );
            return;
        }

        if (codEAN) {
            if (codEAN.length === 0) {
                Alert.alert(
                    'Corte Cabos',
                    'EAN deve ser informado!'
                );
                return;
            } 
            
            const itensCorte = _.values(corteSelec.itens);
   
            const itCorte = [_.find(itensCorte, (itemCheck) => (
                itemCheck.ean1 === codEAN ||
                itemCheck.ean2 === codEAN ||
                itemCheck.ean3 === codEAN ||
                itemCheck.ean4 === codEAN ||
                itemCheck.ean5 === codEAN
            ))];

            if (itCorte[0]) {
                if (itCorte.length === 0) {
                    Alert.alert(
                        'Corte Cabos',
                        'EAN Não Localizado!'
                    );
                    return;
                }
            } else {
                Alert.alert(
                    'Corte Cabos',
                    'EAN Não Localizado!'
                );
                return;
            }
            
            itemCorte = itCorte[0];
        } else {
            Alert.alert(
                'Corte Cabos',
                'EAN deve ser informado!'
            );
            return;
        }

        if (qtdItem) {
            if (qtdItem.length === 0 || _.toInteger(qtdItem) < 0) {
                Alert.alert(
                    'Corte Cabos',
                    'Quantidade Item deve ser maior que 0!'
                );
                return;  
            }
        } else {
            Alert.alert(
                'Corte Cabos',
                'Quantidade Item deve ser maior que 0!'
            );
            return; 
        }

        this.props.efetivaCorteCabos(usuario, corteSelec, itemCorte, corte);
    }
    onPressPrint() {
        const { codCorte, usuario } = this.props;

        if (codCorte) {
            if (codCorte.length === 0) {
                Alert.alert(
                    'Impressão Etiqueta',
                    'Corte Cabo deve ser informado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Impressão Etiqueta',
                'Corte Cabo deve ser informado!'
            );
            return;
        }
        this.props.imprimeEtiquetaCorte(usuario, codCorte);
    }
    procuraCorteCabo() {
        //Actions.listaCortes();
        this.props.modificaClean();
        this.props.fetchListCortes(this.props.usuario);
    }
    validQtdItem() {
        const item = this.props.itemSelec;
        const { qtdItem } = this.props;

        Keyboard.dismiss();

        if (qtdItem) {
            if (qtdItem.length === 0 || _.toInteger(qtdItem) < 0) {
                Alert.alert(
                    'Corte Cabos',
                    'Quantidade Item deve ser maior que 0!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Corte Cabos',
                'Quantidade Item deve ser maior que 0!'
            );
            return;
        }

        if (item.qtdItem !== _.toInteger(qtdItem)) {
            Alert.alert(
                'Corte Cabos',
                'Quantidade Item Divergente! Deseja continuar?',
                [
                    { 
                        text: 'Não', 
                        onPress: () => false, 
                        style: 'cancel' 
                    },
                    { 
                        text: 'Sim', 
                        onPress: () => this.onPressCortar() 
                    },
                ],
                { cancelable: false }
            );
        } else {
            this.onPressCortar();
        }
    }
    carregaCorte() {
        const codCorte = this.props.codCorte;
        const listaCortes = _.values(this.props.listaCortes);

        const corte = _.filter(listaCortes, { codCorte });

        Keyboard.dismiss();
        
        if (corte !== '') {
            if (corte.length === 0) {
                Alert.alert(
                    'Corte Cabos',
                    'Corte de Cabo não Localizado!'
                );
                return;
            }

            const item = corte[0].itens[0];

            const { codItem, descItem, un, lote, obrigatorio, localizacao } = item;

            this.props.modificaCodItem(codItem);
            this.props.modificaDescItem(descItem);
            this.props.modificaUn(un);
            this.props.modificaLote(lote);
            this.props.modificaObrigatorio(obrigatorio);
            this.props.modificaLocalizacao(localizacao);
            this.props.modificaListaItem(corte[0].itens);
            this.props.modificaCorteSelec(corte[0]);

            this.eqpto.focus();
        }
    }
    validEAN() {
        const { corteSelec, codEAN } = this.props;
        const itensCorte = _.values(corteSelec.itens);

        const itemCorte = [_.find(itensCorte, (itemCheck) => (
                itemCheck.ean1 === codEAN ||
                itemCheck.ean2 === codEAN ||
                itemCheck.ean3 === codEAN ||
                itemCheck.ean4 === codEAN ||
                itemCheck.ean5 === codEAN
        ))];

        Keyboard.dismiss();
        
        if (itemCorte[0]) {
            if (itemCorte.length === 0) {
                Alert.alert(
                    'Corte Cabos',
                    'EAN Não Localizado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Corte Cabos',
                'EAN Não Localizado!'
            );
            return;
        }

        this.props.modificaCodItem(itemCorte[0].codItem);
        this.props.modificaDescItem(itemCorte[0].descItem);
        this.props.modificaUn(itemCorte[0].un);
        this.props.modificaLote(itemCorte[0].lote);
        this.props.modificaObrigatorio(itemCorte[0].obrigatorio);
        this.props.modificaLocalizacao(itemCorte[0].localizacao);
        this.props.modificaItemCorteSelec(itemCorte[0]);

        this.qtItem.focus();      
    }
    validQtd() {
        const { qtdItem } = this.props;

        if (qtdItem) {
            if (qtdItem.length === 0 || _.toInteger(qtdItem) < 0) {
                Alert.alert(
                    'Corte Cabos',
                    'Quantidade Item deve ser maior que 0!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Corte Cabos',
                'Quantidade Item deve ser informada!'
            );
            return;
        }

        //this.codCorte.focus();
    }    
    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                { Platform.OS !== 'windows' && <LoadingSpin /> }
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 2 }]}>
                        <Text style={styles.txtLabel}>Corte Cabo</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.codCorte}
                            ref={(input) => { this.codCorte = input; }}
                            onChangeText={codCorte => {
                                this.fieldsChanged.cdCorte = true; 
                                this.props.modificaCodCorte(codCorte); 
                            }}
                            onBlur={() => { 
                                if (this.props.codCorte && this.fieldsChanged.cdCorte) {
                                    this.fieldsChanged.cdCorte = false;
                                    this.carregaCorte();
                                } 
                            }}
                        />
                    </View>
                    <View style={styles.viewBtSearch}>
                        <TouchableOpacity
                            style={styles.btSearch}
                            onPress={() => { this.procuraCorteCabo(); }}
                        >
                            { this.props.loadingCortes ?
                                (   
                                    <View style={[styles.menu, { justifyContent: 'center' }]}>
                                        <View style={{ marginVertical: 6 }}>
                                            <ActivityIndicator size={'large'} />
                                        </View>
                                    </View>
                                ) : (
                                    <Image
                                        source={imgZoom}
                                        style={styles.imgSearch}
                                    /> 
                                    )
                            }
                            
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.viewCampo, { flex: 3 }]}>
                        <Text style={styles.txtLabel}>Equipamento</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={equipto => this.props.modificaEquipamento(equipto)}
                            value={this.props.equipamento}
                            ref={(input) => { this.eqpto = input; }}
                            onSubmitEditing={() => { this.codEAN.focus(); }}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 3 }]}>
                        <Text style={[styles.txtLabel, { marginLeft: -30 }]}>EAN</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                selectTextOnFocus
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="go"
                                style={[styles.input, { flex: 6 }]}
                                value={this.props.codEAN}
                                ref={(input) => { this.codEAN = input; }}
                                onChangeText={codEAN => {
                                    this.fieldsChanged.ean = true; 
                                    this.props.modificaCodEAN(codEAN); 
                                }}
                                onBlur={() => { 
                                    if (this.props.codEAN && this.fieldsChanged.ean) {
                                        this.fieldsChanged.ean = false;
                                        this.validEAN();
                                    } else {
                                        this.qtItem.focus();
                                    }
                                }}
                            />
                            <TouchableOpacity
                                style={styles.btClear}
                                onPress={() => { this.props.modificaCodEAN(); }}
                            >
                                <Image
                                    source={imgClear}
                                    style={styles.imgClear}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.viewCampo, { flex: 2 }]}>
                        <Text style={styles.txtLabel}>Localização</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={[styles.input, { fontSize: 10 }]}
                            onChangeText={local => this.props.modificaLocalizacao(local)}
                            value={this.props.localizacao}
                        />
                    </View>                                        
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Qtde</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.qtdItem}
                            ref={(input) => { this.qtItem = input; }}
                            onChangeText={qtItem => {
                                this.fieldsChanged.qtitem = true; 
                                this.props.modificaQtdItem(qtItem); 
                            }}
                            onBlur={() => { 
                                if (this.props.qtdItem && this.fieldsChanged.qtitem) {
                                    this.fieldsChanged.qtitem = false;
                                    this.validQtd();
                                } 
                            }}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Lance Obrigatório</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={obrigatorio => this.props.modificaObrigatorio(obrigatorio)}
                            value={`${this.props.obrigatorio}`}
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
                            onChangeText={un => this.props.modificaUn(un)}
                            value={this.props.un}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 3 }]}>
                        <Text style={styles.txtLabel}>Lote</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={[styles.input, { fontSize: 10 }]}
                            onChangeText={lote => this.props.modificaLote(lote)}
                            value={this.props.lote}
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
                            onChangeText={descItem => this.props.modificaDescItem(descItem)}
                            value={this.props.descItem}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewBotao, { flex: 2 }]}>
                        <Button
                            onPress={() => { this.validQtdItem(); }}
                            title="Cortar"
                            color="green"
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={[styles.txtLabel, { textAlign: 'left' }]} />
                        <View style={styles.viewBtEtiq}>
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
            </ScrollView>
        );
    }
}

const mapStateToProps = state => (
        {
            codCorte: state.CorteCabosReducer.codCorte,
            listaCortes: state.CorteCabosReducer.listaCortes,
            usuario: state.LoginReducer.usuario,
            codItem: state.CorteCabosReducer.codItem,
            descItem: state.CorteCabosReducer.descItem,
            equipamento: state.CorteCabosReducer.equipamento,
            codEAN: state.CorteCabosReducer.codEAN,
            localizacao: state.CorteCabosReducer.localizacao,
            qtdItem: state.CorteCabosReducer.qtdItem,
            obrigatorio: state.CorteCabosReducer.obrigatorio,
            un: state.CorteCabosReducer.un,
            lote: state.CorteCabosReducer.lote,
            listaItem: state.CorteCabosReducer.listaItem,
            corteSelec: state.CorteCabosReducer.corteSelec,
            itemSelec: state.CorteCabosReducer.itemSelec,
            embarque: state.CorteCabosReducer.embarque,
            nomeAbrev: state.CorteCabosReducer.nomeAbrev,
            pedido: state.CorteCabosReducer.pedido,
            loadingCortes: state.CorteCabosReducer.loadingCortes
        }
    );

export default connect(mapStateToProps, { 
    modificaCodCorte,
    modificaEquipamento,
    modificaCodEAN,
    modificaLocalizacao,
    modificaQtdItem,
    modificaObrigatorio,
    modificaCodItem,
    modificaDescItem,
    modificaUn,
    modificaLote,
    modificaListaItem,
    modificaCorteSelec,
    modificaItemCorteSelec,
    iniciaTela,
    modificaClean,
    efetivaCorteCabos,
    imprimeEtiquetaCorte,
    fetchListCortes
})(FormCorteCabos);

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

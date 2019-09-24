/* eslint-disable max-len */
import React from 'react';
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
    Keyboard,
    Platform
} from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import GridInventItens from './GridInventItens';
import FormRow from '../utils/FormRow';
import LoadingSpin from '../utils/LoadingSpin';

import {
    modificaCodItem,
    modificaUnidMed,
    modificaDescItem,
    modificaItemSelected,
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
    getInventoryLocal,
    buscaContInventario
} from '../../actions/InventarioActions';
import { defaultFormStyles } from '../utils/Forms';

import imgClear from '../../../resources/imgs/limpa_tela.png';

class FormInventario extends React.PureComponent {
    constructor(props) {
        super(props);

        this.fieldsChanged = {
            codLocal: false,
            codEAN: false,
            qtItem: false
        };
    }

    componentDidMount = () => {
        setTimeout(Actions.refresh, 500, { right: this.renderRightButton });
    }
    
    componentWillUnmount = () => {
        this.props.cleanInventarioReducer();
    }

    onChangeQtdText = (value) => {
        const txtParsed = value.replace(/[^0-9]/g, '');
        this.props.modificaQtItem(txtParsed);
    }

    onBlurLocalizacao = () => {
        if (this.props.codLocal && 
            this.fieldsChanged.codLocal) {
                this.fieldsChanged.codLocal = false;
                this.props.getInventoryLocal(this.props.codLocal);
        } else if (this.fieldsChanged.codLocal && !this.props.codLocal) {
            this.props.cleanInventarioReducerWDT();
            this.props.buscaContInventario(this.props.username, false);
        }
    }

    onBlurEanCod = () => {
        if (this.props.codEAN && 
            this.fieldsChanged.codEAN) {
                this.fieldsChanged.codEAN = false;
                this.onBLurEAN();
        } else if (this.fieldsChanged.codEAN && !this.props.codEAN) {
            this.props.modificaCodItem('');
            this.props.modificaUnidMed('');
            this.props.modificaCodLote('');
            this.props.modificaDescItem('');
            this.props.modificaNrContagem('');
            this.props.modificaItemSelected(-1);
        }
    }

    onBlurLoteCod = () => {
        this.onBlurLote();
    }
    
    onBLurEAN = () => {
        const { codEAN, listItems } = this.props;

        Keyboard.dismiss();

        if (!(typeof codEAN === 'string' && codEAN.trim())) {
            Alert.alert(
                'Erro EAN',
                'Código EAN deve ser informado!'
            );
            return;
        }

        if (this.props.listItems.length > 0) {
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
                    lote,
                    itDesc,
                    contagem
                } = itensEAN[indexItemEAN];
        
                this.props.modificaCodItem(itCode);
                this.props.modificaUnidMed(un);
                this.props.modificaCodLote(lote);
                this.props.modificaDescItem(itDesc);
                this.props.modificaNrContagem(contagem);
                this.props.modificaItemSelected(indexItemEAN);
    
                //this.focusInField('codlocal'); 
                this.codLote.focus();
            } else {
                this.focusInField('codean', false, true);                 
                Alert.alert(
                    'Inventário',
                    'EAN Não Localizado!'
                );
                //return;
            }
        }
    }

    onBlurLote = () => {
        const { codEAN, codLote, tpCont } = this.props;

        Keyboard.dismiss();

        if (!(typeof codEAN === 'string' && codEAN.trim())) {
            Alert.alert(
                'Erro EAN',
                'Código EAN deve ser informado!'
            );
            return;
        }

        if (tpCont === '3') {
            if (!codLote) {
                Alert.alert(
                    'Inventário',
                    'Lote deve ser informado!'
                );
                return;
            }
        }

        this.focusInField('qtitem');
    }

    onChangeQtde = (value) => {
        this.fieldsChanged.qtItem = true; 
        this.onChangeQtdText(value);
    }
    onChangeLocalizacao = (value) => {
        this.fieldsChanged.codLocal = true; 
        this.props.modificaCodLocal(value); 
    }
    onChangeEan = (value) => {
        this.fieldsChanged.codEAN = true; 
        this.props.modificaCodEAN(value);
    }
    onChangeLote = (value) => {
        this.props.modificaCodLote(value);
    }

    onPressCleanBtn = () => {
        this.props.cleanInventarioReducerWDT();
        this.props.buscaContInventario(this.props.username, false);
    }

    onSubmitEditingLocalizacao = () => {
        this.codEAN.focus();
    }

    confirmButton = () => {
        const {
            codLocal,
            codEAN,
            qtItem,
            listItems,
            itemSelected,
            username,
            tpCont,
            codLote
        } = this.props;

        Keyboard.dismiss();

        const validEAN = typeof codLocal === 'string' && codEAN.trim();
        const validQtItem = typeof codLocal === 'string' && qtItem.trim();

        if (!validEAN && qtItem.trim() !== '0') {
            Alert.alert(
                'Inventário',
                'EAN deve ser informado!'
            );
            
            return;
        }

        if (!validQtItem) {
            Alert.alert(
                'Inventário',
                'Quantidade deve ser informada!'
            );

            return;
        }

        if (itemSelected < 0) {
            Alert.alert(
                'Inventário',
                'Item deve ser selecionado!'
            );

            return;
        }

        if (tpCont === '3') {
            if (!codLote) {
                Alert.alert(
                    'Inventário',
                    'Lote deve ser informado!'
                );
                return;
            }
        }

        const itemS = listItems[itemSelected];

        const propparams = {
            username,
            usuario: username,
            data: itemS.data,
            estabel: itemS.estab,
            depos: itemS.depos,
            local: itemS.localiz,
            lote: itemS.lote,
            refer: itemS.refer,
            itCode: itemS.itCode,
            contagem: itemS.contagem,
            qtItem
        };

        if (this.props.estorno) {
            this.props.doConfirmEst(propparams);
        } else {
            if (_.toInteger(qtItem) < 0) {
                Alert.alert(
                    'Conferência',
                    'Quantidade Item deve ser maior ou igual 0!'
                );
                return;  
            }

            const newList = [...listItems];
            newList.splice(itemSelected, 1);

            this.props.doConfirm(propparams, newList);
        }
    }

    focusInField = (field, cleanField = false, cleanItem = false) => {
        switch (field) {
            case 'codlocal':
                this.codLocal.focus();
                this.fieldsChanged.codLocal = true;
                if (cleanField) {
                    this.props.modificaCodLocal('');
                }
                break;
            case 'codean':
                this.codEAN.focus();
                this.fieldsChanged.codEAN = true;
                if (cleanField) {
                    this.props.modificaCodEAN('');
                }
                break;
            case 'qtitem':
                this.qtItem.focus();
                this.fieldsChanged.qtItem = true;
                if (cleanField) {
                    this.props.modificaQtItem('');
                }
                break;
            default:  
        }

        if (cleanItem) {
            this.props.modificaCodItem('');
            this.props.modificaUnidMed('');
            this.props.modificaCodLote('');
            this.props.modificaDescItem('');
            this.props.modificaNrContagem('');
            this.props.modificaItemSelected(-1);
        }
    }

    renderRightButton = () => (
        <TouchableOpacity 
            onPress={this.onPressCleanBtn}
            style={styles.btClear}
        >
            <Image
                source={imgClear}
                style={styles.imgClear}
            />
        </TouchableOpacity>
    )

    renderQtde = () => {
        if (!this.props.estorno) {
            return (
                <View style={{ flex: 1 }}>
                    <Text style={styles.txtLabel}>Qtde</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            ref={(input) => { this.qtItem = input; }}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            keyboardType="numeric"
                            style={defaultFormStyles.input}
                            value={this.props.qtItem}
                            onChangeText={this.onChangeQtde}
                        />
                    </View>
                </View>
            );       
        }

        return (<View />);
    }

    render = () => (
        <ScrollView style={styles.viewPrinc}>
            { Platform.OS !== 'windows' && <LoadingSpin /> }
            <FormRow>
                <View style={{ flex: 1 }}>
                    <Text style={styles.txtLabel}>Localização</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            ref={(input) => { this.codLocal = input; }}
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            value={this.props.codLocal}
                            onSubmitEditing={this.onSubmitEditingLocalizacao}
                            onChangeText={this.onChangeLocalizacao}
                            onBlur={this.onBlurLocalizacao}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.txtLabel}>EAN</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            ref={(input) => { this.codEAN = input; }}
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            keyboardType="numeric"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={defaultFormStyles.input}
                            value={this.props.codEAN}
                            onChangeText={this.onChangeEan}
                            onBlur={this.onBlurEanCod}
                        />
                    </View>
                </View>
            </FormRow>
            <FormRow>
                <View pointerEvents="none" style={{ flex: 4 }}>
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
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                </View>
                <View pointerEvents="none" style={{ flex: 1.4 }}>
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
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                </View>
                <View style={{ flex: 3.7 }}>
                    <Text style={styles.txtLabel}>Lote</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            ref={(input) => { this.codLote = input; }}
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            value={this.props.codLote}
                            onChangeText={this.onChangeLote}
                            onBlur={this.onBlurLoteCod}
                        />
                    </View>
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
                        style={defaultFormStyles.inputDescricao}
                        value={this.props.descItem}
                        underlineColorAndroid={'transparent'}
                    />
                </View>                    
            </FormRow>
            <FormRow>
                <View pointerEvents="none" style={{ flex: 1 }}>
                    <Text style={styles.txtLabel}>Contagem</Text>
                    <View style={[defaultFormStyles.inputView, { flex: 1 }]}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            value={this.props.nrContagem}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                </View>
                <View style={{ flex: 1.5 }}>
                    {this.renderQtde()}
                </View>
            </FormRow>
            <FormRow>
                <View style={styles.viewBotao}>
                    <Button
                        onPress={this.confirmButton}
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
    )
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
        modalVisible: state.InventarioReducer.modalVisible,
        listItems: state.InventarioReducer.listItems,
        itemSelected: state.InventarioReducer.itemSelected
    }
);

export default connect(mapStateToProps, {
    modificaCodItem,
    modificaUnidMed,
    modificaDescItem,
    modificaItemSelected,
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
    getInventoryLocal,
    buscaContInventario
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
    viewBotao: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 10
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

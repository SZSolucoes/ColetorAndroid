import React from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Alert,
    TouchableOpacity,
    Image,
    Keyboard
} from 'react-native';

import { connect } from 'react-redux';
import _ from 'lodash';
import ListaItem from './ListaItemArm';
import { 
    modificaBatismo, 
    modificaCodEAN, 
    modificaCodItem,
    modificaDesItem,
    modificaCodLocal,
    modificaLote,
    modificaUnidMed,
    modificaQtArmazenado,
    modificaQtItem,
    modificaQtTotal,
    buscaInfoBastimo,
    iniciaTela,
    efetivaArmazena,
    modificaItemArmazena,
    modificaCodDepos,
    modificaOnEfetivar,
    modificaArmazenaClear
} from '../../../actions/ArmazenaActions';
import { defaultFormStyles } from '../../utils/Forms';

import LoadingSpin from '../../utils/LoadingSpin';

import imgClear from '../../../../resources/imgs/limpa_tela.png';

class FormArmazena extends React.PureComponent {
    constructor(props) {
        super(props);

        this.fieldsChanged = {
            batismo: false,
            ean: false,
            local: false, 
            lote: false
        };
    }
    
    componentDidMount = () => {
        this.props.iniciaTela();
    }

    componentWillUnmount = () => {
        this.props.modificaArmazenaClear();
    }

    onPressEfetivar = () => {
        const { 
            usuario, 
            codEAN,
            batismo,
            qtItem, 
            codLocal, 
            lote,
            etiquetaArmazena,
            itemArmazena,
            listaItem 
        } = this.props;

        Keyboard.dismiss();

        if (qtItem) {       
            if (qtItem.length === 0 || _.toInteger(qtItem) < 1) {
                Alert.alert(
                    'Armazenamento',
                    'Quantidade Item deve ser maior que 0!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Armazenamento',
                'Quantidade Item deve ser maior que 0!'
            );
            return;
        }

        if (codEAN) {
            if (codEAN.length === 0) {
                Alert.alert(
                    'Armazenamento',
                    'EAN deve ser informado!'
                );
                return;
            }

            const itemArm = [_.find(listaItem, (itemCheck) => (
                itemCheck.ean1 === codEAN ||
                itemCheck.ean2 === codEAN ||
                itemCheck.ean3 === codEAN ||
                itemCheck.ean4 === codEAN ||
                itemCheck.ean5 === codEAN
            ))];

            if (itemArm[0]) {
                if (itemArm[0].length === 0) {
                    Alert.alert(
                        'Armazenamento',
                        'EAN Não Localizado!'
                    );
                    return;
                }
                if (itemArm[0].qtdItem !== qtItem) {
                    Alert.alert(
                        'Armazenamento',
                        'Quantidade Item Diferente da Conferida!'
                    );
                    return;
                }
            } else {
                Alert.alert(
                    'Armazenamento',
                    'EAN Não Localizado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Armazenamento',
                'EAN deve ser informado!'
            );
            return;
        }
        
        if (codLocal) {
            if (codLocal.length === 0) {
                Alert.alert(
                    'Armazenamento',
                    'Local deve ser informado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Armazenamento',
                'Local deve ser informado!'
            );
            return;
        }
        if (batismo) {
            if (batismo.length === 0) {
                Alert.alert(
                    'Armazenamento',
                    'Batismo deve ser informado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Armazenamento',
                'Batismo deve ser informado!'
            );
            return;
        }
        if (itemArmazena.tpCont === '3') {
            if (lote.length === 0) {
                Alert.alert(
                    'Armazenamento',
                    'Lote deve ser informado!'
                );
                return;
            }
        }
        const armazenamento = {
            usuario, 
            codEAN,
            batismo,
            qtItem, 
            codLocal, 
            lote
        };

        this.props.modificaOnEfetivar(true);
        this.props.efetivaArmazena(etiquetaArmazena, itemArmazena, armazenamento);
    }

    onChangeBatismo = (value) => {
        this.fieldsChanged.batismo = true; 
        this.props.modificaBatismo(value); 
    }
    onChangeEan = (value) => {
        this.fieldsChanged.ean = true; 
        this.props.modificaCodEAN(value); 
    }
    onChangeLocalizacao = (value) => {
        this.fieldsChanged.local = true; 
        this.props.modificaCodLocal(value); 
    }
    
    onBlurBatismo = () => {
        if (this.props.batismo && this.fieldsChanged.batismo) {
            this.fieldsChanged.batismo = false;
            this.validBatismo();
        } 
    }
    onBlurEan = () => {
        if (this.props.codEAN && this.fieldsChanged.ean) {
            this.fieldsChanged.ean = false;
            this.validEAN();
        } 
    }
    onBlurLocalizacao = () => {
        if (this.props.codLocal && this.fieldsChanged.local) {
            this.fieldsChanged.local = false;
            this.validLocal();
        } 
    }
    onBlur = () => {
        if (this.props.lote && this.fieldsChanged.lote) {
            this.fieldsChanged.lote = false;
            this.onPressEfetivar();
        } 
    }

    onChangeDeposito = (value) => {
        this.props.modificaCodDepos(value);
    }
    onChangeQuantidade = (value) => {
        this.props.modificaQtItem(value);
    }
    onChangeLote = (value) => {
        this.fieldsChanged.lote = true; 
        this.props.modificaLote(value); 
    }

    onPressBtnClearBatismo = () => {
        this.props.modificaBatismo();
    }
    onPressBtnCleanEan = () => {
        this.props.modificaCodEAN();
    }
    onPressBtnCleanLocalizacao = () => {
        this.props.modificaCodLocal();
    }

    onSubmitEditingQuantidade = () => {
        this.txtLote.focus();
    }

    validEAN = () => {
        const { listaItem, codEAN } = this.props;

        const itemArm = [_.find(listaItem, (itemCheck) => (
            itemCheck.ean1 === codEAN ||
            itemCheck.ean2 === codEAN ||
            itemCheck.ean3 === codEAN ||
            itemCheck.ean4 === codEAN ||
            itemCheck.ean5 === codEAN
        ))];

        Keyboard.dismiss();

        if (itemArm[0]) {
            if (itemArm[0].length === 0) {
                Alert.alert(
                    'Armazenamento',
                    'EAN Não Localizado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Armazenamento',
                'EAN Não Localizado!'
            );
            return;
        }

        const { itCode, itDescAbrev, un, localiz, codDepos } = itemArm[0];

        this.props.modificaCodItem(itCode);
        this.props.modificaDesItem(itDescAbrev);
        this.props.modificaUnidMed(un);
        this.props.modificaCodLocal(localiz);
        this.props.modificaCodDepos(codDepos);
        this.props.modificaItemArmazena(itemArm);

        this.txtLocal.focus();
    }
    validLocal = () => {
        this.txtQuantidade.focus();
    }
    validBatismo = () => {
        const { batismo } = this.props;

        Keyboard.dismiss();

        if (batismo) {
            if (batismo.length === 0) {
                Alert.alert(
                    'Armazenamento',
                    'Etiqueta Batismo deve ser informada!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Armazenamento',
                'Etiqueta Batismo deve ser informada!'
            );
            return;
        }

        this.props.buscaInfoBastimo(batismo);
        this.txtEAN.focus();
    }

    renderBtEfetivar = () => (
        <View style={[styles.viewBotao, { flex: 1 }]}>
            <Button
                onPress={this.onPressEfetivar}
                title="Efetivar"
                color="green"
            />
        </View>
    )

    render = () => (
        <ScrollView style={styles.viewPrinc}>
            <LoadingSpin />
            <View style={styles.viewLinha}>
                <View style={[styles.viewCampo, { flex: 4 }]}>
                    <Text style={[styles.txtLabel, { marginLeft: -30 }]}>Batismo</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[defaultFormStyles.inputView, { flex: 1 }]}>
                            <TextInput
                                selectTextOnFocus
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="go"
                                style={defaultFormStyles.input}
                                value={this.props.batismo}
                                ref={(input) => { this.txtBatismo = input; }}
                                onChangeText={this.onChangeBatismo}
                                onBlur={this.onBlurBatismo}
                            />
                        </View>
                        <TouchableOpacity 
                            onPress={this.onPressBtnClearBatismo}
                            style={styles.btClear}
                        >
                            <Image
                                source={imgClear}
                                style={styles.imgClear}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
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
                <View style={[styles.viewCampo, { alignItems: 'center' }]}>
                    <Text style={[styles.txtLabel]}>Armazenado</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={[defaultFormStyles.input, { width: 60 }]}
                            value={this.props.qtArmazenado}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.viewLinha}>
                <View style={[styles.viewCampo, { flex: 1 }]}>
                    <Text style={[styles.txtLabel, { marginLeft: -30 }]}>EAN</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[defaultFormStyles.inputView, { flex: 1 }]}>
                            <TextInput
                                selectTextOnFocus
                                placeholder=""
                                keyboardType="numeric"
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="go"
                                style={defaultFormStyles.input}
                                value={this.props.codEAN}
                                ref={(input) => { this.txtEAN = input; }}
                                onChangeText={this.onChangeEan}
                                onBlur={this.onBlurEan}
                            />
                        </View>
                        <TouchableOpacity 
                            onPress={this.onPressBtnCleanEan}
                            style={styles.btClear}
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
                <View style={[styles.viewCampo, { flex: 4 }]}>
                    <Text style={styles.txtLabel}>Item</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            keyboardType="numeric"
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
                        editable={false}
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType="next"
                        multiline
                        numberOfLines={3}
                        style={defaultFormStyles.inputDescricao}
                        value={this.props.desItem}
                    />
                </View>
            </View>
            <View style={styles.viewLinha}>
                <View style={[styles.viewCampo, { flex: 3 }]}>
                    <Text style={[styles.txtLabel, { marginLeft: -30 }]}>Localização</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[defaultFormStyles.inputView, { flex: 1 }]}>
                            <TextInput
                                selectTextOnFocus
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={defaultFormStyles.input}
                                value={this.props.codLocal}
                                ref={(input) => { this.txtLocal = input; }}
                                onChangeText={this.onChangeLocalizacao}
                                onBlur={this.onBlurLocalizacao}
                            />
                        </View>
                        <TouchableOpacity 
                            onPress={this.onPressBtnCleanLocalizacao}
                            style={styles.btClear}
                        >
                            <Image
                                source={imgClear}
                                style={styles.imgClear}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.viewCampo, { flex: 1 }]}>
                    <Text 
                        style={[
                            styles.txtLabel
                        ]} 
                    >
                        Deposito
                    </Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={[defaultFormStyles.input]}
                            onChangeText={this.onChangeDeposito}
                            value={this.props.codDepos}
                            ref={(input) => { this.txtDepos = input; }}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.viewLinha}>
                <View style={[styles.viewCampo, { flex: 1 }]}>
                    <Text style={styles.txtLabel}>Quantidade</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            keyboardType="numeric"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            onChangeText={this.onChangeQuantidade}
                            value={this.props.qtItem}
                            ref={(input) => { this.txtQuantidade = input; }}
                            onSubmitEditing={this.onSubmitEditingQuantidade}
                        />
                    </View>
                </View>
                <View style={[styles.viewCampo, { flex: 2 }]}>
                    <Text style={styles.txtLabel}>Lote</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={defaultFormStyles.input}
                            value={this.props.lote}
                            ref={(input) => { this.txtLote = input; }}
                            onChangeText={this.onChangeLote}
                            onBlur={this.onBlurLote}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.viewLinha}>
                {this.renderBtEfetivar()}
            </View>
            <View style={{ padding: 5 }} >
                <ListaItem />
            </View>
        </ScrollView>
    )
}

const mapStateToProps = state => (
    {
        batismo: state.ArmazenaReducer.batismo,
        qtTotal: state.ArmazenaReducer.qtTotal,
        qtArmazenado: state.ArmazenaReducer.qtArmazenado,
        codEAN: state.ArmazenaReducer.codEAN,
        codItem: state.ArmazenaReducer.codItem,
        desItem: state.ArmazenaReducer.desItem,
        unidMed: state.ArmazenaReducer.unidMed,
        codLocal: state.ArmazenaReducer.codLocal,
        codDepos: state.ArmazenaReducer.codDepos,
        qtItem: state.ArmazenaReducer.qtItem,
        lote: state.ArmazenaReducer.lote,
        usuario: state.LoginReducer.usuario,
        listaItem: state.ArmazenaReducer.listaItem,
        itemArmazena: state.ArmazenaReducer.itemArmazena,
        etiquetaArmazena: state.ArmazenaReducer.etiquetaArmazena,
        onArmazena: state.ArmazenaReducer.onArmazena
    }
);

export default connect(mapStateToProps, { 
    modificaBatismo, 
    modificaCodEAN, 
    modificaCodItem,
    modificaDesItem,
    modificaCodLocal,
    modificaLote,
    modificaQtArmazenado,
    modificaQtItem,
    modificaQtTotal,
    modificaUnidMed,
    buscaInfoBastimo,
    iniciaTela,
    efetivaArmazena,
    modificaItemArmazena,
    modificaCodDepos,
    modificaOnEfetivar,
    modificaArmazenaClear
})(FormArmazena);

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
        fontSize: 13
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
    btClear: {
        width: 30,
        height: 35
    },
    imgClear: {
        width: 30,
        height: 35
    }
});

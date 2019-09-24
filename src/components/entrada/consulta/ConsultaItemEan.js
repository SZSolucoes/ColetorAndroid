/* eslint-disable max-len */
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
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

import FormRow from '../../utils/FormRow';
import { 
    modificaItCode,
    doFetchEan,
    modificaClean,
    modificaEan1,
    modificaEan2, 
    modificaEan3, 
    modificaEan4, 
    modificaEan5
} from '../../../actions/ConsultaItemEanActions';
import { 
    modificaCodEan,
    modificaCodItem,
} from '../../../actions/RelEanActions';

import { 
    imprimeEtiquetaEAN
} from '../../../actions/ImpressaoActions';
import { defaultFormStyles } from '../../utils/Forms';

import LoadingSpin from '../../utils/LoadingSpin';
import imgClear from '../../../../resources/imgs/limpa_tela.png';
import imgPrinter from '../../../../resources/imgs/impressao_etiq.png';

class ConsultaItemEan extends React.PureComponent {
    constructor(props) {
        super(props);

        this.fieldsChanged = {
            itCode: false
        };

        this.state = {
            qtdEtiqEan1: '',
            qtdEtiqEan2: '',
            qtdEtiqEan3: '',
            qtdEtiqEan4: '',
            qtdEtiqEan5: ''
        };
    }

    componentDidMount = () => {
        setTimeout(Actions.refresh, 500, { right: this.renderClearButton });
    }

    componentWillUnmount = () => {
        this.props.modificaClean();
        this.props.modificaCodEan('');
        this.props.modificaCodItem('');
    }

    onBlurItem = () => {
        if (this.props.itCode && 
            this.fieldsChanged.itCode) {
            this.fieldsChanged.itCode = false;
            this.doFetchEan();
        }
    }

    onChangeModificaQtdEtiq = (label, value) => () => this.modificaQtdEtiq(label, value);

    onChangeModificaEan = (label, value) => () => this.modificaEan(label, value);

    onChangeItem = (value) => {
        this.fieldsChanged.itCode = true; 
        this.props.modificaItCode(value); 
    }

    onPressPrint = (codEAN, qtdEtiq) => () => {
        const { usuario } = this.props;

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
        if (qtdEtiq) {
            if (qtdEtiq.length === 0 || _.toInteger(qtdEtiq) < 1) {
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

        Alert.alert(
            'Aviso', 
            'Confirma a impressão ?',
            [
                { text: 'Cancelar', onPress: () => false },
                { 
                    text: 'Sim', 
                    onPress: () => this.props.imprimeEtiquetaEAN(usuario, codEAN, qtdEtiq)
                }
            ],
            { cancelable: true }
        );
    }

    onPressRelacionar = () => {
        const {
            itCode,
            eanFetched,
            ean1,
            ean2,
            ean3,
            ean4,
            ean5
        } = this.props;

        let firstEan = '';

        if (!itCode) {
            Alert.alert('Consulta EAN', 'Campo (Item) deve ser informado.');
            return;
        }

        for (let i = 0; i < eanFetched.length; i++) {
            if (ean1 && eanFetched[i] === 1) {
                firstEan = ean1;
                break;
            }
            if (ean2 && eanFetched[i] === 2) {
                firstEan = ean2;
                break;
            }
            if (ean3 && eanFetched[i] === 3) {
                firstEan = ean3;
                break;
            }
            if (ean4 && eanFetched[i] === 4) {
                firstEan = ean4;
                break;
            }
            if (ean5 && eanFetched[i] === 5) {
                firstEan = ean5;
                break;
            }
        }

        this.props.modificaCodEan(firstEan);
        this.props.modificaCodItem(itCode);

        Actions.relacionaEan();
    }

    onPressCleanBtn = () => {
        this.props.modificaClean();
    }

    doFetchEan = () => {
        this.props.doFetchEan({ itCode: this.props.itCode });
    }

    modificaEan = (label, value) => {
        switch (label) {
            case 'EAN 1':
                this.props.modificaEan1(value);
                break;
            case 'EAN 2':
                this.props.modificaEan2(value);
                break;
            case 'EAN 3':
                this.props.modificaEan3(value);
                break;
            case 'EAN 4':
                this.props.modificaEan4(value);
                break;
            case 'EAN 5':
                this.props.modificaEan5(value);
                break;
            default:
        }
    }

    modificaQtdEtiq = (label, value) => {
        const txtParsed = value.replace(/[^0-9]/g, '');

        switch (label) {
            case 'EAN 1':
                this.setState({ qtdEtiqEan1: txtParsed });
                break;
            case 'EAN 2':
                this.setState({ qtdEtiqEan2: txtParsed });
                break;
            case 'EAN 3':
                this.setState({ qtdEtiqEan3: txtParsed });
                break;
            case 'EAN 4':
                this.setState({ qtdEtiqEan4: txtParsed });
                break;
            case 'EAN 5':
                this.setState({ qtdEtiqEan5: txtParsed });
                break;
            default:
        }
    }

    renderEans = () => {
        const { eanFetched } = this.props;
        const eans = [
            { label: 'EAN 1', value: this.props.ean1, qtdEtiq: this.state.qtdEtiqEan1, fetchedNum: 1 },
            { label: 'EAN 2', value: this.props.ean2, qtdEtiq: this.state.qtdEtiqEan2, fetchedNum: 2 },
            { label: 'EAN 3', value: this.props.ean3, qtdEtiq: this.state.qtdEtiqEan3, fetchedNum: 3 },
            { label: 'EAN 4', value: this.props.ean4, qtdEtiq: this.state.qtdEtiqEan4, fetchedNum: 4 },
            { label: 'EAN 5', value: this.props.ean5, qtdEtiq: this.state.qtdEtiqEan5, fetchedNum: 5 }
        ];

        return eans.map((item, index) => {
            if (!eanFetched.includes(item.fetchedNum)) {
                return (
                    <FormRow key={index}>
                        <View style={{ flex: 1.5 }}>
                            <Text style={styles.txtLabel}>{item.label}</Text>
                            <View style={styles.viewSection}>
                                <Text
                                    selectable
                                    adjustsFontSizeToFit
                                    style={styles.text}  
                                >
                                    {item.value}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                                <View style={{ flex: 1.5, marginRight: 5, overflow: 'visible' }}>
                                    <Text style={styles.txtLabel} numberOfLines={1}>Qtde Etiq</Text>
                                    <View style={defaultFormStyles.inputView}>
                                        <TextInput
                                            placeholder=""
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            keyboardType="numeric"
                                            placeholderTextColor='rgba(255,255,255,0.7)'
                                            returnKeyType="next"
                                            style={defaultFormStyles.input}
                                            onChangeText={this.onChangeModificaQtdEtiq(item.label)}
                                            value={item.qtdEtiq}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', marginLeft: 5 }}>
                                    <Text style={styles.txtLabel} numberOfLines={1} />
                                    <TouchableOpacity
                                        style={styles.btSearch}
                                        onPress={this.onPressPrint(item.value, item.qtdEtiq)}
                                    >
                                        <Image
                                            source={imgPrinter}
                                            style={{ width: 35, height: 35 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </FormRow>
                );
            }
            return (
                <FormRow key={index}>
                    <View>
                        <Text style={styles.txtLabel}>{item.label}</Text>
                        <View style={defaultFormStyles.inputView}>
                            <TextInput
                                selectTextOnFocus
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                style={defaultFormStyles.input}
                                value={item.value}
                                onChangeText={this.onChangeModificaEan(item.label)}
                            />
                        </View>
                    </View>
                </FormRow>
            );
        });
    }

    renderClearButton = () => (
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

    render = () => (
        <ScrollView style={styles.viewPrinc}>
            <LoadingSpin />
            <FormRow>
                <View style={{ flex: 4 }}>
                    <Text style={styles.txtLabel}>Item</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            selectTextOnFocus
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            style={defaultFormStyles.input}
                            value={this.props.itCode}
                            onChangeText={this.onChangeItem}
                            onBlur={this.onBlurItem}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.txtLabel}>UM</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            editable={false}
                            style={defaultFormStyles.input}
                            value={this.props.un}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                </View>
            </FormRow>
            <FormRow>
                <View style={{ flex: 1 }}>
                    <Text style={styles.txtLabel}>Descrição</Text>
                    <TextInput
                        multiline
                        numberOfLines={3}
                        editable={false}
                        style={defaultFormStyles.inputDescricao}
                        value={this.props.itDesc}
                        underlineColorAndroid={'transparent'}
                    />
                </View>                    
            </FormRow>
            { this.renderEans() }
            <FormRow>
                <View style={styles.viewBotao}>
                    <Button
                        onPress={this.onPressRelacionar}
                        title="Relacionar"
                        color="green"
                    />
                </View>
            </FormRow>
            <View style={{ marginBottom: 50 }} />
        </ScrollView>
    )
}

const mapStateToProps = state => ({
    itCode: state.ConsultaItemEanReducer.itCode,
    un: state.ConsultaItemEanReducer.un,
    itDesc: state.ConsultaItemEanReducer.itDesc,
    ean1: state.ConsultaItemEanReducer.ean1,
    ean2: state.ConsultaItemEanReducer.ean2,
    ean3: state.ConsultaItemEanReducer.ean3,
    ean4: state.ConsultaItemEanReducer.ean4,
    ean5: state.ConsultaItemEanReducer.ean5,
    eanFetched: state.ConsultaItemEanReducer.eanFetched,
    usuario: state.LoginReducer.usuario
});

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
    viewSection: {
        height: 40,
        backgroundColor: '#20293F',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'sans-serif-medium',
    },
    viewBotao: {
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 10
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

export default connect(mapStateToProps, {
    modificaItCode,
    doFetchEan,
    modificaClean,
    modificaEan1,
    modificaEan2, 
    modificaEan3, 
    modificaEan4, 
    modificaEan5,
    modificaCodEan,
    modificaCodItem,
    imprimeEtiquetaEAN
})(ConsultaItemEan);

import React, { Component } from 'react';
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

import LoadingSpin from '../../utils/LoadingSpin';
import imgClear from '../../../../resources/imgs/limpa_tela.png';

class ConsultaItemEan extends Component {

    constructor(props) {
        super(props);

        this.renderEans = this.renderEans.bind(this);
        this.doFetchEan = this.doFetchEan.bind(this);
        this.modificaEan = this.modificaEan.bind(this);
        this.onPressRelacionar = this.onPressRelacionar.bind(this);
        this.renderClearButton = this.renderClearButton.bind(this);

        this.fieldsChanged = {
            itCode: false
        };
    }

    componentDidMount() {
        Actions.refresh({ right: this.renderClearButton });
    }

    componentWillUnmount() {
        this.props.modificaClean();
        this.props.modificaCodEan('');
        this.props.modificaCodItem('');
    }

    onPressRelacionar() {
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

    doFetchEan() {
        this.props.doFetchEan({ itCode: this.props.itCode });
    }

    modificaEan(label, value) {
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

    renderEans() {
        const { eanFetched } = this.props;
        const eans = [
            { label: 'EAN 1', value: this.props.ean1, fetchedNum: 1 },
            { label: 'EAN 2', value: this.props.ean2, fetchedNum: 2 },
            { label: 'EAN 3', value: this.props.ean3, fetchedNum: 3 },
            { label: 'EAN 4', value: this.props.ean4, fetchedNum: 4 },
            { label: 'EAN 5', value: this.props.ean5, fetchedNum: 5 }, 
        ];

        return eans.map((item, index) => {
            if (!eanFetched.includes(item.fetchedNum)) {
                return (
                    <FormRow key={index}>
                        <View>
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
                    </FormRow>
                );
            }
            return (
                <FormRow key={index}>
                    <View>
                        <Text style={styles.txtLabel}>{item.label}</Text>
                        <TextInput
                                selectTextOnFocus
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                style={styles.input}
                                value={item.value}
                                onChangeText={(value) => this.modificaEan(item.label, value)}
                        />
                    </View>
                </FormRow>
            );
        });
    }

    renderClearButton() {
        return (
            <TouchableOpacity 
                onPress={() => this.props.modificaClean()}
                style={styles.btClear}
            >
                <Image
                    source={imgClear}
                    style={styles.imgClear}
                />
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <LoadingSpin />
                <FormRow>
                    <View style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Item</Text>
                        <TextInput
                            selectTextOnFocus
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            style={styles.input}
                            value={this.props.itCode}
                            onChangeText={value => {
                                this.fieldsChanged.itCode = true; 
                                this.props.modificaItCode(value); 
                            }}
                            onBlur={() => { 
                                if (this.props.itCode && 
                                    this.fieldsChanged.itCode) {
                                    this.fieldsChanged.itCode = false;
                                    this.doFetchEan();
                                } 
                            }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>UM</Text>
                        <TextInput
                            editable={false}
                            style={styles.input}
                            value={this.props.un}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Descrição</Text>
                        <TextInput
                            multiline
                            numberOfLines={3}
                            editable={false}
                            style={styles.inputDescricao}
                            value={this.props.itDesc}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>                    
                </FormRow>
                { this.renderEans() }
                <FormRow>
                    <View style={styles.viewBotao}>
                        <Button
                            onPress={() => this.onPressRelacionar()}
                            title="Relacionar"
                            color="green"
                        />
                    </View>
                </FormRow>
                <View style={{ marginBottom: 50 }} />
            </ScrollView>
        );
    }
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
    eanFetched: state.ConsultaItemEanReducer.eanFetched
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
        height: 35,
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
})(ConsultaItemEan);

import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import FormRow from '../../../utils/FormRow';
import ListaItemConsLocal from './ListaItemConsLocal';

import { 
    modificaLocalizacao,
    modificaCleanLocalizacao,
    doFetchLocation
} from '../../../../actions/ConsultaLocalizacaoActions';

import LoadingSpin from '../../../utils/LoadingSpin';

import imgClear from '../../../../../resources/imgs/limpa_tela.png';

class FormConsultaLocalizacao extends Component {

    constructor(props) {
        super(props);

        this.doFetchLocation = this.doFetchLocation.bind(this);
        this.renderRightButton = this.renderRightButton.bind(this);
        this.clearFields = this.clearFields.bind(this);

        this.fieldsChanged = { localizacao: false };
    }

    componentDidMount() {
        Actions.refresh({ right: this.renderRightButton });
    }

    componentWillUnmount() {
        this.props.modificaCleanLocalizacao();
    }

    clearFields() {
        this.props.modificaCleanLocalizacao();
    }

    doFetchLocation() {
        const { localizacao } = this.props;
        this.props.doFetchLocation({ localizacao });
    }

    renderRightButton() {
        return (
            <TouchableOpacity 
                onPress={() => this.clearFields()}
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
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Localização</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.localizacao}
                            onChangeText={(value) => { 
                                this.fieldsChanged.localizacao = true;
                                this.props.modificaLocalizacao(value); 
                            }}
                            onBlur={() => { 
                                if (this.props.localizacao && this.fieldsChanged.localizacao) {
                                    this.fieldsChanged.localizacao = false;
                                    this.doFetchLocation();
                                } 
                            }}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View style={{ flex: 1 }}>
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
                            style={styles.inputDescricao}
                            value={this.props.descLocaliz}
                        />
                    </View>
                </FormRow>
                <View style={{ padding: 5 }}>
                    <ListaItemConsLocal />
                </View>
                <View style={{ marginBottom: 50 }} />
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    localizacao: state.ConsultaLocalizacaoReducer.localizacao,
    descLocaliz: state.ConsultaLocalizacaoReducer.descLocaliz
});

export default connect(mapStateToProps, {
    modificaLocalizacao,
    modificaCleanLocalizacao,
    doFetchLocation
})(FormConsultaLocalizacao);

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
    btClear: {
        width: 40,
        height: 35
    },
    imgClear: {
        width: 35,
        height: 35
    }
});

import React from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Keyboard,
    Alert
} from 'react-native';

import { connect } from 'react-redux';

import FormRow from '../../utils/FormRow';
import LoadingSpin from '../../utils/LoadingSpin';
import ListaItemConsolidacao from './ListaItemConsolidacao';

import {
    modificaConf,
    modificaVol,
    modificaClean,
    doFetchEtiqConf,
    doConsolidation
} from '../../../actions/ConsolidacaoActions';
import { defaultFormStyles } from '../../utils/Forms';

class FormConsolidacao extends React.PureComponent {
    constructor(props) {
        super(props);

        this.fieldsChanged = { 
            etiqconf: false 
        };

        this.state = {
            persistTap: 'never'
        };
    }

    componentWillUnmount = () => {
        this.props.modificaClean();
    }

    onBlurEtiqVolume = () => {
        if (this.props.codConf && this.fieldsChanged.etiqconf) {
            this.fieldsChanged.etiqconf = false;
            this.doFetchEtiqConf();
        } 
    }

    onChangeEtiqVolume = (value) => {
        this.fieldsChanged.etiqconf = true; 
        this.props.modificaConf(value);
    }
    onChangeEtiqConsolidacao = (value) => {
        this.props.modificaVol(value);
    }

    onSubmitEditingEtiqConsolidacao = () => {
        if (this.props.codVol) this.doConsolidation();
    }

    doChangePersistTap = (notPersist = true) => () => {
        if (notPersist) {
            this.setState({ persistTap: 'never' });
        } else {
            this.setState({ persistTap: 'always' });
        }
    }

    doConsolidation = () => {
        const { 
            codConf,
            codEmb, 
            codVol,
            keyRet,
            usuario
        } = this.props;

        Keyboard.dismiss();

        if (codConf.trim() && codEmb.toString().trim() && codVol.trim()) {
            const params = {
                userName: usuario, 
                embarque: codEmb, 
                resumo: keyRet.resumo, 
                nome: keyRet.nome, 
                pedido: keyRet.pedido, 
                range: keyRet.range, 
                etiqConf: codConf,
                etiqCons: codVol
            };
            
            this.props.doConsolidation(params, this.focusInField);
        } else if (!codConf.trim()) {
            Alert.alert('Cosolidação', 'Campo (Etiq Volume) deve ser informado!');
        } else if (!codVol.trim()) {
            Alert.alert('Cosolidação', 'Campo (Etiq Consolidação) deve ser informado!');
        }
    }

    doFetchEtiqConf = () => {
        this.props.doFetchEtiqConf({ etiqVol: this.props.codConf }, this.focusInField);
    }

    focusInField = (field) => {
        switch (field) {
            case 'etiqconf':
                this.txtEtiqConf.focus();
                this.fieldsChanged.etiqconf = true;
                break;
            case 'etiqvolume':
                this.txtEtiqVolume.focus();
                break;
            default:
        }
    }

    render = () => (
        <ScrollView style={styles.viewPrinc} keyboardShouldPersistTaps={this.state.persistTap}>
            <LoadingSpin />
            <FormRow>
                <View style={{ flex: 1 }}>
                    <Text style={styles.txtLabel}>Etiq Volume</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            value={this.props.codConf}
                            ref={(ref) => (this.txtEtiqConf = ref)}
                            onFocus={this.doChangePersistTap}
                            onChangeText={this.onChangeEtiqVolume}
                            onBlur={this.onBlurEtiqVolume}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.txtLabel}>Embarque</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            value={`${this.props.codEmb}`}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                </View>
            </FormRow>
            <FormRow>
                <View style={{ flex: 1 }}>
                    <Text style={styles.txtLabel}>Etiq Consolidação</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            value={this.props.codVol}
                            ref={(input) => { this.txtEtiqVolume = input; }}
                            onFocus={this.doChangePersistTap(false)}
                            onChangeText={this.onChangeEtiqConsolidacao}
                            onSubmitEditing={this.onSubmitEditingEtiqConsolidacao}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }} />
            </FormRow>
            <FormRow>
                <View style={styles.viewBotao} >
                    <Button
                        onPress={this.doConsolidation}
                        title="Consolidar"
                        color="green"
                    />      
                </View>
                <View style={{ flex: 1 }} />
            </FormRow>
            <View style={{ padding: 5 }}>
                <ListaItemConsolidacao />
            </View>
            <View style={{ marginBottom: 50 }} />
        </ScrollView>
    )
}

const mapStateToProps = state => ({
    codConf: state.ConsolidacaoReducer.codConf,
    codEmb: state.ConsolidacaoReducer.codEmb,
    codVol: state.ConsolidacaoReducer.codVol,
    keyRet: state.ConsolidacaoReducer.keyRet,
    usuario: state.LoginReducer.usuario
});

export default connect(mapStateToProps, {
    modificaConf,
    modificaVol,
    modificaClean,
    doFetchEtiqConf,
    doConsolidation
})(FormConsolidacao);

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
    viewBotao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 10
    }
});

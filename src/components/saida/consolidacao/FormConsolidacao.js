import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Keyboard
} from 'react-native';

import { connect } from 'react-redux';

import FormRow from '../../utils/FormRow';
import ListaItemConsolidacao from './ListaItemConsolidacao';

import {
    modificaConf,
    modificaVol,
    addList,
    modificaClean,
    doFetchEtiqConf
} from '../../../actions/ConsolidacaoActions';

class FormConsolidacao extends Component {

    constructor(props) {
        super(props);

        this.doFetchEtiqConf = this.doFetchEtiqConf.bind(this);
        this.focusInField = this.focusInField.bind(this);

        this.fieldsChanged = { 
            etiqconf: false 
        };
    }

    componentWillUnmount() {
        this.props.modificaClean();
    }

    addVolumes() {
        const volume = this.props.codVol;

        Keyboard.dismiss();

        this.props.addList(volume);
    }

    doFetchEtiqConf() {
        this.props.doFetchEtiqConf({ etiqVol: this.props.codConf }, this.focusInField);
    }

    focusInField(field) {
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

    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Etiq Conferência</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.codConf}
                            ref={(ref) => (this.txtEtiqConf = ref)}
                            onChangeText={value => {
                                this.fieldsChanged.etiqconf = true; 
                                this.props.modificaConf(value); 
                            }}
                            onBlur={() => { 
                                if (this.props.codConf && 
                                    this.fieldsChanged.etiqconf) {
                                        this.fieldsChanged.etiqconf = false;
                                        this.doFetchEtiqConf();
                                    } 
                            }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Embarque</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={`${this.props.codEmb}`}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Etiq Volume</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.codVol}
                            ref={(input) => { this.txtEtiqVolume = input; }}
                            onChangeText={this.props.modificaVol}
                            onSubmitEditing={() => this.props.codVol && this.addVolumes()}
                        />
                    </View>
                    <View style={{ flex: 1 }} />
                </FormRow>
                <FormRow>
                    <View style={styles.viewBotao} >
                        <Button
                            onPress={() => false}
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
        );
    }
}

const mapStateToProps = state => ({
    codConf: state.ConsolidacaoReducer.codConf,
    codEmb: state.ConsolidacaoReducer.codEmb,
    codVol: state.ConsolidacaoReducer.codVol
});

export default connect(mapStateToProps, {
    modificaConf,
    modificaVol,
    addList,
    modificaClean,
    doFetchEtiqConf
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
    input: {
        height: 35,
        fontSize: 14,
        textAlign: 'center',
        backgroundColor: '#20293F',
        color: 'white',
        fontFamily: 'sans-serif-medium',
		borderRadius: 10
    },
    viewBotao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 10
    }
});

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
    modificaEmb,
    modificaVol,
    addList,
    modificaClean
} from '../../../actions/ConsolidacaoActions';

class FormConsolidacao extends Component {

    componentWillUnmount() {
        this.props.modificaClean();
    }

    addVolumes() {
        const volume = this.props.codVol;

        Keyboard.dismiss();

        this.props.addList(volume);
    }

    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Conferência</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            blurOnSubmit={false}
                            style={styles.input}
                            value={this.props.codConf}
                            onChangeText={this.props.modificaConf}
                            ref={(input) => { this.confInput = input; }}
                            onSubmitEditing={() => this.embInput.focus()}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Embarque</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            blurOnSubmit={false}
                            style={styles.input}
                            value={this.props.codEmb}
                            onChangeText={this.props.modificaEmb}
                            ref={(input) => { this.embInput = input; }}
                            onSubmitEditing={() => this.volInput.focus()}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Volume</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            blurOnSubmit={false}
                            style={styles.input}
                            value={this.props.codVol}
                            ref={(input) => { this.volInput = input; }}
                            onChangeText={this.props.modificaVol}
                            onBlur={() => this.props.codVol && this.addVolumes()}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Volume Total</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            blurOnSubmit={false}
                            style={styles.input}
                            value={this.props.codVol}
                            ref={(input) => { this.volInput = input; }}
                            onChangeText={this.props.modificaVol}
                            onBlur={() => this.props.codVol && this.addVolumes()}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Qtde Total</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            blurOnSubmit={false}
                            style={styles.input}
                            value={this.props.codVol}
                            ref={(input) => { this.volInput = input; }}
                            onChangeText={this.props.modificaVol}
                            onBlur={() => this.props.codVol && this.addVolumes()}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Qtde Consolidada</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            blurOnSubmit={false}
                            style={styles.input}
                            value={this.props.codVol}
                            ref={(input) => { this.volInput = input; }}
                            onChangeText={this.props.modificaVol}
                            onBlur={() => this.props.codVol && this.addVolumes()}
                        />
                    </View>
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

const mapStateToProps = state => {
    const maps = (
        {
             codConf: state.ConsolidacaoReducer.codConf,
             codEmb: state.ConsolidacaoReducer.codEmb,
             codVol: state.ConsolidacaoReducer.codVol
        }
    );

    return maps;
};

export default connect(mapStateToProps, {
    modificaConf,
    modificaEmb,
    modificaVol,
    addList,
    modificaClean
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 10
    }
});

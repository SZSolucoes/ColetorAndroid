import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Button
} from 'react-native';

import { connect } from 'react-redux';

import FormRow from '../../utils/FormRow';
import ListaItemDespacho from './ListaItemDespacho';
import {
    modificaRom,
    modificaVol,
    removeItem,
    modificaClean
} from '../../../actions/DespachoActions';

class FormDespacho extends Component {

    componentWillUnmount() {
        this.props.modificaClean();
    }

    removeItem() {
        const codVol = this.props.codVol;
        const listaItens = this.props.listaItens;
        const index = listaItens.findIndex((value) => value.vol === codVol);

        if (index !== -1) {
            listaItens.splice(index, 1);
            this.props.removeItem(listaItens);
        }
    }

    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Romaneio</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            blurOnSubmit={false}
                            style={styles.input}
                            value={this.props.codRom}
                            onChangeText={this.props.modificaRom}
                            ref={(input) => { this.romInput = input; }}
                            onSubmitEditing={() => this.volInput.focus()}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Volume</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.codVol}
                            onChangeText={this.props.modificaVol}
                            onSubmitEditing={() => this.removeItem()}
                            onBlur={() => this.props.codVol && this.removeItem()}
                            blurOnSubmit={false}
                            ref={(input) => { this.volInput = input; }}
                        />
                    </View>
                </FormRow>
                <FormRow> 
                    <View style={styles.viewBotao} >
                        <Button
                            onPress={() => false}
                            title="Despachar"
                            color="green"
                        />      
                    </View>
                </FormRow>
                <View style={{ padding: 5 }}>
                    <ListaItemDespacho />
                </View>
                <View style={{ marginBottom: 50 }} />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    const maps = (
        {
             codRom: state.DespachoReducer.codRom,
             codVol: state.DespachoReducer.codVol,
             listaItens: state.DespachoReducer.listaItens
        }
    );

    return maps;
};

export default connect(mapStateToProps, {
    modificaRom,
    modificaVol,
    removeItem,
    modificaClean
})(FormDespacho);

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
        marginTop: 10,
        paddingHorizontal: 10
    }
});

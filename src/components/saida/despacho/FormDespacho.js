import React from 'react';
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
import ListaItemDespacho from './ListaItemDespacho';
import {
    modificaRom,
    modificaVol,
    removeItem,
    modificaClean
} from '../../../actions/DespachoActions';
import { defaultFormStyles } from '../../utils/Forms';

class FormDespacho extends React.PureComponent {
    componentWillUnmount() {
        this.props.modificaClean();
    }

    removeItem() {
        const codVol = this.props.codVol;
        const listaItens = this.props.listaItens;
        const index = listaItens.findIndex((value) => value.vol === codVol);

        Keyboard.dismiss();

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
                        <View style={defaultFormStyles.inputView}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                blurOnSubmit={false}
                                style={defaultFormStyles.input}
                                value={this.props.codRom}
                                onChangeText={this.props.modificaRom}
                                ref={(input) => { this.romInput = input; }}
                                onSubmitEditing={() => this.volInput.focus()}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Volume</Text>
                        <View style={defaultFormStyles.inputView}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="go"
                                style={defaultFormStyles.input}
                                value={this.props.codVol}
                                onChangeText={this.props.modificaVol}
                                onBlur={() => this.props.codVol && this.removeItem()}
                                ref={(input) => { this.volInput = input; }}
                            />
                        </View>
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
    viewBotao: {
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 10
    }
});

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
import { Actions } from 'react-native-router-flux';

import FormRow from '../../utils/FormRow';
import ListaItemAdicao from './ListaItemAdicao';

class FormConferenciaVolume extends Component {

    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <FormRow>
                    <View style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Batismo</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.nrNotaFis}
                            ref={(input) => { this.nrNotaFis = input; }}
                        />
                    </View>
                    <View style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Embarque</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.fornec}
                        />
                    </View>
                    <View style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Pedido</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.fornec}
                        />
                    </View>
                </FormRow>
                <View>
                    <ListaItemAdicao />
                </View>
                <FormRow>
                    <View style={styles.viewBotao}>
                        <Button
                            onPress={() => false}
                            title="Finalizar"
                            color="green"
                        />
                    </View>  
                </FormRow>
                <View style={{ marginBottom: 50 }} />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    const maps = (
        {
             
        }
    );

    return maps;
};

export default connect(mapStateToProps, {})(FormConferenciaVolume);

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
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: '#20293F',
        color: 'white',
        fontFamily: 'sans-serif-medium',
		borderRadius: 10
    },
    viewBotao: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 10
    },
    viewBtEtiq: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});
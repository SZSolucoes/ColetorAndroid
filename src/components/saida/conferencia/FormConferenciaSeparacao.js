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
import ListaItemConfSep from './ListaItemConfSep';

class FormConferenciaSeparacao extends Component {

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
                <FormRow>
                    <View style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Prioridade</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.qtTotal}
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.txtLabel}>Total Itens</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.qtConferir}
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.txtLabel}>Itens Conf</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.codEAN}
                            ref={(input) => { this.codEAN = input; }}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View style={{ flex: 5 }}>
                        <Text style={styles.txtLabel}>EAN</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.qtItem}
                            ref={(input) => { this.qtItem = input; }}
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.txtLabel}>Qtde</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.localPad}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View>
                        <Text style={styles.txtLabel}>Descrição</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            multiline
                            numberOfLines={3}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.inputDescricao}
                            value={this.props.desItem}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Item</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.localPad}
                        />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.txtLabel}>UM</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.codItem}
                        />
                    </View>
                    <View style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Lote</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.batismo}
                            ref={(input) => { this.batismo = input; }}
                        />
                    </View>
                </FormRow>
                <FormRow>
                <View style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Separador</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.unidMed}
                        />
                    </View>
                    <View style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Localização</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.batismo}
                            ref={(input) => { this.batismo = input; }}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View style={styles.viewBotao}>
                        <Button
                            onPress={() => false}
                            title="Conferir"
                            color="green"
                        />
                    </View>
                </FormRow>
                <View style={{ padding: 5 }}>
                    <ListaItemConfSep />
                </View>
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

export default connect(mapStateToProps, {})(FormConferenciaSeparacao);

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
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 10
    }
});

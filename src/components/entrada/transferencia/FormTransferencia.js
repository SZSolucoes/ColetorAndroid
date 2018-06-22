import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Alert,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { 
    iniciaTela,
    modificaCodEAN,
    modificaCodItem,
    modificaCodLocalDest,
    modificaCodLocalOrig,
    modificaDescItem,
    modificaQtItem,
    modificaUnidMed,
    efetivaTransferencia,
    modificaSaldoItem,
    buscaInfoEANTransf,
    modificaCodLote,
    modificaOnTransferencia
} from '../../../actions/TransfereActions';

class FormTransferencia extends Component {
    componentWillMount() {
        this.props.iniciaTela();
    }
    onPressTransfer() {
        const { 
            usuario, 
            codEAN, 
            qtItem, 
            codLocalDest, 
            codLocalOrig,
            codLote,
            tpCont
        } = this.props;

        console.log(codLote);

        if (codEAN) {
            if (codEAN.length === 0) {
                Alert.alert(
                    'Transferência',
                    'EAN deve ser informado!'
                );
                return;
            } 
        } else {
            Alert.alert(
                'Transferência',
                'EAN deve ser informado!'
            );
            return;
        }

        if (tpCont === '3') {
            if (codLote) {
                if (codLote.length === 0) {
                    Alert.alert(
                        'Transferência',
                        'Lote deve ser informado!'
                    );
                    return;
                } 
            } else {
                Alert.alert(
                    'Transferência',
                    'Lote deve ser informado!'
                );
                return;
            }
        }

        if (qtItem) {
            if (qtItem.length === 0 || _.toInteger(qtItem) < 1) {
                Alert.alert(
                    'Transferência',
                    'Quantidade Item deve ser maior que 0!'
                );
                return;
            } 
        } else {
            Alert.alert(
                'Transferência',
                'Quantidade Item deve ser maior que 0!'
            );
            return;
        }
        if (codLocalDest) {
            if (codLocalDest.length === 0) {
                Alert.alert(
                    'Transferência',
                    'Local Destino deve ser informado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Transferência',
                'Local Destino deve ser informado!'
            );
            return;
        }
        if (codLocalOrig) {
            if (codLocalOrig.length === 0) {
                Alert.alert(
                    'Transferência',
                    'Local Origem deve ser informado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Transferência',
                'Local Origem deve ser informado!'
            );
            return;
        }

        this.props.modificaOnTransferencia(true);
        this.props.efetivaTransferencia(usuario, codEAN, codLocalOrig, codLocalDest, qtItem, codLote);
    }
    buscaEAN() {
        const codEAN = this.props.codEAN;

        this.props.buscaInfoEANTransf(codEAN);
    }
    renderBtEfetivar() {
        if (this.props.onTransferencia) {
            return (
                <ActivityIndicator size="large" />
            );
        }

        return (
            <View style={[styles.viewBotao, { flex: 1 }]}>
                <Button
                    onPress={() => { this.onPressTransfer(); }}
                    title="Transferir"
                    color="green"
                />
            </View>
        );
    }
    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 4 }]}>
                        <Text style={styles.txtLabel}>EAN</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={styles.input}
                            returnKeyType="go"
                            onChangeText={codEAN => this.props.modificaCodEAN(codEAN)}
                            value={this.props.codEAN}
                            onSubmitEditing={() => { this.buscaEAN(); }}
                            ref={(input) => { this.txtEAN = input; }}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 3 }]}>
                        <Text style={styles.txtLabel}>Item</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={codItem => this.props.modificaCodItem(codItem)}
                            value={this.props.codItem}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
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
                            onChangeText={descItem => this.props.modificaDescItem(descItem)}
                            value={this.props.descItem}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Quantidade</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={qtItem => this.props.modificaQtItem(qtItem)}
                            value={this.props.qtItem}
                            ref={(input) => { this.txtQtItem = input; }}
                            onSubmitEditing={() => { this.txtLote.focus(); }}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>UM</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={unidMed => this.props.modificaUnidMed(unidMed)}
                            value={this.props.unidMed}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 4 }]}>
                        <Text style={styles.txtLabel}>Lote</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={codLote => this.props.modificaCodLote(codLote)}
                            value={this.props.codLote}
                            ref={(input) => { this.txtLote = input; }}
                            onSubmitEditing={() => { this.txtLocalOrig.focus(); }}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 4 }]}>
                        <Text style={styles.txtLabel}>Local Origem</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={local => this.props.modificaCodLocalOrig(local)}
                            value={this.props.codLocalOrig}
                            ref={(input) => { this.txtLocalOrig = input; }}
                            onSubmitEditing={() => { this.txtLocalDest.focus(); }}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Local Destino</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={local => this.props.modificaCodLocalDest(local)}
                            value={this.props.codLocalDest}
                            ref={(input) => { this.txtLocalDest = input; }}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    {this.renderBtEfetivar()}
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return (
        {
            codEAN: state.TransfereReducer.codEAN,
            codItem: state.TransfereReducer.codItem,
            codLote: state.TransfereReducer.codLote,
            codLocalDest: state.TransfereReducer.codLocalDest,
            codLocalOrig: state.TransfereReducer.codLocalOrig,
            descItem: state.TransfereReducer.descItem,
            qtItem: state.TransfereReducer.qtItem,
            unidMed: state.TransfereReducer.unidMed,
            usuario: state.LoginReducer.usuario,
            saldoItem: state.TransfereReducer.saldoItem,
            onTransferencia: state.TransfereReducer.onTransferencia
        }
    );
};

export default connect(mapStateToProps, { 
    iniciaTela,
    modificaCodEAN,
    modificaCodItem,
    modificaCodLocalDest,
    modificaCodLocalOrig,
    modificaDescItem,
    modificaQtItem,
    modificaUnidMed,
    efetivaTransferencia,
    modificaSaldoItem,
    buscaInfoEANTransf,
    modificaCodLote,
    modificaOnTransferencia
})(FormTransferencia);

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1,
        backgroundColor: '#4b86b4'
    },
    viewLinha: {
        flexDirection: 'row'
    },
    viewCampo: {
        flexDirection: 'column',        
        paddingHorizontal: 10
    },
    viewCampoLocal: {
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    viewLinhaLocal: {
        flexDirection: 'column'        
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
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 10
    },
    button: {
        alignItems: 'center',
        width: 90,
        height: 35,
        padding: 10,
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
    }
});

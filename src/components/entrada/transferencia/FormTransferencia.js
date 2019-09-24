/* eslint-disable max-len */
import React from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Alert,
    Keyboard
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
    modificaOnTransferencia,
    modificaTransferenciaClear
} from '../../../actions/TransfereActions';
import { defaultFormStyles } from '../../utils/Forms';
import LoadingSpin from '../../utils/LoadingSpin';

class FormTransferencia extends React.PureComponent {
    componentDidMount = () => {
        this.props.iniciaTela();
    }

    componentWillUnmount = () => {
        this.props.modificaTransferenciaClear();
    }

    onBlurEan = () => {
        if (this.props.codEAN) this.buscaEAN();
    }

    onChangeEan = (value) => {
        this.props.modificaCodEAN(value);
    }
    onChangeQuantidade = (value) => {
        this.props.modificaQtItem(value);
    }
    onChangeLote = (value) => {
        this.props.modificaCodLote(value);
    }
    onChangeLocalOrigem = (value) => {
        this.props.modificaCodLocalOrig(value);
    }
    onChangeLocalDestino = (value) => {
        this.props.modificaCodLocalDest(value);
    }

    onSubmitEditingQuantidade = () => {
        this.txtLote.focus();
    }
    onSubmitEditingLote = () => {
        this.txtLocalOrig.focus();
    }
    onSubmitEditingLocalOrigem = () => {
        this.txtLocalDest.focus();
    }

    onPressTransfer = () => {
        const { 
            usuario, 
            codEAN, 
            qtItem, 
            codLocalDest, 
            codLocalOrig,
            codLote,
            tpCont
        } = this.props;

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
        /*if (codLocalOrig) {
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
        }*/

        this.props.modificaOnTransferencia(true);
        this.props.efetivaTransferencia(usuario, codEAN, codLocalOrig, codLocalDest, qtItem, codLote);
    }

    buscaEAN = () => {
        const codEAN = this.props.codEAN;

        Keyboard.dismiss();

        this.props.buscaInfoEANTransf(codEAN);
    }

    renderBtEfetivar = () => (
        <View style={[styles.viewBotao, { flex: 1 }]}>
            <Button
                onPress={this.onPressTransfer}
                title="Transferir"
                color="green"
            />
        </View>
    )

    render = () => (
        <ScrollView style={styles.viewPrinc}>
            <LoadingSpin />
            <View style={styles.viewLinha}>
                <View style={[styles.viewCampo, { flex: 4 }]}>
                    <Text style={styles.txtLabel}>EAN</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={defaultFormStyles.input}
                            returnKeyType="go"
                            onChangeText={this.onChangeEan}
                            value={this.props.codEAN}
                            onBlur={this.onBlurEan}
                            ref={(input) => { this.txtEAN = input; }}
                        />
                    </View>
                </View>
                <View style={[styles.viewCampo, { flex: 3 }]}>
                    <Text style={styles.txtLabel}>Item</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            value={this.props.codItem}
                        />
                    </View>
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
                        style={defaultFormStyles.inputDescricao}
                        value={this.props.descItem}
                    />
                </View>
            </View>
            <View style={styles.viewLinha}>
                <View style={[styles.viewCampo, { flex: 1 }]}>
                    <Text style={styles.txtLabel}>Quantidade</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            onChangeText={this.onChangeQuantidade}
                            value={this.props.qtItem}
                            ref={(input) => { this.txtQtItem = input; }}
                            onSubmitEditing={this.onSubmitEditingQuantidade}
                        />
                    </View>
                </View>
                <View style={[styles.viewCampo, { flex: 1 }]}>
                    <Text style={styles.txtLabel}>UM</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            value={this.props.unidMed}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.viewLinha}>
                <View style={[styles.viewCampo, { flex: 4 }]}>
                    <Text style={styles.txtLabel}>Lote</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            onChangeText={this.onChangeLote}
                            value={this.props.codLote}
                            ref={(input) => { this.txtLote = input; }}
                            onSubmitEditing={this.onSubmitEditingLote}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.viewLinha}>
                <View style={[styles.viewCampo, { flex: 4 }]}>
                    <Text style={styles.txtLabel}>Local Origem</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            onChangeText={this.onChangeLocalOrigem}
                            value={this.props.codLocalOrig}
                            ref={(input) => { this.txtLocalOrig = input; }}
                            onSubmitEditing={this.onSubmitEditingLocalOrigem}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.viewLinha}>
                <View style={[styles.viewCampo, { flex: 1 }]}>
                    <Text style={styles.txtLabel}>Local Destino</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            onChangeText={this.onChangeLocalDestino}
                            value={this.props.codLocalDest}
                            ref={(input) => { this.txtLocalDest = input; }}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.viewLinha}>
                {this.renderBtEfetivar()}
            </View>
        </ScrollView>
    )
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
    modificaOnTransferencia,
    modificaTransferenciaClear
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
    }
});

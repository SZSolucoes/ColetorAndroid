import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import ListaItem from './ListaItem';
import { 
    modificaBatismo,
    modificaCodEAN,
    modificaCodItem,
    modificaDesItem,
    modificaFornec,
    modificaLocalPad,
    modificaNrNotaFis,
    modificaQtConferir,
    modificaQtEtiq,
    modificaQtItem,
    modificaQtTotal,
    modificaUnidMed,
    iniciaTela,
    limpaTela,
    buscaNotaConferencia
} from '../../../actions/ConfereActions';

class FormConf extends Component {
    componentWillMount() {
        this.props.iniciaTela();
        const usuario = this.props.usuario;
        console.log(usuario);
        this.props.buscaNotaConferencia(usuario);
    }
    carregaNF() {
        const nrNota = this.props.nrNotaFis;
        console.log(nrNota);

        //modificaFornec
        //modificaQtTotal
        this.codEAN.focus();
    }
    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Nota Fiscal</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={nrNotaFis => this.props.modificaNrNotaFis(nrNotaFis)}
                            value={this.props.nrNotaFis}
                            ref={(input) => { this.nrNotaFis = input; }}
                            onSubmitEditing={() => { this.carregaNF(); }}
                        />
                    </View>
                    <View style={styles.viewBtSearch}>
                        <TouchableOpacity
                            style={styles.btSearch}
                            onPress={this.onPress}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Fornecedor</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={fornec => this.props.modificaFornec(fornec)}
                            value={this.props.fornec}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Total</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={qtTotal => this.props.modificaQtTotal(qtTotal)}
                            value={this.props.qtTotal}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Conferir</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={qtConferir => this.props.modificaQtConferir(qtConferir)}
                            value={this.props.qtConferir}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 3 }]}>
                        <Text style={styles.txtLabel}>EAN</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={codEAN => this.props.modificaCodEAN(codEAN)}
                            value={this.props.codEAN}
                            ref={(input) => { this.codEAN = input; }}
                            onSubmitEditing={() => { this.qtItem.focus(); }}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Qtde</Text>
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
                            ref={(input) => { this.qtItem = input; }}
                            onSubmitEditing={() => { this.batismo.focus(); }}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 3 }]}>
                        <Text style={styles.txtLabel}>Localização Padrão</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={localPad => this.props.modificaLocalPad(localPad)}
                            value={this.props.localPad}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 5 }]}>
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
                    <View style={[styles.viewCampo, { flex: 2 }]}>
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
                    <View style={[styles.viewCampo, { flex: 3 }]}>
                        <Text style={styles.txtLabel}>Batismo</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={batismo => this.props.modificaBatismo(batismo)}
                            value={this.props.batismo}
                            ref={(input) => { this.batismo = input; }}
                            onSubmitEditing={() => { this.qtEtiq.focus(); }}
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
                            onChangeText={desItem => this.props.modificaDesItem(desItem)}
                            value={this.props.desItem}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewBotao, { flex: 2 }]}>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: 'green'
                                }
                            ]}
                            onPress={this.onPress}
                        >
                            <Text style={{ color: 'white', fontSize: 14 }}> Efetivar </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: 'red'
                                }
                            ]}
                            onPress={this.onPress}
                        >
                            <Text style={{ color: 'white', fontSize: 14 }}> Voltar </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={[styles.txtLabel, { textAlign: 'left' }]}>Qtde Etiq</Text>
                        <View style={styles.viewBtEtiq}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={styles.input}
                                onChangeText={qtEtiq => this.props.modificaQtEtiq(qtEtiq)}
                                value={this.props.qtEtiq}
                                ref={(input) => { this.qtEtiq = input; }}
                            />
                            <TouchableOpacity
                                style={styles.btSearch}
                                onPress={this.onPress}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ padding: 5 }} >
                    <ListaItem />
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return (
        {
            nrNotaFis: state.ConfereReducer.nrNotaFis,
            fornec: state.ConfereReducer.fornec,
            qtTotal: state.ConfereReducer.qtTotal,
            qtConferir: state.ConfereReducer.qtConferir,
            codEAN: state.ConfereReducer.codEAN,
            qtItem: state.ConfereReducer.qtItem,
            localPad: state.ConfereReducer.localPad,
            codItem: state.ConfereReducer.codItem,
            unidMed: state.ConfereReducer.unidMed,
            batismo: state.ConfereReducer.batismo,
            desItem: state.ConfereReducer.desItem,
            qtEtiq: state.ConfereReducer.qtEtiq,
            usuario: state.LoginReducer.usuario
        }
    );
};

export default connect(mapStateToProps, { 
    modificaBatismo,
    modificaCodEAN,
    modificaCodItem,
    modificaDesItem,
    modificaFornec,
    modificaLocalPad,
    modificaNrNotaFis,
    modificaQtConferir,
    modificaQtEtiq,
    modificaQtItem,
    modificaQtTotal,
    modificaUnidMed,
    iniciaTela,
    limpaTela,
    buscaNotaConferencia
})(FormConf);

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
        fontSize: 17,
        textAlign: 'center',
		backgroundColor: 'rgba(255,255,255,0.2)',
        color: 'white',
        fontFamily: 'sans-serif-medium',
		borderRadius: 10
    },
    inputDescricao: {
        height: 70,
        fontSize: 14,
        textAlign: 'left',
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: 'white',
        borderRadius: 10,
        fontFamily: 'sans-serif-medium'
    },
    viewBotao: {
        flexDirection: 'row',
        flex: 2,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 10
    },
    btSearch: {
        width: 40,
        height: 35,
        padding: 10,
        paddingHorizontal: 10,
        backgroundColor: '#2a4d69'
    },
    button: {
        alignItems: 'center',
        width: 90,
        height: 35,
        padding: 10,
        borderRadius: 10
    },
    viewBtSearch: {
        justifyContent: 'flex-end'
    },
    viewBtEtiq: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});

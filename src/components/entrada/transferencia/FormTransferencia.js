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
import { Actions } from 'react-native-router-flux';

import { 
    iniciaTela,
    modificaCodEAN,
    modificaCodItem,
    modificaCodLocalDest,
    modificaCodLocalOrig,
    modificaDescItem,
    modificaQtItem,
    modificaUnidMed
} from '../../../actions/TransfereActions';

class FormTransferencia extends Component {
    onPressVoltar() {
        Actions.pop();
    }
    onPressTransfer() {
        
    }
    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 3 }]}>
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
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 2 }]}>
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
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
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
                        <Text style={styles.txtLabel}>Local Origem</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={codLocalOrig => this.props.modificaCodLocalOrig(codLocalOrig)}
                            value={this.props.codLocalOrig}
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
                            onChangeText={codLocalDest => this.props.modificaCodLocalDest(codLocalDest)}
                            value={this.props.codLocalDest}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewBotao, { flex: 1 }]}>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: 'green'
                                }
                            ]}
                            onPress={() => { this.onPressTransfer(); }}
                        >
                            <Text style={{ color: 'white', fontSize: 14 }}> Transferir </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: 'red'
                                }
                            ]}
                            onPress={() => { this.onPressVoltar(); }}
                        >
                            <Text style={{ color: 'white', fontSize: 14 }}> Voltar </Text>
                        </TouchableOpacity>
                    </View>
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
            codLocalDest: state.TransfereReducer.codLocalDest,
            codLocalOrig: state.TransfereReducer.codLocalOrig,
            descItem: state.TransfereReducer.descItem,
            qtItem: state.TransfereReducer.qtItem,
            unidMed: state.TransfereReducer.unidMed,
            usuario: state.LoginReducer.usuario
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
    modificaUnidMed
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
        fontSize: 16,
        textAlign: 'center',
        //backgroundColor: 'rgba(255,255,255,0.2)',
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
    }
});

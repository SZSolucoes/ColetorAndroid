import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { 
    iniciaTela,
    modificaCodEAN,
    modificaCodItem,
    modificaDescItem,
    modificaUnidMed,
    modificaListaItem,
    buscaEstoque,
    limpaTela
} from '../../actions/EstoqueActions';

import ListaItemEstoque from './ListaItemEstoque';

const imgClear = require('../../../resources/imgs/limpa_tela.png');

class FormEstoque extends Component {
    componentWillMount() {
        this.props.iniciaTela();
    }
    fnBuscaEstoque() {
        const codEAN = this.props.codEAN;
        if (codEAN) {
            if (codEAN.length === 0) {
                Alert.alert(
                    'Erro EAN',
                    'Código EAN deve ser informado!'
                );
                return;
            } 
        } else {
            Alert.alert(
                'Erro EAN',
                'Código EAN deve ser informado!'
            );
            return;
        }
        this.props.limpaTela();
        this.props.buscaEstoque(codEAN);
    }
    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>EAN</Text>
                        <View style={styles.viewBtEtiq}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                keyboardType="numeric"
                                autoCorrect={false}
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="go"
                                style={[styles.input, { flex: 5 }]}
                                onChangeText={codEAN => this.props.modificaCodEAN(codEAN)}
                                value={this.props.codEAN}
                                onSubmitEditing={() => this.fnBuscaEstoque()}
                            />
                            <TouchableOpacity
                                style={styles.btClear}
                                onPress={() => { this.props.iniciaTela(); }}
                            >
                                <Image
                                    source={imgClear}
                                    style={styles.imgClear}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 4 }]}>
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
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Descrição</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            multiline
                            numberOfLines={3}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.inputDescricao}
                            onChangeText={descItem => this.props.modificaDescItem(descItem)}
                            value={this.props.descItem}
                        />
                    </View>                    
                </View>
                <View style={{ padding: 5 }} >
                    <ListaItemEstoque />
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => (
    {
        codEAN: state.EstoqueReducer.codEAN,
        codItem: state.EstoqueReducer.codItem,
        unidMed: state.EstoqueReducer.unidMed,
        descItem: state.EstoqueReducer.descItem,
        listaItem: state.EstoqueReducer.listaItem
    }
);

export default connect(mapStateToProps, { 
    iniciaTela,
    modificaCodEAN,
    modificaCodItem,
    modificaDescItem,
    modificaUnidMed,
    modificaListaItem,
    buscaEstoque,
    limpaTela
})(FormEstoque);

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
    viewBtEtiq: {
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    txtLabel: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 13,
        fontFamily: 'sans-serif-medium'
    },
    input: {
        height: 35,
        fontSize: 14,
        textAlign: 'center',
        //backgroundColor: 'rgba(255,255,255,0.2)',
        backgroundColor: '#20293F',
        color: 'white',
        borderRadius: 10,
        fontFamily: 'sans-serif-medium'
    },
    inputDescricao: {
        height: 70,
        fontSize: 14,
        textAlign: 'left',
        //backgroundColor: 'rgba(255,255,255,0.2)',
        backgroundColor: '#20293F',
        color: 'white',
        borderRadius: 10,
        fontFamily: 'sans-serif-medium'
    },
    viewBotao: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        //alignItems: 'flex-end',
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
    btClear: {
        width: 40,
        height: 35
    },
    imgClear: {
        width: 35,
        height: 35
    }
});

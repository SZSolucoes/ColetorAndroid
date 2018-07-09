import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Alert,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import _ from 'lodash';
import ListaItem from './ListaItemArm';
import { 
    modificaBatismo, 
    modificaCodEAN, 
    modificaCodItem,
    modificaDesItem,
    modificaCodLocal,
    modificaLote,
    modificaUnidMed,
    modificaQtArmazenado,
    modificaQtItem,
    modificaQtTotal,
    buscaInfoBastimo,
    iniciaTela,
    efetivaArmazena,
    modificaItemArmazena,
    modificaCodDepos,
    modificaOnEfetivar
} from '../../../actions/ArmazenaActions';

const imgClear = require('../../../../resources/imgs/limpa_tela.png');

class FormArmazena extends Component {
    componentWillMount() {
        this.props.iniciaTela();
    }
    onPressEfetivar() {
        const { 
            usuario, 
            codEAN,
            batismo,
            qtItem, 
            codLocal, 
            lote,
            etiquetaArmazena,
            itemArmazena,
            listaItem 
        } = this.props;

        if (qtItem) {       
            if (qtItem.length === 0 || _.toInteger(qtItem) < 1) {
                Alert.alert(
                    'Armazenamento',
                    'Quantidade Item deve ser maior que 0!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Armazenamento',
                'Quantidade Item deve ser maior que 0!'
            );
            return;
        }

        if (codEAN) {
            if (codEAN.length === 0) {
                Alert.alert(
                    'Armazenamento',
                    'EAN deve ser informado!'
                );
                return;
            }

            const itemArm = _.filter(listaItem, { ean: codEAN });

            if (itemArm[0]) {
                if (itemArm[0].length === 0) {
                    Alert.alert(
                        'Armazenamento',
                        'EAN Não Localizado!'
                    );
                    return;
                }
                if (itemArm[0].qtdItem !== qtItem) {
                    Alert.alert(
                        'Armazenamento',
                        'Quantidade Item Diferente da Conferida!'
                    );
                    return;
                }
            } else {
                Alert.alert(
                    'Armazenamento',
                    'EAN Não Localizado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Armazenamento',
                'EAN deve ser informado!'
            );
            return;
        }
        
        if (codLocal) {
            if (codLocal.length === 0) {
                Alert.alert(
                    'Armazenamento',
                    'Local deve ser informado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Armazenamento',
                'Local deve ser informado!'
            );
            return;
        }
        if (batismo) {
            if (batismo.length === 0) {
                Alert.alert(
                    'Armazenamento',
                    'Batismo deve ser informado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Armazenamento',
                'Batismo deve ser informado!'
            );
            return;
        }
        if (itemArmazena.tpCont === '3') {
            if (lote.length === 0) {
                Alert.alert(
                    'Armazenamento',
                    'Lote deve ser informado!'
                );
                return;
            }
        }
        const armazenamento = {
            usuario, 
            codEAN,
            batismo,
            qtItem, 
            codLocal, 
            lote
        };

        this.props.modificaOnEfetivar(true);
        this.props.efetivaArmazena(etiquetaArmazena, itemArmazena, armazenamento);
    }
    validEAN() {
        const { listaItem, codEAN } = this.props;

        const itemArm = _.filter(listaItem, { ean: codEAN });

        if (itemArm[0]) {
            if (itemArm[0].length === 0) {
                Alert.alert(
                    'Armazenamento',
                    'EAN Não Localizado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Armazenamento',
                'EAN Não Localizado!'
            );
            return;
        }

        const { itCode, itDescAbrev, un, localiz, codDepos } = itemArm[0];

        this.props.modificaCodItem(itCode);
        this.props.modificaDesItem(itDescAbrev);
        this.props.modificaUnidMed(un);
        this.props.modificaCodLocal(localiz);
        this.props.modificaCodDepos(codDepos);
        this.props.modificaItemArmazena(itemArm);

        this.txtLocal.focus();
    }
    validLocal() {
        this.txtQuantidade.focus();
    }
    validBatismo() {
        const { batismo } = this.props;

        if (batismo) {
            if (batismo.length === 0) {
                Alert.alert(
                    'Armazenamento',
                    'Etiqueta Batismo deve ser informada!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Armazenamento',
                'Etiqueta Batismo deve ser informada!'
            );
            return;
        }

        this.props.buscaInfoBastimo(batismo);
        this.txtEAN.focus();
    }
    renderBtEfetivar() {
        if (this.props.onArmazena) {
            return (
                <ActivityIndicator size="large" />
            );
        }
        return (
            <View style={[styles.viewBotao, { flex: 1 }]}>
                <Button
                    onPress={() => { this.onPressEfetivar(); }}
                    title="Efetivar"
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
                        <Text style={styles.txtLabel}>Batismo</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder=""
                                //keyboardType="numeric"
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="go"
                                style={[styles.input, { flex: 1 }]}
                                onChangeText={batismo => this.props.modificaBatismo(batismo)}
                                value={this.props.batismo}
                                ref={(input) => { this.txtBatismo = input; }}
                                onSubmitEditing={() => { this.validBatismo(); }}
                            />
                            <TouchableOpacity 
                                onPress={() => this.props.modificaBatismo()}
                                style={styles.btClear}
                            >
                                <Image
                                    source={imgClear}
                                    style={styles.imgClear}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.viewCampo, { flex: 2 }]}>
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
                    <View style={[styles.viewCampo, { alignItems: 'center' }]}>
                        <Text style={[styles.txtLabel]}>Armazenado</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={[styles.input, { width: 60 }]}
                            onChangeText={qtArmazenado => this.props.modificaQtArmazenado(qtArmazenado)}
                            value={this.props.qtArmazenado}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>EAN</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder=""
                                keyboardType="numeric"
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="go"
                                style={[styles.input, { flex: 1 }]}
                                onChangeText={codEAN => this.props.modificaCodEAN(codEAN)}
                                value={this.props.codEAN}
                                ref={(input) => { this.txtEAN = input; }}
                                onSubmitEditing={() => { this.validEAN(); }}
                            />
                            <TouchableOpacity 
                                onPress={() => this.props.modificaCodEAN()}
                                style={styles.btClear}
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
                            keyboardType="numeric"
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
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            multiline
                            numberOfLines={3}
                            style={styles.inputDescricao}
                            onChangeText={desItem => this.props.modificaDesItem(desItem)}
                            value={this.props.desItem}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 3 }]}>
                        <Text style={styles.txtLabel}>Localização</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={[styles.input, { flex: 1 }]}
                                onChangeText={codLocal => this.props.modificaCodLocal(codLocal)}
                                value={this.props.codLocal}
                                ref={(input) => { this.txtLocal = input; }}
                                onSubmitEditing={() => { this.validLocal(); }}
                            />
                            <TouchableOpacity 
                                onPress={() => this.props.modificaBatismo()}
                                style={styles.btClear}
                            >
                                <Image
                                    source={imgClear}
                                    style={styles.imgClear}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text 
                            style={[
                                styles.txtLabel
                            ]} 
                        >
                            Deposito
                        </Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            editable={false}
                            style={[styles.input]}
                            onChangeText={codDepos => this.props.modificaCodDepos(codDepos)}
                            value={this.props.codDepos}
                            ref={(input) => { this.txtDepos = input; }}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Quantidade</Text>
                        <TextInput
                            placeholder=""
                            keyboardType="numeric"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={qtItem => this.props.modificaQtItem(qtItem)}
                            value={this.props.qtItem}
                            ref={(input) => { this.txtQuantidade = input; }}
                            onSubmitEditing={() => { this.txtLote.focus(); }}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 2 }]}>
                        <Text style={styles.txtLabel}>Lote</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            onChangeText={lote => this.props.modificaLote(lote)}
                            value={this.props.lote}
                            ref={(input) => { this.txtLote = input; }}
                            onSubmitEditing={() => { this.onPressEfetivar(); }}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    {this.renderBtEfetivar()}
                </View>
                <View style={{ padding: 5 }} >
                    <ListaItem />
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => (
    {
        batismo: state.ArmazenaReducer.batismo,
        qtTotal: state.ArmazenaReducer.qtTotal,
        qtArmazenado: state.ArmazenaReducer.qtArmazenado,
        codEAN: state.ArmazenaReducer.codEAN,
        codItem: state.ArmazenaReducer.codItem,
        desItem: state.ArmazenaReducer.desItem,
        unidMed: state.ArmazenaReducer.unidMed,
        codLocal: state.ArmazenaReducer.codLocal,
        codDepos: state.ArmazenaReducer.codDepos,
        qtItem: state.ArmazenaReducer.qtItem,
        lote: state.ArmazenaReducer.lote,
        usuario: state.LoginReducer.usuario,
        listaItem: state.ArmazenaReducer.listaItem,
        itemArmazena: state.ArmazenaReducer.itemArmazena,
        etiquetaArmazena: state.ArmazenaReducer.etiquetaArmazena,
        onArmazena: state.ArmazenaReducer.onArmazena
    }
);

export default connect(mapStateToProps, { 
    modificaBatismo, 
    modificaCodEAN, 
    modificaCodItem,
    modificaDesItem,
    modificaCodLocal,
    modificaLote,
    modificaQtArmazenado,
    modificaQtItem,
    modificaQtTotal,
    modificaUnidMed,
    buscaInfoBastimo,
    iniciaTela,
    efetivaArmazena,
    modificaItemArmazena,
    modificaCodDepos,
    modificaOnEfetivar
})(FormArmazena);

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
        fontSize: 13
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
    input: {
        height: 35,
        fontSize: 14,
        textAlign: 'center',
        backgroundColor: '#20293F',
        color: 'white',
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
    btClear: {
        width: 30,
        height: 35
    },
    imgClear: {
        width: 30,
        height: 35
    }
});

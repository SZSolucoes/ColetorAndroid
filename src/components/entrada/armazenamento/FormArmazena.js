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
    modificaCodLocal,
    modificaDesLocal,
    modificaLote,
    modificaQtArmazenado,
    modificaQtItem,
    modificaQtTotal,
    modificaUnidMed
} from '../../../actions/ArmazenaActions';

class FormArmazena extends Component {
    render() {
        console.log(this.props);
        return (
            <ScrollView style={styles.viewPrinc}>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 4 }]}>
                        <Text style={styles.txtLabel}>Batismo</Text>
                        <TextInput
                            placeholder=""
                            keyboardType="numeric"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={batismo => this.props.modificaBatismo(batismo)}
                            value={this.props.batismo}
                            ref={(input) => { this.txtBatismo = input; }}
                            onSubmitEditing={() => { this.txtEAN.focus(); }}
                        />
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
                        <TextInput
                            placeholder=""
                            keyboardType="numeric"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={codEAN => this.props.modificaCodEAN(codEAN)}
                            value={this.props.codEAN}
                            ref={(input) => { this.txtEAN = input; }}
                            onSubmitEditing={() => { this.txtLocal.focus(); }}
                        />
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
                            editable={false}
                            multiline
                            style={styles.input}
                            onChangeText={desItem => this.props.modificaDesItem(desItem)}
                            value={this.props.desItem}
                        />
                    </View>
                </View>
                <View style={styles.viewLinhaLocal}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text 
                            style={[
                                styles.txtLabel, 
                                { 
                                    textAlign: 'left', 
                                    paddingLeft: 2 
                                }
                            ]} 
                        >
                            Localização
                        </Text>
                    </View>
                    <View style={[styles.viewCampoLocal, { flex: 1 }]}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={[styles.input, { width: 80 }]}
                            onChangeText={codLocal => this.props.modificaCodLocal(codLocal)}
                            value={this.props.codLocal}
                            ref={(input) => { this.txtLocal = input; }}
                            onSubmitEditing={() => { this.txtQuantidade.focus(); }}
                        />
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={[styles.input, { width: 200 }]}
                            onChangeText={desLocal => this.props.modificaDesLocal(desLocal)}
                            value={this.props.desLocal}
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
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={lote => this.props.modificaLote(lote)}
                            value={this.props.lote}
                            ref={(input) => { this.txtLote = input; }}
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
                            onPress={this.onPress}
                        >
                            <Text style={{ color: 'white', fontSize: 13 }}> Armazenar </Text>
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
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: '#f9a602'
                                }
                            ]}
                            onPress={this.onPress}
                        >
                            <Text style={{ color: 'white', fontSize: 14 }}> Atualizar </Text>
                        </TouchableOpacity>
                    </View>
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
        desLocal: state.ArmazenaReducer.desLocal,
        qtItem: state.ArmazenaReducer.qtItem,
        lote: state.ArmazenaReducer.lote
    }
);

export default connect(mapStateToProps, { 
    modificaBatismo, 
    modificaCodEAN, 
    modificaCodItem,
    modificaDesItem,
    modificaCodLocal,
    modificaDesLocal,
    modificaLote,
    modificaQtArmazenado,
    modificaQtItem,
    modificaQtTotal,
    modificaUnidMed 
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
        //flex: 1,
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
        //marginBottom: 5
    },
    input: {
        height: 35,
        fontSize: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: 'white',
		borderRadius: 10
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
    }
});

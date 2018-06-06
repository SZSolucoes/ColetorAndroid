import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Alert
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
    modificaDesLocal,
    modificaLote,
    modificaUnidMed,
    modificaQtArmazenado,
    modificaQtItem,
    modificaQtTotal    
} from '../../../actions/ArmazenaActions';


class FormArmazena extends Component {
    onPressEfetivar() {
        const { 
            usuario, 
            codEAN,
            batismo,
            qtItem, 
            codLocal, 
            lote } = this.props;

        if (codEAN.length === 0) {
            Alert.alert(
                'Armazenamento',
                'EAN deve ser informado!'
            );
            return;
        } 
        if (qtItem.length === 0 || _.toInteger(qtItem) < 1) {
            Alert.alert(
                'Armazenamento',
                'Quantidade Item deve ser maior que 0!'
            );
            return;
        } 
        if (codLocal.length === 0) {
            Alert.alert(
                'Armazenamento',
                'Local deve ser informado!'
            );
            return;
        }
        if (batismo.length === 0) {
            Alert.alert(
                'Armazenamento',
                'Batismo deve ser informado!'
            );
            return;
        }
        if (lote.length === 0) {
            Alert.alert(
                'Armazenamento',
                'Lote deve ser informado!'
            );
            return;
        }
    }
    validEAN() {
        const { codEAN } = this.props;

        this.props.buscaInfoEan(codEAN);

        this.txtLocal.focus();
    }
    validLocal() {
        this.txtQuantidade.focus();
    }
    validBatismo() {
        this.txtEAN.focus();
    }
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
                            returnKeyType="go"
                            style={styles.input}
                            onChangeText={batismo => this.props.modificaBatismo(batismo)}
                            value={this.props.batismo}
                            ref={(input) => { this.txtBatismo = input; }}
                            onSubmitEditing={() => { this.validBatismo(); }}
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
                            returnKeyType="go"
                            style={styles.input}
                            onChangeText={codEAN => this.props.modificaCodEAN(codEAN)}
                            value={this.props.codEAN}
                            ref={(input) => { this.txtEAN = input; }}
                            onSubmitEditing={() => { this.validEAN(); }}
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
                            multiline
                            numberOfLines={3}
                            style={styles.inputDescricao}
                            onChangeText={desItem => this.props.modificaDesItem(desItem)}
                            value={this.props.desItem}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text 
                            style={[
                                styles.txtLabel
                            ]} 
                        >
                            Localização
                        </Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={[styles.input]}
                            onChangeText={codLocal => this.props.modificaCodLocal(codLocal)}
                            value={this.props.codLocal}
                            ref={(input) => { this.txtLocal = input; }}
                            onSubmitEditing={() => { this.validLocal(); }}
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
                            returnKeyType="go"
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
                        <Button
                            onPress={() => { this.onPressEfetivar(); }}
                            title="Efetivar"
                            color="green"
                        />
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
        lote: state.ArmazenaReducer.lote,
        usuario: state.LoginReducer.usuario
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
        fontSize: 18,
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
    }
});

import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default class FormInventario extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            nrFicha: '', 
            dtInventario: ''
        };
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
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={(nrNotaFis) => this.setState({ nrNotaFis })}
                            value={this.state.nrNotaFis}
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
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={(fornec) => this.setState({ fornec })}
                            value={this.state.fornec}
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
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={(qtTotal) => this.setState({ qtTotal })}
                            value={this.state.qtTotal}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Conferir</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={(qtConferir) => this.setState({ qtConferir })}
                            value={this.state.qtConferir}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 3 }]}>
                        <Text style={styles.txtLabel}>EAN</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={(codEAN) => this.setState({ codEAN })}
                            value={this.state.codEAN}
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
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={(qtItem) => this.setState({ qtItem })}
                            value={this.state.qtItem}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 3 }]}>
                        <Text style={styles.txtLabel}>Localização Padrão</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={(localPad) => this.setState({ localPad })}
                            value={this.state.localPad}
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
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={(codItem) => this.setState({ codItem })}
                            value={this.state.codItem}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 2 }]}>
                        <Text style={styles.txtLabel}>UM</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={(unidMed) => this.setState({ unidMed })}
                            value={this.state.unidMed}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 3 }]}>
                        <Text style={styles.txtLabel}>Batismo</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={(batismo) => this.setState({ batismo })}
                            value={this.state.batismo}
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
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={(descricao) => this.setState({ descricao })}
                            value={this.state.descricao}
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
                        <Text style={styles.txtLabel}>Qtde Etiq</Text>
                        <View style={styles.viewBtEtiq}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={styles.input}
                                onChangeText={(qtEtiq) => this.setState({ qtEtiq })}
                                value={this.state.qtEtiq}
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
        fontSize: 13
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
        flex: 2,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 10
    },
    btSearch: {
        width: 40,
        height: 35,
        padding: 10,
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

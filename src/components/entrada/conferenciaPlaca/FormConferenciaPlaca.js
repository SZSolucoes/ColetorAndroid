import React from 'react';
import { Actions } from 'react-native-router-flux';
import Axios from 'axios';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';

import imgPrinter from '../../../../resources/imgs/zoom_nf.png';
import imgClear from '../../../../resources/imgs/limpa_tela.png';

class FormConferenciaPlaca extends React.PureComponent {
    constructor(props) {
		super(props);
        this.state = { 
            placa: '', 
            numDoc: '',
            serie: '', 
            fornec: '', 
            nomFornec: '',
            natOper: '', 
            volumes: '',
            watingAction: false         
         };
	}
    
    componentDidMount() {
        Actions.refresh({ right: this._renderRightButton });
    }

    clearForm(all) {
        this.setState({
            ...this.state,
            numDoc: '',
            serie: '', 
            fornec: '', 
            nomFornec: '',
            natOper: '', 
            volumes: ''
         });
         if (all) {
            this.setState({placa:''});
         }
    }
    _renderRightButton = () => {
        return (
            <TouchableOpacity 
                onPress={() => this.clearForm(true)}
                style={styles.btClear}
            >
                <Image
                    source={imgClear}
                    style={styles.imgClear}
                />
            </TouchableOpacity>
        );
    }    
    onSelectDoc(item) {
        this.setState({numDoc: item.numDoc, serie: item.serie, fornec: item.fornec, natOper: item.natOper, nomFornec: item.nomFornec },()=>this.volumes.focus());
        
    }    
    onPressZoom() {
        var _this = this;
        
        if (!this.state.placa || this.state.placa == "") {
            Alert.alert(
                'Placa deve ser informada'
            );
            return;
        }
        var params = { params: { placa: this.state.placa}};

        Axios.get('/coletor/getDocInfoByPlate.p', params)
        .then(res => {
            if (res.data.success === 'true') {
                var listaNF = res.data.notas;
                if (listaNF.length > 1) {
                    Actions.formSelecaoNF({ callback: (item) => this.onSelectDoc(item), listaNF: listaNF});
                } else {
                    var item = listaNF[0];
                    this.onSelectDoc(item);
                }
            } else {
                Alert.alert(
                    'Conferência Placa',
                    res.data.message
                );
            }           
        })
        .catch((err) => {
            Alert.alert(
                'Erro Inesperado', err
            );
        });        
    }
    onConferePlaca() {

        this.setState({watingAction: true});
        var params = { 
            numDoc: this.state.numDoc,
            serie: this.state.serie,
            fornec: this.state.fornec,
            natOper: this.state.natOper,
            volumes: this.state.volumes
        };

        Axios.get('/coletor/doCheckVolDoc.p', {params})
        .then(res => {            
            if (res.data.success === 'true') {
                (() => {
                    this.placa.focus();
                    this.clearForm();
                }).call(this)
            }
            Alert.alert(
                'Conferência Placa',
                res.data.message
            ); 
            this.setState({watingAction: false});          
        })
        .catch((err) => {
            Alert.alert(
                'Erro Inesperado', err
            );
            this.setState({watingAction: false});
        });        
    }
    onBlurPlaca(event) {
        if (this.state.prevPlaca != this.state.placa) {
            this.setState({ prevPlaca: this.state.placa });
            this.clearForm();
        }
    }
    renderBtConfirmar() {
        if (this.state.watingAction) {
            return (
                <ActivityIndicator size="large" />
            );
        }

        return (
            <View style={[styles.viewBotao, { flex: 1 }]}>
                <Button
                    onPress={() => { this.onConferePlaca(); }}
                    title="Confirmar"
                    color="green"
                />
            </View>
        );
    }
    render() {        
        return (
            <ScrollView style={styles.viewPrinc}>
                <View style={[styles.viewLinha]}>
                    <View style={[styles.viewCampo, styles.viewSmall]}>
                        <Text style={styles.txtLabel}>Placa</Text>                   
                        <TextInput
                            placeholder=""                           
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={[styles.input]}
                            returnKeyType="go"
                            onChangeText={(placa) => this.setState({placa})}
                            value={this.state.placa}
                            onBlur={(placa) => this.onBlurPlaca(placa)}
                            ref={(input) => { this.placa = input; }}
                        />
                    </View>
                    <TouchableOpacity
                                style={styles.btSearch}
                                onPress={() => { this.onPressZoom(); }}
                            >
                                <Image
                                    source={imgPrinter}
                                    style={styles.imgZoom}
                                />
                            </TouchableOpacity>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, styles.viewSmall]}>
                        <Text style={styles.txtLabel}>Nota Fiscal</Text>                   
                        <TextInput
                            placeholder=""
                            editable={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={styles.input}
                            returnKeyType="go"
                            onChangeText={(numDoc) => this.setState({numDoc})}
                            value={this.state.numDoc}                            
                            ref={(input) => { this.numDoc = input; }}
                        />
                    </View>
                    <View style={[styles.viewCampo, styles.viewSmall]}>
                        <Text style={styles.txtLabel}>Serie</Text>                   
                        <TextInput
                            placeholder=""
                            editable={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={styles.input}
                            returnKeyType="go"
                            onChangeText={(serie) => this.setState({serie})}
                            value={this.state.serie}
                            // onBlur={() => this.props.chave && this.buscaEAN()}
                            ref={(input) => { this.serie = input; }}
                        />
                    </View>
                    <View style={[styles.viewCampo, styles.viewSmall]}>
                        <Text style={styles.txtLabel}>Fornecedor</Text>                   
                        <TextInput
                            placeholder=""
                            editable={false}                            
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={styles.input}
                            returnKeyType="go"
                            onChangeText={(fornec) => this.setState({fornec})}
                            value={this.state.fornec}
                            // onBlur={() => this.props.chave && this.buscaEAN()}
                            ref={(input) => { this.fornec = input; }}
                        />
                    </View>
                    <View style={[styles.viewCampo, styles.viewSmall]}>
                        <Text style={styles.txtLabel}>Natur Oper</Text>                   
                        <TextInput
                            placeholder=""
                            editable={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={styles.input}
                            returnKeyType="go"
                            onChangeText={(natOper) => this.setState({natOper})}
                            value={this.state.natOper}
                            // onBlur={() => this.props.chave && this.buscaEAN()}
                            ref={(input) => { this.natOper = input; }}
                        />
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 5 }]}>
                        <Text style={styles.txtLabel}>Nome Fornecedor</Text>             
                        <TextInput
                            placeholder=""
                            editable={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={styles.inputDescricao}
                            returnKeyType="go"
                            multiline
                            numberOfLines={3}
                            onChangeText={(nomFornec) => this.setState({nomFornec})}
                            value={this.state.nomFornec}
                            // onBlur={() => this.props.chave && this.buscaEAN()}
                            ref={(input) => { this.nomFornec = input; }}
                        />
                    </View>
                </View>
                <View style={[styles.viewLinha]}>
                    <View style={[styles.viewCampo, styles.viewSmall]}>
                        <Text style={styles.txtLabel}>Volumes</Text>                   
                        <TextInput
                            placeholder=""                           
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={[styles.input, {textAlign: 'left'}]}
                            returnKeyType="go"
                            onChangeText={(volumes) => this.setState({volumes})}
                            value={this.state.volumes}
                            // onBlur={() => this.props.chave && this.buscaEAN()}
                            ref={(input) => { this.volumes = input; }}
                        />
                    </View>
                </View>
                
                <View style={styles.viewLinha}>
                    {this.renderBtConfirmar()}
                </View>
            </ScrollView>
        );
    }
}

export default FormConferenciaPlaca;

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1,
        backgroundColor: '#4b86b4'
    },
    viewSmall: {
        width: '25%'
    },
    viewLinha: {
        flexDirection: 'row'
    },
    viewCampo: {
        flexDirection: 'column',        
        paddingHorizontal: 10,
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
    inputSmall: {
        width: 100
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
    },
    imgZoom: {        
        marginTop: 25,
        width: 35,
        height: 35
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

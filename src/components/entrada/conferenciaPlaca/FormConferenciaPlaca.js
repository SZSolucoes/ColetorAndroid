/* eslint-disable max-len */
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
    Alert
} from 'react-native';
import { defaultFormStyles } from '../../utils/Forms';
import LoadingSpin from '../../utils/LoadingSpin';

import imgPrinter from '../../../../resources/imgs/zoom_nf.png';
import imgClear from '../../../../resources/imgs/limpa_tela.png';
import { store } from '../../../App';
import { doAlertWithTimeout } from '../../utils/Alerts';

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
    
    componentDidMount = () => {
        setTimeout(Actions.refresh, 500, { right: this.renderRightButton });
    }

    onBlurPlaca = () => {
        if (this.state.prevPlaca !== this.state.placa) {
            this.setState({ prevPlaca: this.state.placa });
            this.clearForm();
        }
    }

    onChangePlaca = (value) => {
        this.setState({ placa: value });
    }
    onChangeNotaFiscal = (value) => {
        this.setState({ numDoc: value });
    }
    onChangeVolumes = (value) => {
        this.setState({ volumes: value });
    }

    onSelectDoc = (item) => {
        this.setState({ numDoc: item.numDoc, serie: item.serie, fornec: item.fornec, natOper: item.natOper, nomFornec: item.nomFornec }, () => this.volumes.focus());
    }

    onPressZoom = () => {
        if (!this.state.placa || this.state.placa === '') {
            Alert.alert(
                'Placa deve ser informada'
            );
            return;
        }
        const params = { params: { placa: this.state.placa } };

        Axios.get('/coletor/getDocInfoByPlate.p', params)
        .then(res => {
            if (res.data.success === 'true') {
                const listaNF = res.data.notas;
                if (listaNF.length > 1) {
                    Actions.formSelecaoNF({ callback: (item) => this.onSelectDoc(item), listaNF });
                } else {
                    const item = listaNF[0];
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

    onConferePlaca = () => {
        this.setState({ watingAction: true });
        const params = { 
            numDoc: this.state.numDoc,
            serie: this.state.serie,
            fornec: this.state.fornec,
            natOper: this.state.natOper,
            volumes: this.state.volumes
        };

        store.dispatch({ type: 'modifica_visible_loadingspin', payload: true });
        Axios.get('/coletor/doCheckVolDoc.p', { params })
        .then(res => {
            store.dispatch({ type: 'modifica_visible_loadingspin', payload: false });

            if (res.data.success === 'true') {
                (() => {
                    this.placa.focus();
                    this.clearForm();
                }).call(this);
            }
            doAlertWithTimeout(
                'Conferência Placa',
                res.data.message
            ); 
            this.setState({ watingAction: false });
        })
        .catch((err) => {
            store.dispatch({ type: 'modifica_visible_loadingspin', payload: false });
            doAlertWithTimeout(
                'Erro Inesperado', err
            );
            this.setState({ watingAction: false });
        });
    }

    clearForm = (all) => () => {
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
            this.setState({ placa: '' });
         }
    }
    
    renderRightButton = () => (
        <TouchableOpacity 
            onPress={this.clearForm(true)}
            style={styles.btClear}
        >
            <Image
                source={imgClear}
                style={styles.imgClear}
            />
        </TouchableOpacity>
    )  

    renderBtConfirmar = () => (
        <View style={[styles.viewBotao, { flex: 1 }]}>
            <Button
                onPress={this.onConferePlaca}
                title="Confirmar"
                color="green"
            />
        </View>
    )

    render = () => (
        <ScrollView style={styles.viewPrinc}>
            <LoadingSpin />
            <View style={[styles.viewLinha]}>
                <View style={[styles.viewCampo, styles.viewSmall]}>
                    <Text style={styles.txtLabel}>Placa</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""                           
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={[defaultFormStyles.input]}
                            returnKeyType="go"
                            onChangeText={this.onChangePlaca}
                            value={this.state.placa}
                            onBlur={this.onBlurPlaca}
                            ref={(input) => { this.placa = input; }}
                        />
                    </View>                  
                </View>
                <TouchableOpacity
                    style={styles.btSearch}
                    onPress={this.onPressZoom}
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
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            editable={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={defaultFormStyles.input}
                            returnKeyType="go"
                            onChangeText={this.onChangeNotaFiscal}
                            value={this.state.numDoc}                            
                            ref={(input) => { this.numDoc = input; }}
                        />
                    </View>                 
                </View>
                <View style={[styles.viewCampo, styles.viewSmall]}>
                    <Text style={styles.txtLabel}>Serie</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            editable={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={defaultFormStyles.input}
                            returnKeyType="go"
                            value={this.state.serie}
                            ref={(input) => { this.serie = input; }}
                        />
                    </View>                  
                </View>
                <View style={[styles.viewCampo, styles.viewSmall]}>
                    <Text style={styles.txtLabel}>Fornecedor</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            editable={false}                            
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={defaultFormStyles.input}
                            returnKeyType="go"
                            value={this.state.fornec}
                            ref={(input) => { this.fornec = input; }}
                        />
                    </View>                   
                </View>
                <View style={[styles.viewCampo, styles.viewSmall]}>
                    <Text style={styles.txtLabel}>Natur Oper</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            editable={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={defaultFormStyles.input}
                            returnKeyType="go"
                            value={this.state.natOper}
                            ref={(input) => { this.natOper = input; }}
                        />
                    </View>                   
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
                        style={defaultFormStyles.inputDescricao}
                        returnKeyType="go"
                        multiline
                        numberOfLines={3}
                        value={this.state.nomFornec}
                        ref={(input) => { this.nomFornec = input; }}
                    />
                </View>
            </View>
            <View style={[styles.viewLinha]}>
                <View style={[styles.viewCampo, styles.viewSmall]}>
                    <Text style={styles.txtLabel}>Volumes</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""                           
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            style={defaultFormStyles.input}
                            returnKeyType="go"
                            onChangeText={this.onChangeVolumes}
                            value={this.state.volumes}
                            ref={(input) => { this.volumes = input; }}
                        />
                    </View>                  
                </View>
            </View>
            
            <View style={styles.viewLinha}>
                {this.renderBtConfirmar()}
            </View>
        </ScrollView>
    )
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

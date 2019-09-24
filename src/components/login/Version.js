import React from 'react';
import { 
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    AsyncStorage,
    Picker,
    Platform
} from 'react-native';

import { connect } from 'react-redux';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import { 
    modificaConexao, 
    modificaServico,
    modificaVersao,
    verificaConexao,
    verificaServico,
    iniciaTela,
    modificaModalVisible,
    modificaAmbiente,
    modificaEmpresa,
    modificaInputSelected,
    modificaModalOptions
} from '../../actions/VersionActions';
import { doChangeUrlService } from '../utils/AxiosAux';
import { defaultFormStyles } from '../utils/Forms';

import imgSeta from '../../../resources/imgs/seta.png';

class Version extends React.PureComponent {
    componentDidMount = () => {
        this.props.iniciaTela();

        const version = '1.6.1';
        
        this.props.modificaVersao(version);
        this.props.verificaConexao();
        this.props.verificaServico();
    }

    onCancelModalFilter = () => {
        this.props.modificaModalVisible(false);
    }

    onShowModal = (input) => () => {
        const optionsAmbiente = [
            {
                key: '1',
                label: 'Produção',
            },
            {
                key: '2',
                label: 'Homologação',
            },
            {
                key: '3',
                label: 'Unificado'
            },
            {
                key: '4',
                label: 'Unificado Teste'
            }
        ];
        const optionsEmpresa = [
            {
                key: '1',
                label: 'Centelha',
            },
            {
                key: '2',
                label: 'DW',
            }
        ];

        switch (input) {
            case 'ambiente':
                this.props.modificaModalOptions(optionsAmbiente);
                this.props.modificaInputSelected('ambiente');
                break;
            case 'empresa':
                this.props.modificaModalOptions(optionsEmpresa);
                this.props.modificaInputSelected('empresa');
                break;
            default:
        }

        this.props.modificaModalVisible(true);
    }

    onSelectPicker = (picker) => (value) => {
        let empresa = '';
        let ambiente = ''; 
        switch (picker) {
            case 'ambiente':
                ambiente = value;
                empresa = this.props.empresa;
                AsyncStorage.setItem('ambiente', value);
                AsyncStorage.setItem('empresa', empresa);
                this.props.modificaAmbiente(value, ambiente);
                break;
            case 'empresa':
                empresa = value;
                ambiente = this.props.ambiente;
                AsyncStorage.setItem('empresa', value);
                AsyncStorage.setItem('ambiente', ambiente);
                this.props.modificaEmpresa(value, empresa);
                break;
            default:     
        }

        this.setUrlService(empresa, ambiente);
    }

    onSelectModal = (value) => {
        let empresa = '';
        let ambiente = ''; 
        switch (this.props.inputSelected) {
            case 'ambiente':
                ambiente = value;
                empresa = this.props.empresa;
                AsyncStorage.setItem('ambiente', value);
                AsyncStorage.setItem('empresa', empresa);
                this.props.modificaAmbiente(value, ambiente);
                break;
            case 'empresa':
                empresa = value;
                ambiente = this.props.ambiente;
                AsyncStorage.setItem('empresa', value);
                AsyncStorage.setItem('ambiente', ambiente);
                this.props.modificaEmpresa(value, empresa);
                break;
            default:     
        }

        this.setUrlService(empresa, ambiente);   
    }

    setUrlService = (empresa, ambiente) => {
        doChangeUrlService(empresa, ambiente); // Atualiza a baseURL com base na empresa e ambiente
        this.props.verificaConexao();
        this.props.verificaServico();
    }

    renderForWindows = () => (
        <View>
            <View style={[styles.viewLinha, { marginTop: 15 }]}>
                <View style={{ flex: 1 }}>
                    <Text 
                        style={[styles.txtInfo]}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        Empresa:
                    </Text>
                </View>
                <Picker
                    selectedValue={this.props.empresa}
                    style={{ flex: 2, height: 50, width: 100, marginHorizontal: 10 }}
                    onValueChange={this.onSelectPicker('empresa')} 
                >
                    <Picker.Item label='Centelha' value='1' />
                    <Picker.Item label='DW' value='2' />
                </Picker>
            </View>
            <View style={[styles.viewLinha, { marginTop: 10 }]}>
                <View style={{ flex: 1 }}>    
                    <Text 
                        style={[styles.txtInfo]}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        Ambiente:
                    </Text>
                </View>
                <Picker
                    selectedValue={this.props.ambiente}
                    style={{ flex: 2, height: 50, width: 100, marginHorizontal: 10 }}
                    onValueChange={this.onSelectPicker('ambiente')} 
                >
                    <Picker.Item label='Produção' value='1' />
                    <Picker.Item label='Homologação' value='2' />
                    <Picker.Item label='Unificado' value='3' />
                    <Picker.Item label='Unificado Teste' value='4' />
                </Picker>
            </View>
        </View>
    )
    
    render = () => (
        <ScrollView style={styles.viewPrinc}>
            <View style={styles.viewLinha}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.txtInfo}>Versão App: {this.props.versao}</Text>
                </View>
            </View>
            <View style={styles.viewLinha}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.txtInfo}>Conexão: {this.props.conexao}</Text>
                </View>
            </View>
            <View style={styles.viewLinha}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.txtInfo}>Serviço: {this.props.servico}</Text>
                </View>
            </View>
            { Platform.OS !== 'windows' ? (
                <View>
                    <View style={[styles.viewLinha, { marginTop: 15 }]}>
                        <View style={{ flex: 1 }}>
                            <Text 
                                style={[styles.txtInfo]}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                            >
                                Empresa:
                            </Text>
                        </View>
                        <TouchableOpacity 
                            onPress={this.onShowModal('empresa')}
                            style={{ flexDirection: 'row', flex: 2 }}
                        >
                            <View style={[defaultFormStyles.inputView, { flex: 1 }]}>
                                <TextInput
                                    placeholder=''
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    editable={false}
                                    placeholderTextColor='rgba(255,255,255,0.7)'
                                    returnKeyType='next'
                                    style={defaultFormStyles.input}
                                    value={this.props.desEmpresa}
                                />
                            </View>
                            <Image
                                source={imgSeta}
                                style={styles.imgSeta}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.viewLinha, { marginTop: 10 }]}>
                        <View style={{ flex: 1 }}>    
                            <Text 
                                style={[styles.txtInfo]}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                            >
                                Ambiente:
                            </Text>
                        </View>
                        <TouchableOpacity 
                            onPress={this.onShowModal('ambiente')}
                            style={{ flexDirection: 'row', flex: 2 }}
                        >
                            <View style={[defaultFormStyles.inputView, { flex: 1 }]}>
                                <TextInput
                                    placeholder=''
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    editable={false}
                                    placeholderTextColor='rgba(255,255,255,0.7)'
                                    returnKeyType='next'
                                    style={defaultFormStyles.input}
                                    value={this.props.desAmbiente}
                                />
                            </View>
                            <Image
                                source={imgSeta}
                                style={styles.imgSeta}
                            />
                        </TouchableOpacity>
                    </View>
                    <ModalFilterPicker
                        placeholderText='Filtro...'
                        cancelButtonText='Cancelar'
                        noResultsText='Não encontrado'
                        visible={this.props.modalVisible}
                        onSelect={this.onSelectModal}
                        onCancel={this.onCancelModalFilter}
                        options={this.props.modalOptions}
                    />
                </View>
            ) : (
                this.renderForWindows()
            ) }
        </ScrollView>
    )
}

const mapStateToProps = state => (
    {
        versao: state.VersionReducer.versao,
        servico: state.VersionReducer.servico,
        conexao: state.VersionReducer.conexao,
        ambiente: state.VersionReducer.ambiente,
        desAmbiente: state.VersionReducer.desAmbiente,
        modalVisible: state.VersionReducer.modalVisible,
        modalOptions: state.VersionReducer.modalOptions,
        empresa: state.VersionReducer.empresa,
        desEmpresa: state.VersionReducer.desEmpresa,
        inputSelected: state.VersionReducer.inputSelected
    }
);

export default connect(mapStateToProps, { 
    modificaConexao, 
    modificaServico,
    modificaVersao,
    verificaConexao,
    verificaServico,
    iniciaTela,
    modificaAmbiente,
    modificaModalVisible,
    modificaEmpresa,
    modificaInputSelected,
    modificaModalOptions
})(Version);

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1,
        backgroundColor: '#4b86b4'
    },
    viewLinha: {
        flexDirection: 'row'
    },
    txtInfo: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'left',
        paddingHorizontal: 10,
        marginTop: 10,
        fontSize: 16
        //marginBottom: 5
    },
    imgSeta: {
        width: 35,
        height: 35
    }
});

import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    AsyncStorage
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

import imgSeta from '../../../resources/imgs/seta.png';

class Version extends Component {

    constructor(props) {
        super(props);

        this.onShowModal = this.onShowModal.bind(this);
        this.onSelectModal = this.onSelectModal.bind(this);
    }

    componentDidMount() {
        this.props.iniciaTela();

        const version = '1.1.4';
        
        this.props.modificaVersao(version);
        this.props.verificaConexao();
        this.props.verificaServico();
    }

    onShowModal(input) {   
        const optionsAmbiente = [
            {
                key: '1',
                label: 'Produção',
            },
            {
                key: '2',
                label: 'Homologação',
            }];
        const optionsEmpresa = [
            {
                key: '1',
                label: 'Centelha',
            },
            {
                key: '2',
                label: 'DW',
            }];

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

    onSelectModal(value) { 
        switch (this.props.inputSelected) {
            case 'ambiente':
                AsyncStorage.setItem('ambiente', value);
                this.props.modificaAmbiente(value);
                break;
            case 'empresa':
                AsyncStorage.setItem('empresa', value);
                this.props.modificaEmpresa(value);
                break;
            default:     
        }
        this.setUrlService();   
    }

    setUrlService() {
        const { empresa, ambiente } = this.props;
        doChangeUrlService(empresa, ambiente); // Atualiza a baseURL com base na empresa e ambiente
        this.props.verificaConexao();
        this.props.verificaServico();
    }
    
    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <View style={styles.viewLinha}>
                    <Text style={styles.txtInfo}>Versão App: {this.props.versao}</Text>
                </View>
                <View style={styles.viewLinha}>
                    <Text style={styles.txtInfo}>Conexão: {this.props.conexao}</Text>
                </View>
                <View style={styles.viewLinha}>
                    <Text style={styles.txtInfo}>Serviço: {this.props.servico}</Text>
                </View>
                <View style={[styles.viewLinha, { marginTop: 10 }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.txtInfo]}>Empresa</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={() => this.onShowModal('empresa')}
                        style={{ flexDirection: 'row', flex: 3 }}
                    >
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={[styles.input, { flex: 1 }]}
                            value={this.props.desEmpresa}
                        />
                        <Image
                            source={imgSeta}
                            style={styles.imgSeta}
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.viewLinha, { marginTop: 10 }]}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.txtInfo]}>Ambiente</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={() => this.onShowModal('ambiente')}
                        style={{ flexDirection: 'row', flex: 3 }}
                    >
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={[styles.input, { flex: 1 }]}
                            value={this.props.desAmbiente}
                        />
                        <Image
                            source={imgSeta}
                            style={styles.imgSeta}
                        />
                    </TouchableOpacity>
                </View>
                <ModalFilterPicker
                    placeholderText="Filtro..."
                    cancelButtonText="Cancelar"
                    noResultsText="Não encontrado"
                    visible={this.props.modalVisible}
                    onSelect={this.onSelectModal}
                    onCancel={() => this.props.modificaModalVisible(false)}
                    options={this.props.modalOptions}
                />
            </ScrollView>
        );
    }
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
        textAlign: 'center',
        paddingHorizontal: 10,
        marginTop: 10,
        fontSize: 16
        //marginBottom: 5
    },
    imgSeta: {
        width: 35,
        height: 35
    },
    input: {
        height: 35,
        fontSize: 14,
        textAlign: 'center',
        backgroundColor: '#20293F',
        color: 'white',
        fontFamily: 'sans-serif-medium',
		borderRadius: 10
    }
});

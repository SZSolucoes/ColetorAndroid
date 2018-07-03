import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image
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
    modificaAmbiente
} from '../../actions/VersionActions';

import imgSeta from '../../../resources/imgs/seta.png';

class Version extends Component {
    componentWillMount() {
        this.props.iniciaTela();

        const version = '1.1.2';
        
        this.props.modificaVersao(version);
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
                <View style={styles.viewLinha}>
                    <Text style={[styles.txtInfo]}>Ambiente</Text>
                    <TouchableOpacity 
                        onPress={() => this.props.modificaModalVisible(true)}
                        style={{ flexDirection: 'row', flex: 1 }}
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
                    onSelect={this.props.modificaAmbiente}
                    onCancel={() => this.props.modificaModalVisible(false)}
                    options={[
                        {
                            key: '1',
                            label: 'Produção',
                        },
                        {
                            key: '2',
                            label: 'Homologação',
                        }]}
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
        modalVisible: state.VersionReducer.modalVisible
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
    modificaModalVisible
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

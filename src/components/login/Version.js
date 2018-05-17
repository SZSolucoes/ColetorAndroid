import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    Text,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import { 
    modificaConexao, 
    modificaServico,
    modificaVersao,
    verificaConexao,
    verificaServico,
    iniciaTela
} from '../../actions/VersionActions';

class Version extends Component {
    componentWillMount() {
        this.props.iniciaTela();

        const version = '1.0.1 (Homologação)';
        
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
            </ScrollView>
        );
    }
}

const mapStateToProps = state => (
    {
        versao: state.VersionReducer.versao,
        servico: state.VersionReducer.servico,
        conexao: state.VersionReducer.conexao
    }
);

export default connect(mapStateToProps, { 
    modificaConexao, 
    modificaServico,
    modificaVersao,
    verificaConexao,
    verificaServico,
    iniciaTela
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
    } 
});

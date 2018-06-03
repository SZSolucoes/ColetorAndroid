import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    Button,
    TextInput
} from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import { 
    modificaLoteVisible,
    modificaLote,
    modificaValidLote,
    modificaQtLote

} from '../../../actions/ConfereActions';

class LoteConferencia extends Component {
    salvarLote = () => {
        this.props.modificaLoteVisible(false);
    }
    render() {
        return (
            <Modal isVisible={this.props.isLoteVisible}>
                <View style={styles.modalContent}>
                    <View style={styles.viewLinha}>
                        <View style={[styles.viewCampo, { flex: 1 }]}>
                            <Text style={styles.txtLabel}>Lote</Text>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={styles.input}
                                onChangeText={lote => this.props.modificaLote(lote)}
                                value={this.props.lote}
                                ref={(input) => { this.lote = input; }}
                                onSubmitEditing={() => { this.validade.focus(); }}
                            />
                        </View>
                    </View>
                    <View style={styles.viewLinha}>
                        <View style={[styles.viewCampo, { flex: 1 }]}>
                            <Text style={styles.txtLabel}>Validade</Text>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={styles.input}
                                onChangeText={validade => this.props.modificaValidLote(validade)}
                                value={this.props.validLote}
                                ref={(input) => { this.validade = input; }}
                                onSubmitEditing={() => { this.quantidade.focus(); }}
                            />
                        </View>
                    </View>
                    <View style={styles.viewLinha}>
                        <View style={[styles.viewCampo, { flex: 1 }]}>
                            <Text style={styles.txtLabel}>Quantidade</Text>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="go"
                                style={styles.input}
                                onChangeText={quantidade => this.props.modificaQtLote(quantidade)}
                                value={this.props.qtLote}
                                ref={(input) => { this.quantidade = input; }}
                                onSubmitEditing={(this.salvarLote)}
                            />
                        </View>
                    </View>
                    <View style={{ padding: 5 }}>
                        <Button
                            onPress={(this.salvarLote)}
                            title="Salvar"
                            color="green"
                        />
                    </View>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return (
        {
            isLoteVisible: state.ConfereReducer.isLoteVisible,
            lote: state.ConfereReducer.lote,
            validLote: state.ConfereReducer.validLote,
            qtLote: state.ConfereReducer.qtLote
        }
    );
};

export default connect(mapStateToProps, 
    { 
        modificaLoteVisible,
        modificaLote,
        modificaValidLote,
        modificaQtLote
    }
)(LoteConferencia);

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: '#4b86b4',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
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
        fontFamily: 'sans-serif-medium',
        fontSize: 13
    },
    input: {
        height: 35,
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: '#20293F',
        color: 'white',
        fontFamily: 'sans-serif-medium',
		borderRadius: 10
    }
});

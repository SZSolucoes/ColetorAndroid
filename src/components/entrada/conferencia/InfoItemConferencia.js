import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    Button,
    TextInput,
    Alert
} from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import _ from 'lodash';
import { 
    modificaInfoVisible,
    modificaPesoItem,
    modificaAlturaItem,
    modificaLarguraItem,
    modificaComprimentoItem
} from '../../../actions/ConfereActions';

class InfoItemConferencia extends Component {
    salvarInfoItem = () => {
        const { pesoItem } = this.props;

        if (pesoItem) {
            if (_.toInteger(pesoItem) <= 0) {
                Alert.alert(
                    'Conferência',
                    'Peso deve ser informado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Conferência',
                'Peso deve ser informado!'
            );
            return;
        }

        this.props.modificaInfoVisible(false);
    }
    render() {
        return (
            <Modal isVisible={this.props.isInfoVisible}>
                <View style={styles.modalContent}>
                    <View style={styles.viewLinha}>
                        <View style={[styles.viewCampo, { flex: 1 }]}>
                            <Text style={styles.txtLabel}>Peso</Text>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={styles.input}
                                onChangeText={pesoItem => this.props.modificaPesoItem(pesoItem)}
                                value={this.props.pesoItem}
                                ref={(input) => { this.pesoItem = input; }}
                                onSubmitEditing={() => { this.alturaItem.focus(); }}
                            />
                        </View>
                    </View>
                    <View style={styles.viewLinha}>
                        <View style={[styles.viewCampo, { flex: 1 }]}>
                            <Text style={styles.txtLabel}>Altura</Text>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={styles.input}
                                onChangeText={alturaItem => this.props.modificaAlturaItem(alturaItem)}
                                value={this.props.altura}
                                ref={(input) => { this.alturaItem = input; }}
                                onSubmitEditing={() => { this.larguraItem.focus(); }}
                            />
                        </View>
                    </View>
                    <View style={styles.viewLinha}>
                        <View style={[styles.viewCampo, { flex: 1 }]}>
                            <Text style={styles.txtLabel}>Largura</Text>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={styles.input}
                                onChangeText={larguraItem => this.props.modificaLarguraItem(larguraItem)}
                                value={this.props.largura}
                                ref={(input) => { this.larguraItem = input; }}
                                onSubmitEditing={() => { this.comprimentoItem.focus(); }}
                            />
                        </View>
                    </View>
                    <View style={styles.viewLinha}>
                        <View style={[styles.viewCampo, { flex: 1 }]}>
                            <Text style={styles.txtLabel}>Comprimento</Text>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={styles.input}
                                onChangeText={comprimentoItem => this.props.modificaComprimentoItem(comprimentoItem)}
                                value={this.props.comprimento}
                                ref={(input) => { this.comprimentoItem = input; }}
                                onSubmitEditing={(this.salvarInfoItem)}
                            />
                        </View>
                    </View>
                    <View style={{ padding: 5 }}>
                        <Button
                            onPress={(this.salvarInfoItem)}
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
            isInfoVisible: state.ConfereReducer.isInfoVisible,
            pesoItem: state.ConfereReducer.pesoItem,
            altura: state.ConfereReducer.altura,
            comprimento: state.ConfereReducer.comprimento,
            largura: state.ConfereReducer.largura
        }
    );
};

export default connect(mapStateToProps, 
    { 
        modificaInfoVisible,
        modificaPesoItem,
        modificaAlturaItem,
        modificaLarguraItem,
        modificaComprimentoItem
    }
)(InfoItemConferencia);

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

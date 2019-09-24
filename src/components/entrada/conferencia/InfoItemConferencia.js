import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    Button,
    TextInput,
    Alert,
    Keyboard
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
import { defaultFormStyles } from '../../utils/Forms';

class InfoItemConferencia extends React.PureComponent {
    onBlurComprimento = () => {
        if (this.props.comprimento) this.salvarInfoItem();
    }
    
    onChangePeso = (value) => {
        this.props.modificaPesoItem(value);
    }
    onChangeAltura = (value) => {
        this.props.modificaAlturaItem(value);
    }
    onChangeLargura = (value) => {
        this.props.modificaLarguraItem(value);
    }
    onChangeComprimento = (value) => {
        this.props.modificaComprimentoItem(value);
    }

    onSubmitEditingPeso = () => {
        this.alturaItem.focus();
    }
    onSubmitEditingAltura = () => {
        this.larguraItem.focus();
    }
    onSubmitEditingLargura = () => {
        this.comprimentoItem.focus();
    }

    salvarInfoItem = () => {
        const { pesoItem } = this.props;

        Keyboard.dismiss();

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
    
    render = () => (
        <Modal isVisible={this.props.isInfoVisible}>
            <View style={styles.modalContent}>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Peso</Text>
                        <View style={defaultFormStyles.inputView}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={defaultFormStyles.input}
                                onChangeText={this.onChangePeso}
                                value={this.props.pesoItem}
                                ref={(input) => { this.pesoItem = input; }}
                                onSubmitEditing={this.onSubmitEditingPeso}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Altura</Text>
                        <View style={defaultFormStyles.inputView}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={defaultFormStyles.input}
                                onChangeText={this.onChangeAltura}
                                value={this.props.altura}
                                ref={(input) => { this.alturaItem = input; }}
                                onSubmitEditing={this.onSubmitEditingAltura}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Largura</Text>
                        <View style={defaultFormStyles.inputView}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={defaultFormStyles.input}
                                onChangeText={this.onChangeLargura}
                                value={this.props.largura}
                                ref={(input) => { this.larguraItem = input; }}
                                onSubmitEditing={this.onSubmitEditingLargura}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Comprimento</Text>
                        <View style={defaultFormStyles.inputView}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={defaultFormStyles.input}
                                onChangeText={this.onChangeComprimento}
                                value={this.props.comprimento}
                                ref={(input) => { this.comprimentoItem = input; }}
                                onBlur={this.onBlurComprimento}
                            />
                        </View>
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
    )
}

const mapStateToProps = state => (
        {
            isInfoVisible: state.ConfereReducer.isInfoVisible,
            pesoItem: state.ConfereReducer.pesoItem,
            altura: state.ConfereReducer.altura,
            comprimento: state.ConfereReducer.comprimento,
            largura: state.ConfereReducer.largura
        }
);

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
    }
});

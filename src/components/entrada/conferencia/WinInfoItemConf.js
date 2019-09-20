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
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { 
    modificaInfoVisible,
    modificaPesoItem,
    modificaAlturaItem,
    modificaLarguraItem,
    modificaComprimentoItem
} from '../../../actions/ConfereActions';
import { defaultFormStyles } from '../../utils/Forms';

class WinInfoItemConf extends React.PureComponent {
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

        Actions.pop();
    }
    render() {
        return (
            <View style={styles.viewPrincip}>
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
                                onChangeText={pesoItem => this.props.modificaPesoItem(pesoItem)}
                                value={this.props.pesoItem}
                                ref={(input) => { this.pesoItem = input; }}
                                onSubmitEditing={() => { this.alturaItem.focus(); }}
                            />
                        </View>
                    </View>
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
                                onChangeText={
                                    alturaItem => 
                                    this.props.modificaAlturaItem(alturaItem)
                                }
                                value={this.props.altura}
                                ref={(input) => { this.alturaItem = input; }}
                                onSubmitEditing={() => { this.larguraItem.focus(); }}
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
                                onChangeText={
                                    larguraItem => 
                                    this.props.modificaLarguraItem(larguraItem)
                                }
                                value={this.props.largura}
                                ref={(input) => { this.larguraItem = input; }}
                                onSubmitEditing={() => { this.comprimentoItem.focus(); }}
                            />
                        </View>
                    </View>
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
                                onChangeText={
                                    comprimentoItem => 
                                    this.props.modificaComprimentoItem(comprimentoItem)
                                }
                                value={this.props.comprimento}
                                ref={(input) => { this.comprimentoItem = input; }}
                                onBlur={() => this.props.comprimento && this.salvarInfoItem()}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 40, paddingHorizontal: 15 }}>
                    <View style={{ width: 150 }}>
                        <Button
                            onPress={(this.salvarInfoItem)}
                            title="Salvar"
                            color="black"
                        />
                    </View>
                </View>
            </View>
        );
    }
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
)(WinInfoItemConf);

const styles = StyleSheet.create({
    viewPrincip: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#4b86b4',
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

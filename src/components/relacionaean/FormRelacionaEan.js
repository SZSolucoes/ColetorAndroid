import React from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    Alert,
    Keyboard
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import FormRow from '../utils/FormRow';
import { 
    modificaCodEan,
    modificaCodItem,
    cleanRelEanReducer,
    doConfirm
} from '../../actions/RelEanActions';
import { defaultFormStyles } from '../utils/Forms';

import imgClear from '../../../resources/imgs/limpa_tela.png';

class FormDespacho extends React.PureComponent {
    componentDidMount() {
        setTimeout(Actions.refresh, 500, { right: this._renderRightButton });
    }
    componentWillUnmount() {
        this.props.cleanRelEanReducer();
    }

    onBlurItem = () => {
        if (this.props.codItem) this.confirmButton();
    }

    onChangeEan = (value) => {
        this.props.modificaCodEan(value);
    }
    onChangeItem = (value) => {
        this.props.modificaCodItem(value);
    }

    onSubmitEditingEan = () => {
        this.txtItem.focus();
    }

    limpaTela() {
        this.props.cleanRelEanReducer();
    }
    _renderRightButton = () => {
        return (
            <TouchableOpacity 
                onPress={this.limpaTela}
                style={styles.btClear}
            >
                <Image
                    source={imgClear}
                    style={styles.imgClear}
                />
            </TouchableOpacity>
        );
    }
    confirmButton() {
        const { codEAN, codItem } = this.props;

        Keyboard.dismiss();

        if (codEAN) {
            if (codEAN.length === 0) {
                Alert.alert(
                    'Relaciona EAN',
                    'EAN deve ser informado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Relaciona EAN',
                'EAN deve ser informado!'
            );
            return;
        }

        if (codItem) {
            if (codItem.length === 0) {
                Alert.alert(
                    'Relaciona EAN',
                    'Código Item deve ser informado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Relaciona EAN',
                'Código Item deve ser informado!'
            );
            return;
        }

        const propparams = {
            codEAN,
            codItem
        }; 
        
        this.props.doConfirm(propparams);     
    }
    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>EAN</Text>
                        <View style={defaultFormStyles.inputView}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={defaultFormStyles.input}
                                value={this.props.codEAN}
                                onChangeText={this.onChangeEan}
                                ref={(input) => { this.txtEAN = input; }}
                                onSubmitEditing={this.onSubmitEditingEan}
                            />
                        </View>
                    </View>
                </FormRow>
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Item</Text>
                        <View style={defaultFormStyles.inputView}>
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="go"
                                style={defaultFormStyles.input}
                                value={this.props.codItem}
                                onChangeText={this.onChangeItem}
                                ref={(input) => { this.txtItem = input; }}
                                onBlur={this.onBlurItem}
                            />
                        </View>
                    </View>
                </FormRow>
                <FormRow> 
                    <View style={styles.viewBotao} >
                        <Button
                            onPress={this.confirmButton}
                            title="Confirmar"
                            color="green"
                        />      
                    </View>
                </FormRow>
                <View style={{ marginBottom: 50 }} />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    const maps = (
        {
             codEAN: state.RelEanReducer.codEAN,
             codItem: state.RelEanReducer.codItem
        }
    );

    return maps;
};

export default connect(mapStateToProps, { 
    modificaCodEan,
    modificaCodItem,
    cleanRelEanReducer,
    doConfirm
})(FormDespacho);

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1,
        backgroundColor: '#4b86b4'
    },
    txtLabel: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'sans-serif-medium',
        fontSize: 13
    },
    viewBotao: {
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 10
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

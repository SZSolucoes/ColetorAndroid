import React from 'react';
import { 
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ConsultaNFList from './ConsultaNFList';
import { 
    modificaCodNF, 
    buscaItemsNF,
    modificaClean 
} from '../../../actions/ConsultaNFActions';
import { defaultFormStyles } from '../../utils/Forms';

import imgClear from '../../../../resources/imgs/limpa_tela.png';

class ConsultaNFForm extends React.PureComponent {
    componentDidMount = () => {
        setTimeout(Actions.refresh, 500, { right: this.renderRightButton });
    }

    componentWillUnmount = () => {
        this.props.modificaClean();
    }

    onBlurNotaFiscal = () => {
        if (this.props.codNF) this.carregaItemNF();
    }

    changeCodNF = (value) => {
        this.props.modificaCodNF(value);
    }

    carregaItemNF = () => {
        const { usuario, codNF } = this.props;

        Keyboard.dismiss();

        this.props.buscaItemsNF(usuario, codNF);
    }

    clearFields = () => {
        this.props.modificaClean();
    }

    renderRightButton = () => (
        <TouchableOpacity 
            onPress={this.clearFields}
            style={styles.btClear}
        >
            <Image
                source={imgClear}
                style={styles.imgClear}
            />
        </TouchableOpacity>
    )
     
    render = () => (
        <ScrollView style={styles.viewPrinc}>
            <View style={styles.viewLinha}>
                <View style={[styles.viewCampo, { flex: 2 }]}>
                    <Text style={styles.txtLabel}>Nota Fiscal</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={defaultFormStyles.input}
                            onChangeText={this.changeCodNF}
                            value={this.props.codNF}
                            ref={(input) => { this.nrNotaFis = input; }}
                            onBlur={this.onBlurNotaFiscal}
                        />
                    </View>
                </View>
            </View>
            <View style={{ padding: 5 }} >
                <ConsultaNFList />
            </View>
        </ScrollView>
    )
}

const mapStateToProps = (state) => (
    {
        codNF: state.ConsultaNFReducer.codNF,
        usuario: state.LoginReducer.usuario
    }
);

export default connect(mapStateToProps, { 
    modificaCodNF,
    buscaItemsNF,
    modificaClean
})(ConsultaNFForm);

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1,
        backgroundColor: '#4b86b4'
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
    btClear: {
        width: 40,
        height: 35
    },
    imgClear: {
        width: 35,
        height: 35
    }
});

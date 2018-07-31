import React, { Component } from 'react';
import { 
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ConsultaNFList from './ConsultaNFList';
import { 
    modificaCodNF, 
    buscaItemsNF,
    modificaClean 
} from '../../../actions/ConsultaNFActions';

import imgClear from '../../../../resources/imgs/limpa_tela.png';

class ConsultaNFForm extends Component {

    constructor(props) {
        super(props);

        this.changeCodNF = this.changeCodNF.bind(this);
        this.carregaItemNF = this.carregaItemNF.bind(this);
        this.renderRightButton = this.renderRightButton.bind(this);
        this.clearFields = this.clearFields.bind(this);
    }

    componentDidMount() {
        Actions.refresh({ right: this.renderRightButton });
    }

    componentWillUnmount() {
        this.props.modificaClean();
    }

    changeCodNF(value) {
        this.props.modificaCodNF(value);
    }

    carregaItemNF() {
        const { usuario, codNF } = this.props;
        this.props.buscaItemsNF(usuario, codNF);
    }

    clearFields() {
        this.props.modificaClean();
    }

    renderRightButton() {
        return (
            <TouchableOpacity 
                onPress={() => this.clearFields()}
                style={styles.btClear}
            >
                <Image
                    source={imgClear}
                    style={styles.imgClear}
                />
            </TouchableOpacity>
        );
    }
     
    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 2 }]}>
                        <Text style={styles.txtLabel}>Nota Fiscal</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            onChangeText={nrNotaFis => this.changeCodNF(nrNotaFis)}
                            value={this.props.codNF}
                            ref={(input) => { this.nrNotaFis = input; }}
                            onSubmitEditing={() => this.carregaItemNF()}
                        />
                    </View>
                </View>
                <View style={{ padding: 5 }} >
                    <ConsultaNFList />
                </View>
            </ScrollView>
        );
    }
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
    input: {
        height: 35,
        fontSize: 14,
        textAlign: 'center',
        backgroundColor: '#20293F',
        color: 'white',
        fontFamily: 'sans-serif-medium',
		borderRadius: 10
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

import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import FormRow from '../../utils/FormRow';
import ListaItemConsEtiqBat from './ListaItemConsEtiqBat';
import {
    modificaBatismo,
    modificaClean,
    doConsBatismo
} from '../../../actions/ConsEtiqBatSaidaActions';
import LoadingSpin from '../../utils/LoadingSpin';
import imgClear from '../../../../resources/imgs/limpa_tela.png'; 

class FormConsultaEtiqBatismo extends Component {

    constructor(props) {
        super(props);

        this.fieldsChanged = {
            etiqueta: false
        };

        this.onBlurEtiqueta = this.onBlurEtiqueta.bind(this);
        this.renderRightButtonBar = this.renderRightButtonBar.bind(this);
    }

    componentDidMount() {
        Actions.refresh({ right: this.renderRightButtonBar });
    }

    componentWillUnmount() {
        this.props.modificaClean();
    }

    onBlurEtiqueta() {
        const { etiqueta } = this.props;

        this.props.doConsBatismo({ etiqueta });
    }

    renderRightButtonBar() {
        return (
            <TouchableOpacity 
                onPress={() => this.props.modificaClean()}
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
                { Platform.OS !== 'windows' && <LoadingSpin /> }
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Batismo</Text>
                        <TextInput
                            selectTextOnFocus
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.etiqueta}
                            onChangeText={value => {
                                this.fieldsChanged.etiqueta = true; 
                                this.props.modificaBatismo(value); 
                            }}
                            onBlur={() => { 
                                if (this.props.etiqueta && this.fieldsChanged.etiqueta) {
                                    this.fieldsChanged.etiqueta = false;
                                    this.onBlurEtiqueta();
                                } 
                            }}
                        />
                    </View>
                </FormRow>
                <View style={{ padding: 5 }}>
                    <ListaItemConsEtiqBat />
                </View>
                <View style={{ marginBottom: 50 }} />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    etiqueta: state.ConsEtiqBatSaidaReducer.etiqueta
});

export default connect(mapStateToProps, {
    modificaBatismo,
    modificaClean,
    doConsBatismo
})(FormConsultaEtiqBatismo);

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

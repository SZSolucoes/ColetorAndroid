import React from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard,
    Platform
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import FormRow from '../../utils/FormRow';
import ListaItemConsEtiqBat from './ListaItemConsBat';

import {
    modificaBatismo,
    modificaClean,
    doConsBatismo
} from '../../../actions/ConsEtiqBatEntradaActions';
import LoadingSpin from '../../utils/LoadingSpin';
import { defaultFormStyles } from '../../utils/Forms';

import imgClear from '../../../../resources/imgs/limpa_tela.png';

class FormConsultaBatismo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onBlurCodEtiqBatismo = this.onBlurCodEtiqBatismo.bind(this);
        this.renderRightButtonBar = this.renderRightButtonBar.bind(this);

        this.fieldsChanged = {
            codEtiqBatismo: false
        };
    }

    componentDidMount() {
        setTimeout(Actions.refresh, 500, { right: this.renderRightButtonBar });
    }
    
    componentWillUnmount() {
        this.props.modificaClean();
    }

    onBlurCodEtiqBatismo() {
        const codEtiqBatismo = this.props.codEtiqBatismo;

        Keyboard.dismiss();

        this.props.doConsBatismo(codEtiqBatismo);
    }

    onBlurBatismo = () => {
        if (this.props.codEtiqBatismo && 
            this.fieldsChanged.codEtiqBatismo) {
            this.fieldsChanged.codEtiqBatismo = false;
            this.onBlurCodEtiqBatismo();
        }
    }

    onChangeBatismo = (value) => {
        this.fieldsChanged.codEtiqBatismo = true; 
        this.props.modificaBatismo(value);
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
                        <View style={defaultFormStyles.inputView}>
                            <TextInput
                                selectTextOnFocus
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="go"
                                style={defaultFormStyles.input}
                                value={this.props.codEtiqBatismo}
                                ref={(input) => { this.batInput = input; }}
                                onChangeText={this.onChangeBatismo}
                                onBlur={this.onBlurBatismo}
                            />
                        </View>
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

const mapStateToProps = state => {
    const maps = (
        {
            codEtiqBatismo: state.ConsEtiqBatEntradaReducer.codEtiqBatismo
        }
    );

    return maps;
};

export default connect(mapStateToProps, {
    modificaBatismo,
    modificaClean,
    doConsBatismo
})(FormConsultaBatismo);

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
    btClear: {
        width: 40,
        height: 35
    },
    imgClear: {
        width: 35,
        height: 35
    }
});

import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image
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

import imgClear from '../../../../resources/imgs/limpa_tela.png'; 

class FormConsultaBatismo extends Component {

    componentDidMount() {
        Actions.refresh({ right: this.renderRightButtonBar });
    }
    
    componentWillUnmount() {
        this.props.modificaClean();
    }

    doConsultBatismo() {
        const codEtiqBatismo = this.props.codEtiqBatismo;
        this.props.doConsBatismo(codEtiqBatismo);
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
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Batismo</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.codEtiqBatismo}
                            ref={(input) => { this.batInput = input; }}
                            onChangeText={this.props.modificaBatismo}
                            onSubmitEditing={() => this.doConsultBatismo()}
                            onBlur={() => this.props.codEtiqBatismo && this.doConsultBatismo()}
                            blurOnSubmit={false}
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

import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Button
} from 'react-native';

import { connect } from 'react-redux';

import FormRow from '../utils/FormRow';
import { 
    modificaCodEan,
    modificaCodItem,
    cleanRelEanReducer,
    doConfirm
} from '../../actions/RelEanActions';

class FormDespacho extends Component {

    componentWillUnmount() {
        this.props.cleanRelEanReducer();
    }
    confirmButton() {   
        const propparams = {
            codEAN: this.props.codEAN,
            codItem: this.props.codItem
        }; 
        this.props.doConfirm(propparams);     
    }
    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>EAN</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.codEAN}
                            onChangeText={this.props.modificaCodEan}
                            ref={(input) => { this.nrNotaFis = input; }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Item</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.codItem}
                            onChangeText={this.props.modificaCodItem}
                            ref={(input) => { this.nrNotaFis = input; }}
                        />
                    </View>
                </FormRow>
                <FormRow> 
                    <View style={styles.viewBotao} >
                        <Button
                            onPress={() => this.confirmButton()}
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
    input: {
        height: 35,
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: '#20293F',
        color: 'white',
        fontFamily: 'sans-serif-medium',
		borderRadius: 10
    },
    viewBotao: {
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 10
    }
});

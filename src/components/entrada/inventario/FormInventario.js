import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import ModalFilterPicker from 'react-native-modal-filter-picker';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import FormRow from '../../utils/FormRow';

import imgSeta from '../../../../resources/imgs/seta.png';

class FormInventario extends Component {

    constructor(props) {
        super(props);
        this.state = { date: '14/06/2018', visible: false, picked: '1' };
    }

    onPickerShow = () => {
        this.setState({ visible: true });
    }

    onPickerSelect = (picked) => {
        this.setState({
            picked,
            visible: false
        });
    }

    onPickerCancel = () => {
        this.setState({
            visible: false
        });
    }

    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <FormRow>
                    <View style={{ flex: 2 }}>
                        <Text style={[styles.txtLabel, { marginLeft: -35 }]}>Data</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <DatePicker
                                style={{ flex: 1 }}
                                date={this.state.date}
                                mode="date"
                                placeholder=""
                                autoCapitalize="none"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                autoCorrect={false}
                                returnKeyType="go"
                                format="DD/MM/YYYY"
                                confirmBtnText="Ok"
                                cancelBtnText="Cancelar"
                                customStyles={{     
                                    dateInput: StyleSheet.flatten(styles.dateInput),
                                    dateIcon: StyleSheet.flatten(styles.dateIcon),
                                    dateText: StyleSheet.flatten(styles.dateText)
                                }}
                                onDateChange={(date) => { this.setState({ date }); }}
                            />
                        </View>
                    </View>  
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Localização</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.qtTotal}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.txtLabel, { marginLeft: -35 }]}>Contagem</Text>
                        <TouchableOpacity 
                            onPress={() => this.onPickerShow()}
                            style={{ flexDirection: 'row' }}
                        >
                            <TextInput
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={false}
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="next"
                                style={[styles.input, { flex: 1 }]}
                                value={this.state.picked}
                            />
                            <Image
                                source={imgSeta}
                                style={styles.imgSeta}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>EAN</Text>
                            <TextInput
                                onc
                                placeholder=""
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="numeric"
                                placeholderTextColor='rgba(255,255,255,0.7)'
                                returnKeyType="go"
                                style={styles.input}
                                value={this.props.qtItem}
                                ref={(input) => { this.qtItem = input; }}
                            />
                    </View>
                </FormRow>
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Qtde</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.localPad}
                        />
                    </View>
                    <View style={{ flex: 1 }} />
                </FormRow>
                <FormRow>
                    <View style={styles.viewBotao}>
                        <Button
                            onPress={() => false}
                            title="Confirmar"
                            color="green"
                        />
                    </View>
                </FormRow>
                <View style={{ marginBottom: 50 }} />
                <ModalFilterPicker
                    placeholderText="Filtro..."
                    cancelButtonText="Cancelar"
                    noResultsText="Não encontrado"
                    visible={this.state.visible}
                    onSelect={this.onPickerSelect}
                    onCancel={this.onPickerCancel}
                    options={[
                        {
                            key: '1',
                            label: '1',
                        },
                        {
                            key: '2',
                            label: '2',
                        },
                        {
                            key: '3',
                            label: '3',
                        }]}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    const maps = (
        {
             
        }
    );

    return maps;
};

export default connect(mapStateToProps, {})(FormInventario);

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1,
        backgroundColor: '#4b86b4'
    },
    imgSeta: {
        width: 35,
        height: 35
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
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 10
    },
    dateInput: {
        height: 35,
        borderWidth: 0,
        backgroundColor: '#20293F',    
        borderRadius: 10,
        marginBottom: 5,
    },
    dateIcon: {
        marginBottom: 5,
        marginLeft: -1
    },
    dateText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontFamily: 'sans-serif-medium'       
    }
});

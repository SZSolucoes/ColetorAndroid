import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    Platform,
    Alert,
    Image,
    TouchableOpacity,
    Picker
} from 'react-native';

import { connect } from 'react-redux';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import _ from 'lodash';

import FormRow from '../../utils/FormRow';
import LoadingSpin from '../../utils/LoadingSpin';
import ListaItemAdicao from './ListaItemAdicao';

import { 
    modificaBatismo, 
    modificaClean,
    doFetchInfoBatismo,
    doFetchListEmbalagens,
    modificaEmbalagem,
    modificaVolume,
    modificaListVolumes,
    modificaModalVisible,
    modificaSigla,
    modificaKeyEmb,
    doConfVol
} from '../../../actions/ConfereVolumeActions';

import imgSeta from '../../../../resources/imgs/seta.png';

class FormConferenciaVolume extends Component {

    constructor(props) {
        super(props);

        this.doFetchInfoBatismo = this.doFetchInfoBatismo.bind(this);
        this.doConfVol = this.doConfVol.bind(this);
        this.focusInField = this.focusInField.bind(this);
        this.adicionarVolume = this.adicionarVolume.bind(this);
        this.modificaEmbalagemModal = this.modificaEmbalagemModal.bind(this);
        this.onChangeVolume = this.onChangeVolume.bind(this);
        this.renderForWindows = this.renderForWindows.bind(this);

        this.fieldsChanged = { batismo: false };
    }

    componentDidMount() {
        this.props.doFetchListEmbalagens();
    }

    componentWillUnmount() {
        this.props.modificaClean();
    }

    onChangeVolume(value) {
        const txtParsed = value.replace(/[^0-9]/g, '');
        this.props.modificaVolume(txtParsed);
    }

    adicionarVolume() {
        const { embalagem, volume, listVolumes, sigla } = this.props;

        if (!embalagem) {
            Alert.alert('Aviso', 'Campo (Embalagem) deve ser informado!');
            return;
        }
        if (!volume) {
            Alert.alert('Aviso', 'Campo (Volume) deve ser informado!');
            return;
        }

        const newListVolumes = [...listVolumes, { embalagem, volume, sigla }];
        this.props.modificaListVolumes(newListVolumes);
        this.props.modificaVolume('');
    }

    modificaEmbalagemModal(key) {
        const { listEmbalagens } = this.props;
        const itemEmbalagem = _.find(listEmbalagens, (item) => item.key === key);
        if (itemEmbalagem) {
            this.props.modificaEmbalagem(itemEmbalagem.label);
            this.props.modificaSigla(itemEmbalagem.sigla);
            this.props.modificaKeyEmb(itemEmbalagem.key);
            this.txtVolume.focus();
        }
    }

    doConfVol() {
        const {
            batismo,
            embarque,
            pedido,
            keyRet,
            listVolumes,
            pesoBruto,
            usuario 
        } = this.props;

        if (batismo && pesoBruto && listVolumes.length > 0) {
            const parsedPsBruto = pesoBruto.replace(/\./g, ',');
            const newListVol = [];
            listVolumes.forEach(item => {
                newListVol.push({ 
                    embalagem: item.embalagem,
                    sigla: item.sigla,
                    qtdEmb: item.volume
                });
            });
            const params = {
                userName: usuario,
                embarque,
                resumo: keyRet.resumo,
                nome: keyRet.nome,
                pedido,
                range: keyRet.range,
                peso: parsedPsBruto,
                listaVolumes: JSON.stringify(newListVol)
            };
            this.props.doConfVol(params);
        } else if (!batismo) {
            Alert.alert('Conf - Volumes', 'Campo (Batismo) deve ser informado!');
        } else if (!pesoBruto) {
            Alert.alert('Conf - Volumes', 'Campo (Peso Bruto) deve ser informado!');
        } else if (listVolumes.length <= 0) {
            Alert.alert(
                'Conf - Volumes', 
                'É necessário informar volumes para finalizar a conferência!'
            );
        }
    }

    doFetchInfoBatismo() {
        const { usuario, batismo } = this.props;
        this.props.doFetchInfoBatismo({ userName: usuario, etiqueta: batismo }, this.focusInField);
    }

    focusInField(field) {
        switch (field) {
            case 'batismo':
                this.txtBatismo.focus();
                this.fieldsChanged.batismo = true;
                break;
            default:
        }
    }

    renderForWindows() {
        const { listEmbalagens } = this.props;
        return (
            <View style={{ flex: 2 }}>
                <Text style={styles.txtLabel}>Embalagem</Text>
                <Picker
                    selectedValue={this.props.keyEmb}
                    style={{ flex: 2, marginHorizontal: 10 }}
                    onValueChange={(value) => this.modificaEmbalagemModal(value)} 
                >
                    { listEmbalagens && listEmbalagens.map((item, index) => (
                        <Picker.Item key={index} label={item.label} value={item.key} />
                    ))}
                </Picker>
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                { Platform.OS !== 'windows' && <LoadingSpin /> }
                <FormRow>
                    <View style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Batismo</Text>
                        <TextInput
                            selectTextOnFocus
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.batismo}
                            ref={(input) => { this.txtBatismo = input; }}
                            onChangeText={value => {
                                this.fieldsChanged.batismo = true; 
                                this.props.modificaBatismo(value); 
                            }}
                            onBlur={() => { 
                                if (this.props.batismo && 
                                    this.fieldsChanged.batismo) {
                                        this.fieldsChanged.batismo = false;
                                        this.doFetchInfoBatismo();
                                    } 
                            }}
                        />
                    </View>
                    <View style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Embarque</Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.embarque}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                    <View style={{ flex: 4 }}>
                        <Text style={styles.txtLabel}>Pedido</Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.pedido}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                </FormRow>
                <FormRow>
                    { Platform.OS !== 'windows' ? (
                        <View style={{ flex: 2 }}>
                            <Text style={[styles.txtLabel, { marginLeft: -35 }]}>Embalagem</Text>
                            <TouchableOpacity 
                                onPress={() => this.props.modificaModalVisible(true)}
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
                                    value={this.props.embalagem}
                                />
                                <Image
                                    source={imgSeta}
                                    style={styles.imgSeta}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        this.renderForWindows()
                    )}
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Volume</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType={'numeric'}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            value={this.props.volume}
                            onChangeText={(value) => this.onChangeVolume(value)}
                            ref={(input) => { this.txtVolume = input; }}
                            onSubmitEditing={() => this.props.volume && this.adicionarVolume()}
                        />
                    </View>
                </FormRow>
                <View>
                    <ListaItemAdicao adicionarVolume={this.adicionarVolume} />
                </View>
                <FormRow>
                    { Platform.OS !== 'windows' ? (
                        <View style={styles.viewBotao}>
                            <Button
                                onPress={() => this.doConfVol()}
                                title="Finalizar"
                                color="green"
                            />
                        </View>
                    ) : (
                        <View style={styles.viewBotao}>
                            <View style={{ width: 150 }}>
                                <Button
                                    onPress={() => this.doConfVol()}
                                    title="Finalizar"
                                    color="black"
                                />
                            </View>
                        </View>
                    )}
                </FormRow>
                <View style={{ marginBottom: 50 }} />
                <ModalFilterPicker
                    placeholderText="Filtro..."
                    cancelButtonText="Cancelar"
                    noResultsText="Não encontrado"
                    visible={this.props.modalVisible}
                    onSelect={this.modificaEmbalagemModal}
                    onCancel={() => this.props.modificaModalVisible(false)}
                    options={this.props.listEmbalagens}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    batismo: state.ConfereVolumeReducer.batismo,
    embarque: state.ConfereVolumeReducer.embarque,
    pedido: state.ConfereVolumeReducer.pedido,
    keyRet: state.ConfereVolumeReducer.keyRet,
    listVolumes: state.ConfereVolumeReducer.listVolumes,
    pesoBruto: state.ConfereVolumeReducer.pesoBruto,
    usuario: state.LoginReducer.usuario,
    embalagem: state.ConfereVolumeReducer.embalagem,
    volume: state.ConfereVolumeReducer.volume,
    sigla: state.ConfereVolumeReducer.sigla,
    keyEmb: state.ConfereVolumeReducer.keyEmb,
    listEmbalagens: state.ConfereVolumeReducer.listEmbalagens,
    modalVisible: state.ConfereVolumeReducer.modalVisible
});

export default connect(mapStateToProps, {
    modificaBatismo, 
    modificaClean,
    doFetchInfoBatismo,
    doFetchListEmbalagens,
    modificaEmbalagem,
    modificaVolume,
    modificaListVolumes,
    modificaModalVisible,
    modificaSigla,
    modificaKeyEmb,
    doConfVol
})(FormConferenciaVolume);

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
    viewBotao: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 10
    },
    viewBtEtiq: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    imgSeta: {
        width: 35,
        height: 35
    }
});

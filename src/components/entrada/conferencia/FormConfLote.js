/* eslint-disable max-len */
import React from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Keyboard
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import ListaLote from './ListaLote';

import { 
    iniciaConfLote,
    modificaQtdLote,
    modificaSeqLote,
    modificaCodLote,
    modificaQtdItemLote,
    modificaListaItemLote
} from '../../../actions/ConfereActions';
import { defaultFormStyles } from '../../utils/Forms';

class FormConfLote extends React.PureComponent {
    componentDidMount = () => {
        this.props.iniciaConfLote();
        setTimeout(Actions.refresh, 500, { right: this.renderRightButton });
    }

    onPressSalvar = () => {
        const { qtItem, listaItemLote } = this.props;

        let qtConferida = 0;

        if (listaItemLote) {
            if (listaItemLote.length === 0) {
                Alert.alert(
                    'Conferência',
                    'Lote deve ser informado!'
                );
                return;
            }
        } else {
            Alert.alert(
                'Conferência',
                'Lote deve ser informado!'
            );
            return;
        }

        for (let i = 0; i < listaItemLote.length; i++) {
            qtConferida += _.toInteger(listaItemLote[i].qtdItemLote);
        }

        if (_.toInteger(qtConferida) !== _.toInteger(qtItem)) {
            Alert.alert(
                'Conferência',
                'Quantidade Inválida!'
            );
            return;
        }

        Actions.pop();
    }

    onBlurQtdVolume = () => {
        if (this.props.qtdLote) this.criaVolumesLote();
    }
    onBlurQuantidade = () => {
        if (this.props.qtdItemLote) this.salvaQtdLote();
    }

    onChangeQtdVolume = (value) => {
        this.props.modificaQtdLote(value);
    }
    onChangeLote = (value) => {
        this.props.modificaCodLote(value);
    }
    onChangeQuantidade = (value) => {
        this.props.modificaQtdItemLote(value);
    }

    onSubmitEditingLote = () => {
        this.qtdItemLote.focus();
    }

    criaVolumesLote = () => {
        const { qtdLote } = this.props;
        let arrLote = [];

        Keyboard.dismiss();

        this.props.modificaSeqLote();
        this.props.modificaCodLote();
        this.props.modificaQtdItemLote();

        for (let i = 0; i < qtdLote; i++) {
            const arrAux = [{
                seqLote: _.toString(i + 1),
                codLote: '',
                qtdItemLote: ''
            }];

            arrLote = _.concat(arrLote, arrAux);
        }

        this.props.modificaListaItemLote(arrLote);

        if (arrLote.length > 0) {
            this.props.modificaSeqLote(_.toString(arrLote[0].seqLote));
            this.props.modificaCodLote(_.toString(arrLote[0].codLote));
            this.props.modificaQtdItemLote(_.toString(arrLote[0].qtdItemLote));
        }

        this.codLote.focus();
    }

    salvaQtdLote = () => {
        const { seqLote, codLote, qtdItemLote, listaItemLote } = this.props;

        const index = _.findIndex(listaItemLote, (item) => item.seqLote === seqLote);

        listaItemLote[index] = {
            seqLote,
            codLote,
            qtdItemLote
        };

        Keyboard.dismiss();

        this.props.modificaListaItemLote(listaItemLote);
        
        Actions.refresh();
    }

    renderRightButton = () => (
        <TouchableOpacity onPress={this.onPressSalvar}>
            <Text style={{ color: 'white', marginRight: 10, fontSize: 16 }}>Salvar</Text>
        </TouchableOpacity>
    );

    render = () => (
        <ScrollView style={styles.viewPrinc}>
            <View style={styles.viewLinha}>
                <View style={[styles.viewCampo, { flex: 1 }]}>
                    <Text style={styles.txtLabel}>Qtde Volumes</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={defaultFormStyles.input}
                            onChangeText={this.onChangeQtdVolume}
                            value={this.props.qtdLote}
                            ref={(input) => { this.qtdLote = input; }}
                            onBlur={this.onBlurQtdVolume}
                        />
                    </View>
                </View>
                <View style={styles.viewBtOk}>
                    <TouchableOpacity
                        style={styles.btOk}
                        onPress={this.criaVolumesLote}
                    >
                        <Text style={styles.txtBtOk}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.viewLinha}>
                <View style={[styles.viewCampo, { flex: 2 }]}>
                    <Text style={styles.txtLabel}>Seq</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            value={this.props.seqLote}
                        />
                    </View>
                </View>
                <View style={[styles.viewCampo, { flex: 4 }]}>
                    <Text style={styles.txtLabel}>Lote</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={defaultFormStyles.input}
                            onChangeText={this.onChangeLote}
                            ref={(input) => { this.codLote = input; }}
                            value={this.props.codLote}
                            onSubmitEditing={this.onSubmitEditingLote}
                        />
                    </View>
                </View>
                <View style={[styles.viewCampo, { flex: 3 }]}>
                    <Text style={styles.txtLabel}>Qtde</Text>
                    <View style={defaultFormStyles.inputView}>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={defaultFormStyles.input}
                            onChangeText={this.onChangeQuantidade}
                            value={this.props.qtdItemLote}
                            ref={(input) => { this.qtdItemLote = input; }}
                            onBlur={this.onBlurQuantidade}
                        />
                    </View>
                </View>
                <View style={styles.viewBtOk}>
                    <TouchableOpacity
                        style={styles.btOk}
                        onPress={this.salvaQtdLote}
                    >
                        <Text style={styles.txtBtOk}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ padding: 5 }} >
                <ListaLote />
            </View>
        </ScrollView>
    )
}

const mapStateToProps = state => {
    return (
        {
            listaItemLote: state.ConfereReducer.listaItemLote,
            codLote: state.ConfereReducer.codLote,
            qtdItemLote: state.ConfereReducer.qtdItemLote,
            qtdLote: state.ConfereReducer.qtdLote,
            seqLote: state.ConfereReducer.seqLote,
            usuario: state.LoginReducer.usuario,
            qtItem: state.ConfereReducer.qtItem
        }
    );
};

export default connect(mapStateToProps, { 
    iniciaConfLote,
    modificaQtdLote,
    modificaSeqLote,
    modificaCodLote,
    modificaQtdItemLote,
    modificaListaItemLote
})(FormConfLote);

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
    btOk: {
        width: 40,
        height: 35,
        backgroundColor: '#20293F',
        paddingTop: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    viewBtOk: {
        justifyContent: 'flex-end',
        paddingHorizontal: 10
    },
    txtBtOk: {
        color: 'white',
        fontFamily: 'sans-serif-medium',
    }
});

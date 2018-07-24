import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
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


class FormConfLote extends Component {
    componentDidMount() {
        this.props.iniciaConfLote();
        Actions.refresh({ right: this._renderRightButton });
    }

    _renderRightButton = () => {
        return (
            <TouchableOpacity onPress={() => this._onPressSalvar() } >
                <Text style={{ color: 'white', marginRight: 10, fontSize: 16 }}>Salvar</Text>
            </TouchableOpacity>
        );
    };
    _onPressSalvar = () => {
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
    criaVolumesLote() {
        const { qtdLote } = this.props;
        let arrLote = [];

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
    salvaQtdLote() {
        const { seqLote, codLote, qtdItemLote, listaItemLote } = this.props;

        const index = _.findIndex(listaItemLote, function(item) { 
            return item.seqLote === seqLote;
        });

        listaItemLote[index] = {
            seqLote,
            codLote,
            qtdItemLote
        };

        this.props.modificaListaItemLote(listaItemLote);
        
        Actions.refresh();
    }
    render() {
        return (
            <ScrollView style={styles.viewPrinc}>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 1 }]}>
                        <Text style={styles.txtLabel}>Qtde Volumes</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            onChangeText={qtdLote => this.props.modificaQtdLote(qtdLote)}
                            value={this.props.qtdLote}
                            ref={(input) => { this.qtdLote = input; }}
                            onSubmitEditing={() => { this.criaVolumesLote(); }}
                        />
                    </View>
                    <View style={styles.viewBtOk}>
                        <TouchableOpacity
                            style={styles.btOk}
                            onPress={() => { this.criaVolumesLote(); }}                            
                        >
                            <Text style={styles.txtBtOk}>OK</Text>
                        </TouchableOpacity>
                    </View>                    
                </View>
                <View style={styles.viewLinha}>
                    <View style={[styles.viewCampo, { flex: 2 }]}>
                        <Text style={styles.txtLabel}>Seq</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={seqLote => this.props.modificaSeqLote(seqLote)}
                            value={this.props.seqLote}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 4 }]}>
                        <Text style={styles.txtLabel}>Lote</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={codLote => this.props.modificaCodLote(codLote)}
                            ref={(input) => { this.codLote = input; }}
                            value={this.props.codLote}
                            onSubmitEditing={() => { this.qtdItemLote.focus(); }}
                        />
                    </View>
                    <View style={[styles.viewCampo, { flex: 3 }]}>
                        <Text style={styles.txtLabel}>Qtde</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="numeric"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            style={styles.input}
                            onChangeText={qtdItemLote => this.props.modificaQtdItemLote(qtdItemLote)}
                            value={this.props.qtdItemLote}
                            ref={(input) => { this.qtdItemLote = input; }}
                            onSubmitEditing={() => { this.salvaQtdLote(); }}
                        />
                    </View>
                    <View style={styles.viewBtOk}>
                        <TouchableOpacity
                            style={styles.btOk}
                            onPress={() => { this.salvaQtdLote(); }}                            
                        >
                            <Text style={styles.txtBtOk}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ padding: 5 }} >
                    <ListaLote />
                </View>
            </ScrollView>
        );
    }
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
    input: {
        height: 35,
        fontSize: 16,
        textAlign: 'center',
        backgroundColor: '#20293F',
        color: 'white',
        fontFamily: 'sans-serif-medium',
		borderRadius: 10
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

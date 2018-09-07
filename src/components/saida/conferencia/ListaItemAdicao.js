import React, { Component } from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    StyleSheet,
    Button,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    TextInput,
    Platform
} from 'react-native';

import { connect } from 'react-redux';

import FormRow from '../../utils/FormRow';
import { leftStr } from '../../utils/StrComplex';

import imgPrinter from '../../../../resources/imgs/impressao_etiq.png';
import imgRemove from '../../../../resources/imgs/remove.png';

import { modificaListVolumes, modificaPesoBruto } from '../../../actions/ConfereVolumeActions';

class ListaItemAdicao extends Component {

    constructor(props) {
        super(props);
        
        this.renderItem = this.renderItem.bind(this);
        this.removeVolume = this.removeVolume.bind(this);
        this.onChangePesoBruto = this.onChangePesoBruto.bind(this);
    }
    
    onChangePesoBruto(value) {
        const txtParsed = value.replace(/[^0-9\\.\\,]/g, '')
        .replace(/\.\.+/g, '.')
        .replace(/,,+/g, ',')
        .replace(/,\./g, ',')
        .replace(/\.,+/g, '.');
        this.props.modificaPesoBruto(txtParsed);
    }

    keyExtractor(item, index) {
        return index.toString();
    }

    removeVolume(index) {
        const { listVolumes } = this.props;
        const newList = [...listVolumes];
        newList.splice(index, 1);
        this.props.modificaListVolumes(newList);
    }

    renderSeparator() {
        const viewSep = (
            <View
                style={{
                height: 1,
                width: '100%',
                backgroundColor: '#607D8B',
                }}
            />
        );

        return viewSep;
    }

    renderItem({ item, index }) {
        const viewItem = (
            <TouchableHighlight onPress={() => false} >
                <View style={styles.item} >
                    <Text style={styles.seq}>{leftStr(index + 1)}</Text>
                    <Text style={styles.embalagem}>{item.embalagem}</Text>
                    <Text style={styles.volume}>{item.volume}</Text>
                    <TouchableOpacity
                        style={styles.btSearch}
                        onPress={() => this.removeVolume(index)}
                    >
                        <Image
                            source={imgRemove}
                            style={styles.imgSearch}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableHighlight>         
        );

        return viewItem;
    }
    
    renderHeader() {
        const headerView = (
            <View style={styles.header}>
                <Text style={[styles.seq, styles.sizeFldHeader]}> 
                    Seq
                </Text>
                <Text style={[styles.embalagem, styles.sizeFldHeader]}> 
                    Embalagem
                </Text>
                <Text style={[styles.volume, styles.sizeFldHeader]}> 
                    Volume
                </Text>
                <Text style={[styles.remove, styles.sizeFldHeader]} />
            </View>
        );

        return headerView;
    }

    render() {
        return (
            <View>
                <View style={{ padding: 5 }}>
                    <FormRow >
                        <View style={styles.viewBotao}>
                            { Platform.OS !== 'windows' ? (
                                <View style={styles.viewAddBtn}>
                                    <Button
                                        onPress={() => this.props.adicionarVolume()}
                                        title="Adicionar"
                                        color="green"
                                    />
                                </View>
                            ) : (
                                <View style={styles.viewAddBtn}>
                                    <View style={{ width: 150 }}>
                                        <Button
                                            onPress={() => this.props.adicionarVolume()}
                                            title="Adicionar"
                                            color="black"
                                        />
                                    </View>
                                </View>
                            )}
                            <TouchableOpacity
                                style={styles.btSearch}
                                onPress={() => false}
                            >
                                <Image
                                    source={imgPrinter}
                                    style={styles.imgSearch}
                                />
                            </TouchableOpacity>
                        </View>
                    </FormRow>
                    <FlatList
                        data={this.props.listVolumes}
                        style={styles.container}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                        extraData={this.props}
                        numColumns='1'
                        ListHeaderComponent={this.renderHeader}
                        alwaysBounceHorizontal
                    />
                </View>
                <FormRow>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.txtLabel}>Peso Bruto</Text>
                        <TextInput
                            placeholder=""
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType={'numeric'}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.pesoBruto}
                            onChangeText={(value) => this.onChangePesoBruto(value)}
                        />
                    </View>
                    <View style={{ flex: 1 }} />
                </FormRow>
            </View>   
        );
    }
}

const mapStateToProps = (state) => ({
    listVolumes: state.ConfereVolumeReducer.listVolumes,
    pesoBruto: state.ConfereVolumeReducer.pesoBruto
});

export default connect(mapStateToProps, {
    modificaListVolumes,
    modificaPesoBruto
})(ListaItemAdicao);

const styleField = {
    itemHeaderAndRow: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'sans-serif-medium'
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    item: {
        backgroundColor: '#20293F',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 2,
        paddingHorizontal: 5
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
        marginTop: 10
    },
    viewAddBtn: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    txtLabel: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'sans-serif-medium',
        fontSize: 13
    },
    btSearch: {
        width: 40,
        height: 35
    },
    imgSearch: {
        width: 35,
        height: 35
    },
    seq: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2 
    },
    embalagem: { 
        ...styleField.itemHeaderAndRow, 
        flex: 4 
    },
    volume: { 
        ...styleField.itemHeaderAndRow, 
        flex: 4 
    },
    remove: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1 
    },
    sizeFldHeader: {
        fontSize: 14
    },
    header: {
        width: '100%', 
        height: 25, 
        backgroundColor: '#63ace5', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1
    }
});

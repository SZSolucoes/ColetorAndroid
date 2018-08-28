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
    TextInput
} from 'react-native';

import { connect } from 'react-redux';

import FormRow from '../../utils/FormRow';

import imgPrinter from '../../../../resources/imgs/impressao_etiq.png';
import imgZoom from '../../../../resources/imgs/zoom_nf.png';
import imgRemove from '../../../../resources/imgs/remove.png';


class ListaItemAdicao extends Component {

    constructor(props) {
        super(props);
        this.state = { listaItens: [
            { seq: '001', itCode: '0000155', itCo: '00001' },
            { seq: '002', itCode: '00001', itCo: '00001' },
            { seq: '003', itCode: '00001', itCo: '00001' },
            { seq: '004', itCode: '00001', itCo: '00001' },
            { seq: '005', itCode: '00001', itCo: '00001' },
            { seq: '006', itCode: '00001', itCo: '00001' },
            { seq: '007', itCode: '00001', itCo: '00001' },
            { seq: '008', itCode: '00001', itCo: '00001' },
            { seq: '009', itCode: '00001', itCo: '00001' },
            { seq: '010', itCode: '00001', itCo: '00001' }] };
    }
    
    keyExtractor(item, index) {
        return (
            item.seq
        );
    }
    renderSeparator = () => {
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
    renderItem = ({ item }) => {
        const viewItem = (
            <TouchableHighlight onPress={() => false} >
                <View style={styles.item} >
                    <Text style={styles.seq}>{item.seq}</Text>
                    <Text style={styles.embalagem}>{item.itCode}</Text>
                    <View style={styles.viewBtSearch}>
                        <TouchableOpacity
                            style={styles.btSearch}
                            onPress={this.procuraNFLista}                            
                        >
                            <Image
                                source={imgZoom}
                                style={styles.imgSearch}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.volume}>{item.itCo}</Text>
                    <TouchableOpacity
                        style={styles.btSearch}
                        onPress={() => false}
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
    renderHeader = () => {
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
    };
    render() {
        return (
            <View>
                <View style={{ padding: 5 }}>
                    <FormRow >
                        <View style={styles.viewBotao}>
                            <Button
                                onPress={() => false}
                                title="Adicionar"
                                color="#4682B4"
                            />
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
                        data={this.state.listaItens}
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
                            editable={false}
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            value={this.props.fornec}
                        />
                    </View>
                    <View style={{ flex: 1 }} />
                </FormRow>
            </View>   
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

export default connect(mapStateToProps, {})(ListaItemAdicao);

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
    },
    viewBtSearch: {
        justifyContent: 'flex-end'
    }
});

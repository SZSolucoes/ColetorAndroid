import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    Button,
    Alert,
    ActivityIndicator,
    Keyboard,
    FlatList,
    TouchableHighlight 

} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';

class FormSelecaoNF extends Component {
    constructor(props) {        
        super(props)
	}
    componentDidMount() {
    }
    component() {
        
    }
    onPressItem(item) {
        this.props.callback(item);
        Actions.pop();
    }
    renderItem = ({ item }) => {
        return (
            <TouchableHighlight  onPress={() => this.onPressItem(item)}>
                <View style={styles.item}>
                    <Text style={styles.itemNroDoc}>{ item.numDoc}</Text>
                    <Text style={styles.itemSerie}>{ item.serie}</Text>
                    <Text style={styles.itemFornec}>{ item.fornec}</Text>
                    <Text style={styles.itemNatureza}>{ item.natOper}</Text>
                </View>
            </TouchableHighlight>            
        );
    };
    renderHeader = () => {
        const headerView = (
            <View style={styles.header}>
                <Text style={styles.titleHeader}> 
                    Documento
                </Text>
                <Text style={[styles.titleHeader, { flex: 1 }]}> 
                    Série
                </Text>
                <Text style={styles.titleHeader}> 
                    Fornnecedor
                </Text>
                <Text style={styles.titleHeader}> 
                    Natur Oper
                </Text>
            </View>
        );

        return headerView;
    };
    render() {
        return (
            
            <ScrollView style={styles.viewPrinc}>                
                
                <View style={styles.viewLinha}></View>
                
                <View style={styles.viewLista}>
                    <FlatList
                        data={this.props.listaNF}
                        style={styles.container}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                        keyExtractor= {(item, index) => {return index.toString()}}
                        numColumns='1'
                        ListHeaderComponent={this.renderHeader}
                        stickyHeaderIndices={[0]}
                    />
                </View>
            </ScrollView>
        );
    }
}


export default FormSelecaoNF;

const styles = StyleSheet.create({
    viewPrinc: {
        flex: 1,
        backgroundColor: '#4b86b4'
    },
    viewSmall: {
        width: '25%'
    },
    viewLinha: {
        flexDirection: 'row'
    },
    viewCampo: {
        flexDirection: 'column',        
        paddingHorizontal: 10,
    },
    viewCampoLocal: {
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    viewLinhaLocal: {
        flexDirection: 'column'        
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
    inputSmall: {
        width: 100
    },
    viewBotao: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 10
    },
    button: {
        alignItems: 'center',
        width: 90,
        height: 35,
        padding: 10,
        borderRadius: 10
    },
    inputDescricao: {
        height: 70,
        fontSize: 14,
        textAlign: 'left',
        backgroundColor: '#20293F',
        color: 'white',
        borderRadius: 10,
        fontFamily: 'sans-serif-medium'
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
    titleHeader: {
        textAlign: 'center', 
        color: '#fff', 
        fontSize: 14, 
        flex: 2, 
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium'
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
    itemNroDoc: {
        color: '#fff',
        flex: 2,
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontSize: 14
    },
    itemNatureza: {
        color: '#fff',
        flex: 2,
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontSize: 14
    },
    itemSerie: {
        color: '#fff',
        flex: 1,
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontSize: 14
    },
    itemFornec: {
        color: '#fff',
        flex: 2,
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontSize: 14
    },
    viewLista: {
        flex: 1,
        backgroundColor: '#4b86b4'
    }
});

import React, { Component } from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';

import { connect } from 'react-redux';
import ListaItemConsLocalPC from './ListaItemConsLocalPC';

class ListaItemConsLocal extends Component {

    constructor(props) { 
        super(props);

        this.state = { width: Dimensions.get('window').width };
        this.changedOrientation = this.changedOrientation.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.changedOrientation);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.changedOrientation);
    }

    changedOrientation(e) {
        this.setState({ width: e.window.width });
    }
 
    keyExtractor(item, index) {
        return index.toString();
    }

    renderSeparator() {
        return (
            <View
                style={{
                height: 1,
                width: '100%',
                backgroundColor: '#607D8B',
                }}
            />
        );
    }

    renderItem({ item, index }) {
        return (
            <ListaItemConsLocalPC 
                key={index} 
                item={item}
            />
        );
    }
 
    renderHeader = () => {
        const headerView = (
            <View style={styles.header}>
                <Text style={[styles.codigoDep, styles.sizeFldHeader]}> 
                    Dep
                </Text>
                <Text style={[styles.codigoItem, styles.sizeFldHeader]}> 
                    Item
                </Text>
                <Text style={[styles.descricao, styles.sizeFldHeader]}> 
                    Descrição
                </Text>
                <Text style={[styles.qtdTot, styles.sizeFldHeader]}> 
                    Qtd Tot
                </Text>
                <Text style={[styles.qtdDisp, styles.sizeFldHeader]}> 
                    Qtd Disp
                </Text>
                <Text style={[styles.um, styles.sizeFldHeader]}> 
                    Um
                </Text>
                <Text style={[styles.lote, styles.sizeFldHeader]}> 
                    Lote
                </Text>
            </View>
        );

        return headerView;
    };
    render() {
        return (
            <View {...this.props} >
                <ScrollView horizontal>
                    <FlatList
                        stickyHeaderIndices={[0]}
                        data={this.props.listSaldo}
                        extraData={this.state}
                        style={[styles.container, { width: this.state.width + 300 }]}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                        ListHeaderComponent={this.renderHeader}
                        initialNumToRender={10}
                    />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    listSaldo: state.ConsultaLocalizacaoReducer.listSaldo
});

export default connect(mapStateToProps, {
})(ListaItemConsLocal);

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
        marginVertical: 20,
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    codigoDep: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1 
    },
    codigoItem: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1.5 
    },
    descricao: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2.5 
    },
    qtdTot: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1 
    },
    qtdDisp: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1 
    },
    um: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1 
    },
    lote: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2 
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

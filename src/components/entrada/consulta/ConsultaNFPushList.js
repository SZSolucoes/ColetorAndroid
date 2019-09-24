import React from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    StyleSheet,
    ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { modificaListItemsNF } from '../../../actions/ConsultaNFActions';

import ConsultaNFPushItem from './ConsultaNFPushItem';

class ConsultaNFPushList extends React.PureComponent {
    onNFSelect = (value) => {
        this.props.modificaListItemsNF(value);
        Actions.pop();
    }

    keyExtractor = (item, index) => index.toString()
    
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

    renderItem = ({ item }) => (
        <ConsultaNFPushItem item={item} onNFSelect={this.onNFSelect} />
    )

    renderHeader = () => {
        const headerView = (
            <View style={styles.header}>
                <Text style={[styles.documento, styles.sizeFldHeader]}> 
                    Documento
                </Text>
                <Text style={[styles.serie, styles.sizeFldHeader]}> 
                    Série
                </Text>
                <Text style={[styles.emitente, styles.sizeFldHeader]}> 
                    Emitente
                </Text>
                <Text style={[styles.naturezaope, styles.sizeFldHeader]}> 
                    Natur Oper
                </Text>
            </View>
        );

        return headerView;
    }

    render = () => (
        <View {...this.props} style={styles.viewLista}>
            <ScrollView>
                <FlatList
                    stickyHeaderIndices={[0]}
                    data={this.props.listNF}
                    style={styles.container}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    ListHeaderComponent={this.renderHeader}
                    initialNumToRender={10}
                />
            </ScrollView>
        </View>
    )
}

const mapStateToProps = (state) => (
    {
        listNF: state.ConsultaNFReducer.listNF
    }
);

export default connect(mapStateToProps, {
    modificaListItemsNF
})(ConsultaNFPushList);

const styleField = {
    itemHeaderAndRow: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'sans-serif-medium'
    }
};

const styles = StyleSheet.create({
    viewLista: {
        flex: 1,
        backgroundColor: '#4b86b4'
    },
    container: {
        flex: 1,
        marginTop: 5,
        paddingHorizontal: 5,
        backgroundColor: '#4b86b4'
    },
    documento: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2 
    },
    serie: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1 
    },
    emitente: { 
        ...styleField.itemHeaderAndRow, 
        flex: 2 
    },
    naturezaope: { 
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


/* eslint-disable max-len */
import React from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    StyleSheet, 
    TouchableHighlight 
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { 
    modificaQtdLote,
    modificaSeqLote,
    modificaCodLote,
    modificaQtdItemLote
} from '../../../actions/ConfereActions';

class ListaLote extends React.PureComponent {
    constructor(props) {
        super(props);

        this.pureFunctionComponentRenderItem = React.memo(this.renderItem);
    }

    onPressItem = (volume) => () => {
        this.props.modificaSeqLote(_.toString(volume.seqLote));
        this.props.modificaCodLote(_.toString(volume.codLote));
        this.props.modificaQtdItemLote(_.toString(volume.qtdItemLote));
    }

    keyExtractor = (item) => item.seqLote

    renderSeparator = () => (
        <View
            style={{
            height: 1,
            width: '100%',
            backgroundColor: '#607D8B',
            }}
        />
    )

    renderItem = ({ item }) => (
        <TouchableHighlight
            onPress={this.onPressItem(item)}
        >
            <View style={styles.item}>
                <Text style={styles.seqLote}>{ item.seqLote}</Text>
                <Text style={styles.codLote}>{ item.codLote}</Text>
                <Text style={styles.qtdItemLote}>{ item.qtdItemLote}</Text>
            </View>
        </TouchableHighlight>            
    )

    renderHeader = () => {
        const headerView = (
            <View style={styles.header}>
                <Text style={[styles.titleHeader, { flex: 1 }]}> 
                    Seq
                </Text>
                <Text style={[styles.titleHeader, { flex: 2 }]}> 
                    Lote
                </Text>
                <Text style={[styles.titleHeader, { flex: 1 }]}> 
                    Qtde
                </Text>
            </View>
        );

        return headerView;
    };

    render = () => (
        <View style={styles.viewLista}>
            <FlatList
                data={this.props.listaItemLote}
                style={styles.container}
                ItemSeparatorComponent={this.renderSeparator}
                keyExtractor={this.keyExtractor}
                renderItem={(propsItem) => <this.pureFunctionComponentRenderItem {...propsItem} />}
                numColumns='1'
                extraData={this.props.listaItemLote}
                ListHeaderComponent={this.renderHeader}
                stickyHeaderIndices={[0]}
            />
        </View>
    )
}

const mapStateToProps = state => (
    {
        listaItemLote: state.ConfereReducer.listaItemLote,
        codLote: state.ConfereReducer.codLote,
        qtdItemLote: state.ConfereReducer.qtdItemLote,
        qtdLote: state.ConfereReducer.qtdLote,
        seqLote: state.ConfereReducer.seqLote
    }
);

export default connect(
    mapStateToProps, 
    { 
        modificaQtdLote,
        modificaSeqLote,
        modificaCodLote,
        modificaQtdItemLote
    }
)(ListaLote);

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
    item: {
        backgroundColor: '#20293F',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginVertical: 2,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    seqLote: {
        color: '#fff',
        flex: 1,
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontSize: 14
    },
    codLote: {
        color: '#fff',
        flex: 2,
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        fontSize: 14
    },
    qtdItemLote: {
        color: '#fff',
        flex: 1,
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
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
    titleHeader: {
        textAlign: 'center', 
        color: '#fff', 
        fontSize: 14, 
        flex: 2, 
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium'
    }
});

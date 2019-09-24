import React from 'react';
import { 
    FlatList, 
    View, 
    Text, 
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';

import { connect } from 'react-redux';

import ConsultaNFItem from './ConsultaNFItem';

class ConsultaNFList extends React.PureComponent {
    constructor(props) { 
        super(props);

        this.state = { width: Dimensions.get('window').width };
    }

    componentDidMount = () => {
        Dimensions.addEventListener('change', this.changedOrientation);
    }

    componentWillUnmount = () => {
        Dimensions.removeEventListener('change', this.changedOrientation);
    }

    changedOrientation = (e) => {
        this.setState({ width: e.window.width });
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
        <ConsultaNFItem item={item} />
    )

    renderHeader = () => {
        const headerView = (
            <View style={styles.header}>
                <Text style={[styles.seq, styles.sizeFldHeader]}> 
                    Seq
                </Text>
                <Text style={[styles.item, styles.sizeFldHeader]}> 
                    Item
                </Text>
                <Text style={[styles.batismo, styles.sizeFldHeader]}> 
                    Batismo
                </Text>
                <Text style={[styles.conferente, styles.sizeFldHeader]}> 
                    Conferente
                </Text>
                <Text style={[styles.armazenador, styles.sizeFldHeader]}> 
                    Armazenador
                </Text>
                <Text style={[styles.situacao, styles.sizeFldHeader]}> 
                    Situação
                </Text>
            </View>
        );

        return headerView;
    }

    render = () => (
        <View {...this.props} >
            <ScrollView horizontal>
                <FlatList
                    stickyHeaderIndices={[0]}
                    data={this.props.listItemsNF}
                    style={[styles.container, { width: this.state.width + 300 }]}
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
        listItemsNF: state.ConsultaNFReducer.listItemsNF
    }
);

export default connect(mapStateToProps, {
     
})(ConsultaNFList);

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
    seq: { 
        ...styleField.itemHeaderAndRow, 
        flex: 1 
    },
    item: { 
        ...styleField.itemHeaderAndRow, 
        flex: 4 
    },
    batismo: { 
        ...styleField.itemHeaderAndRow, 
        flex: 4 
    },
    conferente: { 
        ...styleField.itemHeaderAndRow, 
        flex: 4 
    },
    armazenador: { 
        ...styleField.itemHeaderAndRow, 
        flex: 4 
    },
    situacao: { 
        ...styleField.itemHeaderAndRow, 
        flex: 5 
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


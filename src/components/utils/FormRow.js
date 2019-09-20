import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class FormRow extends React.PureComponent {
    
    renderFilds() {
        return React
                .Children
                .map(this.props.children,
                child => {
                        const chdStyle = StyleSheet.flatten(child.props.style);
                        return ( 
                            <View style={[styles.viewCampo, { flex: 1, ...chdStyle }]}>
                                {child}
                            </View>);
                        });
    }
    
    render() {
        const thisStyles = StyleSheet.flatten(this.props.style);
        return (
            <View style={[styles.viewLinha, { ...thisStyles }]}>
                {this.renderFilds()}   
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    viewLinha: {
        flexDirection: 'row'
    },
    viewCampo: {
        flexDirection: 'column',
        paddingHorizontal: 10
    }
});

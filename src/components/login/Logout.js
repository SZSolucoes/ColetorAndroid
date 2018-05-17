import React, { Component } from 'react';
import { 
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class LogoutBtn extends Component {
    onPress() {
        Actions.loginApp();
    }

    render() {
        return (
            <TouchableOpacity style={styles.buttonLogin}>
                <Text onPress={this.onPress} style={styles.buttonLabel}> 
                    LOGOUT
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonLogin: {
		backgroundColor: '#2a4d69',
        paddingVertical: 15,
        marginHorizontal: 10,
        marginBottom: 10,
		borderRadius: 10
	},
	buttonLabel: {
		textAlign: 'center',
		color: 'white',
		fontWeight: '700'
	},
});

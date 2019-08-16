import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Login extends Component {

    static navigationOptions = {
        header: null
    }

	render() {
		return (
			<View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
				<Text>Login</Text>
			</View>
		)
	}
}

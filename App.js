import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class App extends Component {
	render() {
		return (
			<View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>App</Text>
			</View>
		)
	}
}

export default App;

import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Feedback extends Component {
	render() {
		return (
			<View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
				<Text>Feedback</Text>
			</View>
		)
	}
}

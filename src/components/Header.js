import React from 'react'
import { TouchableOpacity, Alert } from 'react-native'

import UserService from '../services/UserService'

import { Bar, TitleCenter, Title } from './styles/HeaderStyled'
import Icon from 'react-native-vector-icons/AntDesign'

export default Header = props => {

	const discartDatas = async () => {
		UserService.Logout()
			.then(() => props.navigation.navigate('Login'))
	}

	const alertDiscart = () => {
		Alert.alert(
			'Atenção!', 'Realmente deseja sair do aplicativo?',
			[
				{ text: 'Não' },
				{ text: 'Sim', onPress: () => discartDatas() }
			]
		)
	}

	return (
		<Bar>
			<TitleCenter>
				<Title style={{ color: '#000' }}>{props.title}</Title>
			</TitleCenter>
			<TouchableOpacity onPress={() => alertDiscart()}>
				<Icon name="export" size={30} style={{ marginRight: 5 }} />
			</TouchableOpacity>
		</Bar>
	);
}
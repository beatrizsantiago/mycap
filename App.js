import React from 'react'
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation"
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Login from './src/screens/Login'
import SearchCap from './src/screens/SearchCap'
import Feedback from './src/screens/Feedback'

import Header from './src/components/Header'

const LoginStack = createStackNavigator({ Login })

const SearchCapStack = createStackNavigator({ 
	SearchCap: {
		screen: SearchCap,
		navigationOptions: ({ navigation }) => ({
			header: () => <Header navigation={navigation} title="Pesquisar Cap" />,
		})
	}
})

const FeedbackStack = createStackNavigator({
	Feedback: {
		screen: Feedback,
		navigationOptions: ({ navigation }) => ({
			header: () => <Header navigation={navigation} title="Enviar Feedback" />,
		})
	}
})

const TabBottom = createMaterialBottomTabNavigator(
	{
		SearchCap: { 
			screen: SearchCapStack,
			navigationOptions: () => ({
				tabBarIcon: <Icon name="map-search-outline" size={25} color="#fff" />
			})
		},
		Feedback: { 
			screen: FeedbackStack,
			navigationOptions: () => ({
				tabBarIcon: <Icon name="ballot-recount-outline" size={25} color="#fff" />
			})
		},
	}, {
		initialRouteName: 'Feedback',
		activeColor: '#fff',
		inactiveColor: '#754822',
		shifting: true,
		barStyle: { backgroundColor: '#f68121' },
	}
)

export default createAppContainer(
	createSwitchNavigator(
		{
			Login: LoginStack,
			App: TabBottom
		},
		{
			initialRouteName: 'App'
		}
	)
)
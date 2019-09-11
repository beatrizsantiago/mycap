import React from 'react'
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation"
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"

import Login from './src/screens/Login'
import SearchCap from './src/screens/SearchCap'
import Feedback from './src/screens/Feedback'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const LoginStack = createStackNavigator({ Login })
const SearchCapStack = createStackNavigator({ SearchCap })
const FeedbackStack = createStackNavigator({ Feedback })

const TabBottom = createMaterialBottomTabNavigator(
	{
		SearchCap: { 
			screen: SearchCapStack,
			navigationOptions: ({ navigation }) => ({
				tabBarIcon: <Icon name="map-search-outline" size={25} color="#fff" />
			})
		},
		Feedback: { 
			screen: FeedbackStack,
			navigationOptions: ({ navigation }) => ({
				tabBarIcon: <Icon name="ballot-recount-outline" size={25} color="#fff" />
			})
		},
	}, {
		initialRouteName: 'SearchCap',
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
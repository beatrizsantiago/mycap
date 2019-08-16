import React from 'react'
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation"
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"

import Login from './src/screens/Login'
import SearchCap from './src/screens/SearchCap'
import Feedback from './src/screens/Feedback'

const LoginStack = createStackNavigator({ Login })
const SearchCapStack = createStackNavigator({ SearchCap })
const FeedbackStack = createStackNavigator({ Feedback })

const TabBottom = createMaterialBottomTabNavigator(
	{
		SearchCap: { screen: SearchCapStack },
		Feedback: { screen: FeedbackStack },
	}, {
		initialRouteName: 'SearchCap',
		activeColor: '#f0edf6',
		inactiveColor: '#3e2465',
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
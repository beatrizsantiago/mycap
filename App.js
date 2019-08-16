import React from 'react'
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation"

import Login from './src/screens/Login'
import SearchCap from './src/screens/SearchCap'
import Feedback from './src/screens/Feedback'

const LoginStack = createStackNavigator({ Login })
const SearchCapStack = createStackNavigator({ SearchCap })
const FeedbackStack = createStackNavigator({ Feedback })

export default createAppContainer(
	createSwitchNavigator(
		{
			Login: LoginStack
		},
		{
			initialRouteName: 'Login'
		}
	)
)
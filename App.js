import React from 'react'
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation"
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Splash from './src/screens/Splash'
import Login from './src/screens/Login'
import SearchCap from './src/screens/SearchCap'
import Feedback from './src/screens/Feedback'
import ListCaps from './src/screens/ListCaps'
import Profile from './src/screens/Profile'

import Header from './src/components/Header'

const SplahStack = createStackNavigator({ Splash })

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
		screen: ListCaps,
		navigationOptions: ({ navigation }) => ({
			header: () => <Header navigation={navigation} title="Enviar Feedback" />,
		})
	}
})

const ProfileStack = createStackNavigator({
	Profile: {
		screen: Profile,
		navigationOptions: ({ navigation }) => ({
			header: () => <Header navigation={navigation} title="Meu Perfil" />,
		})
	}
})

const TabBottom = createMaterialBottomTabNavigator(
	{
		Profile: { 
			screen: ProfileStack,
			navigationOptions: () => ({
				tabBarIcon: <Icon name="clipboard-account-outline" size={25} color="#fff" />
			})
		},
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
			Splash: SplahStack,
			Login: LoginStack,
			App: TabBottom
		},
		{
			initialRouteName: 'Splash'
		}
	)
)
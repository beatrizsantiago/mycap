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
import ListFeedbacks from './src/screens/ListFeedbacks'
import FeedbackDetails from './src/screens/FeedbackDetails'
import ViewPreaching from './src/screens/ViewPreaching'

import Header from './src/components/Header'

const SplahStack = createStackNavigator({ Splash })

const LoginStack = createStackNavigator({ Login })

const SearchCapStack = createStackNavigator({ 
	SearchCap: {
		screen: SearchCap,
		navigationOptions: ({ navigation }) => ({
			header: props => <Header navigation={navigation} title="Pesquisar Cap" headerProps={props} />,
		})
	}
})

const FeedbackStack = createStackNavigator({
	ListCaps: {
		screen: ListCaps,
		navigationOptions: ({ navigation }) => ({
			header: props => <Header navigation={navigation} title="Enviar Feedback" headerProps={props} />,
		})
	},
	Feedback: {
		screen: Feedback,
		navigationOptions: ({ navigation }) => ({
			header: props => <Header navigation={navigation} title="Enviar Feedback" headerProps={props} />,
		})
	},
})

const ProfileStack = createStackNavigator({
	Profile: {
		screen: Profile,
		navigationOptions: ({ navigation }) => ({
			header: props => <Header navigation={navigation} title="Meu Perfil" headerProps={props} />,
		})
	},
	ListFeedbacks: {
		screen: ListFeedbacks,
		navigationOptions: ({ navigation }) => ({
			header: props => <Header navigation={navigation} title="Meus Feedbacks" headerProps={props} />,
		})
	},
	FeedbackDetails: {
		screen: FeedbackDetails,
		navigationOptions: ({ navigation }) => ({
			header: props => <Header navigation={navigation} title="Detalhes" headerProps={props} />,
		})
	},
	ViewPreaching: {
		screen: ViewPreaching,
		navigationOptions: ({ navigation }) => ({
			header: props => <Header navigation={navigation} title="Palavra da Cap" headerProps={props} />,
		})
	}
})

const TabBottom = createMaterialBottomTabNavigator(
	{
		Perfil: { 
			screen: ProfileStack,
			navigationOptions: (props) => ({
				tabBarIcon: <Icon name="clipboard-account-outline" size={25} color="#fff" />,
				tabBarVisible: props.navigation.state.index == 0 ? true : false
			})
		},
		Pesquisar: { 
			screen: SearchCapStack,
			navigationOptions: (props) => ({
				tabBarIcon: <Icon name="map-search-outline" size={25} color="#fff" />,
				tabBarVisible: props.navigation.state.index == 0 ? true : false
			})
		},
		Feedback: { 
			screen: FeedbackStack,
			navigationOptions: (props) => ({
				tabBarIcon: <Icon name="ballot-recount-outline" size={25} color="#fff" />,
				tabBarVisible: props.navigation.state.index == 0 ? true : false
			})
		},
	}, {
		initialRouteName: 'Pesquisar',
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
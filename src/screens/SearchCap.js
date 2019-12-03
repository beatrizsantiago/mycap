import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import MapView from 'react-native-maps'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function SearchCap() {

	const [region, setRegion] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.03,
		longitudeDelta: 0.03
	})

	return (
		<View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
			<MapView
				region={region}
				style={{ width: '100%', height: '100%' }}
			/>
		</View>
	)
}

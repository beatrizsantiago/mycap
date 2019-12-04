import React, { useState, useEffect } from 'react'
import { View, Text, Picker, TouchableOpacity, StyleSheet } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import Autocomplete from 'react-native-autocomplete-input'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import CapService from '../services/CapService'

import { Container } from './styles/MainStyled'
import { SearchContainer, AutocompleteContainer, SelectContainer, Select, ButtonClose, ButtonCentralize, ButtonCloseCard, LargeInput, TextLarge, MediumInput, TextMedim, IconsInput } from './styles/SearchCapStyled'

export default function SearchCap() {

	const [listCaps, setListCaps] = useState([])
	const [region, setRegion] = useState({
		latitude: 0.0,
		longitude: 0.0,
		latitudeDelta: 0.03,
		longitudeDelta: 0.03
	})
	const [searchLocale, setSearchLocale] = useState('')
	const [hideResults, setHideResults] = useState(true)

	useEffect(() => {
		CapService.GetCaps()
			.then(caps => setListCaps(caps))

		setCurrentPosition()
	}, [])

	const setCurrentPosition = () => {
		Geolocation.getCurrentPosition(info => setRegion({ latitude: info.coords.latitude, longitude: info.coords.longitude, latitudeDelta: 0.03, longitudeDelta: 0.03 }))
	}

	const clearInput = () => {
		setSearchLocale('')
		setHideResults(true)
		setCurrentPosition()
	}

	return (
		<Container>
			<MapView region={region} style={{ flex: 1 }} showsUserLocation={true} showsMyLocationButton={false}>
				{
					listCaps.map(cap =>
						<Marker key={cap.id} coordinate={{ latitude: parseFloat(cap.latitude), longitude: parseFloat(cap.longitude) }} pinColor="#f68121">
							<Callout>
								<Text>{cap.local}</Text>
							</Callout>
						</Marker>
					)
				}
			</MapView>
			<SearchContainer>
				<View style={{ flexDirection: 'row', width: '100%' }}>
					<AutocompleteContainer>
						<Autocomplete
							onBlur={() => setHideResults(true)}
							hideResults={hideResults}
							data={listCaps}
							defaultValue={searchLocale}
							onChangeText={text => { setSearchLocale(text); setHideResults(false) }}
							listContainerStyle={{ position: 'absolute', marginTop: 42, zIndex: 10 }}
							renderItem={({ item, i }) => (
								<TouchableOpacity style={styles.buttonItem} onPress={() => { }}>
									<Text style={{ fontSize: 16 }}>{item.local}</Text>
								</TouchableOpacity>
							)}
							inputContainerStyle={styles.inputSearch}
							placeholder="Digite o endereço / bairro / CEP da cap..." />

						{
							searchLocale ?
								<ButtonClose onPress={() => clearInput()}>
									<Icon name="window-close" color="#fff" size={30} />
								</ButtonClose>
								: null
						}
					</AutocompleteContainer>
					<ButtonCentralize onPress={() => setCurrentPosition()}>
						<Icon name="crosshairs-gps" color="#404040" size={30} />
					</ButtonCentralize>
				</View>
				<SelectContainer>
					<Select>
						<Picker style={styles.select} >
							<Picker.Item label="Dia" value="" />
							<Picker.Item label="Segunda" value="Segunda" />
							<Picker.Item label="Terça" value="Terca" />
							<Picker.Item label="Quarta" value="Quarta" />
							<Picker.Item label="Quinta" value="Quinta" />
							<Picker.Item label="Sexta" value="Sexta" />
							<Picker.Item label="Sábado" value="Sabado" />
							<Picker.Item label="Domingo" value="Domingo" />
						</Picker>
					</Select>
					<Select>
						<Picker style={styles.select} >
							<Picker.Item label="Hora" value="" />
							<Picker.Item label="18h" value="" />
							<Picker.Item label="18:30h" value="" />
							<Picker.Item label="19:30h" value="" />
							<Picker.Item label="20h" value="" />
							<Picker.Item label="20:30h" value="" />
						</Picker>
					</Select>
				</SelectContainer>
			</SearchContainer>
		</Container>
	)
}

const styles = StyleSheet.create({
	buttonItem: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#e8e8e8'
	},
	inputSearch: {
		marginRight: 4,
		paddingHorizontal: 6,
		backgroundColor: '#fff',
		borderRadius: 5
	},
	select: {
		width: '97%',
		height: 38,
		backgroundColor: '#fff',
	},
	card: {
		position: 'absolute',
		display: 'flex',
		flexDirection: 'column',
		width: '90%',
		height: 240,
		bottom: 0,
		padding: 10,
		backgroundColor: '#fff',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	viewBtn: {
		width: '100%',
		display: 'flex',
		alignItems: 'center'
	}
})

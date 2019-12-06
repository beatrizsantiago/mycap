import React, { useState, useEffect } from 'react'
import { View, Text, Picker, TouchableOpacity, StyleSheet } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import Autocomplete from 'react-native-autocomplete-input'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import CapService from '../services/CapService'

import { Container } from './styles/MainStyled'
import { SearchContainer, AutocompleteContainer, SelectContainer, Select, ButtonClose, ButtonCentralize, ButtonCloseSelect, ButtonCloseCard, LargeInput, TextLarge, MediumInput, TextMedim, IconsInput } from './styles/SearchCapStyled'

export default function SearchCap() {

	const [region, setRegion] = useState({
		latitude: -3.7684145,
		longitude: -38.5174,
		latitudeDelta: 0.03,
		longitudeDelta: 0.03
	})
	const [allCaps, setAllCaps] = useState([])
	const [listCaps, setListCaps] = useState([])
	const [searchLocale, setSearchLocale] = useState('')
	const [hideResults, setHideResults] = useState(true)
	const [searchDay, setSearchDay] = useState('')
	const [searchHour, setSearchHour] = useState('')
	const [inputEditable, setInputEditable] = useState(true)
	const [viewSelects, setViewSelects] = useState(true)

	useEffect(() => {
		listAllCaps()
	}, [])

	listAllCaps = () => {
		CapService.GetCaps()
			.then(caps => { setListCaps(caps); setAllCaps(caps) })

		setCurrentPosition()
	}

	const setCurrentPosition = (lat, long, latD, longD) => {
		// Geolocation.getCurrentPosition(info => setRegion({ 
		// 	latitude: lat ? lat : info.coords.latitude, 
		// 	longitude: long ? long : info.coords.longitude, 
		// 	latitudeDelta: latD ? latD : 0.03, 
		// 	longitudeDelta: longD ? longD : 0.03 
		// }))

		setRegion({
			latitude: lat ? lat : -3.7684145,
			longitude: long ? long : -38.5174,
			latitudeDelta: latD ? latD : 0.03,
			longitudeDelta: longD ? longD : 0.03
		})
	}

	const clearSelects = (day, hour) => {
		if (!day && !hour) {
			setInputEditable(true)
			setListCaps(allCaps)
			setCurrentPosition()

		} else if (day && !hour) {
			let filter = allCaps.filter(filterCap => filterCap.day == day)
			setListCaps(filter)
			setCurrentPosition(null, null, 0.15, 0.15)

		} else if (!day && hour) {
			let filterCaps = allCaps.filter(filterCap => filterCap.hour == hour)
			setListCaps(filterCaps)
			setCurrentPosition(null, null, 0.15, 0.15)
		}
	}

	const handleSearchHour = value => {
		setSearchHour(value)
		setInputEditable(false)

		if (!value) {
			clearSelects(searchDay, value)

		} else if (searchDay != '') {
			let filterCapsHour = allCaps.filter(filterCap => filterCap.day == searchDay && filterCap.hour == value)
			setListCaps(filterCapsHour)
			setCurrentPosition(null, null, 0.15, 0.15)

		} else {
			let filterCapsHour = allCaps.filter(filterCap => filterCap.hour == value)
			setListCaps(filterCapsHour)
			setCurrentPosition(null, null, 0.15, 0.15)
		}
	}

	const handleSearchDay = value => {
		setSearchDay(value)
		setInputEditable(false)

		if (!value) {
			clearSelects(value, searchHour)

		} else if (searchHour != '') {
			let filterCapsDay = allCaps.filter(filterCap => filterCap.day == value && filterCap.hour == searchHour)
			setListCaps(filterCapsDay)
			setCurrentPosition(null, null, 0.15, 0.15)

		} else {
			let filterCapsDay = allCaps.filter(filterCap => filterCap.day == value)
			setListCaps(filterCapsDay)
			setCurrentPosition(null, null, 0.15, 0.15)
		}
	}

	const clearInput = () => {
		setSearchLocale('')
		setViewSelects(true)
		setHideResults(true)
		setCurrentPosition()
		setListCaps(allCaps)
	}

	const handleSearch = resultCap => {
		setListCaps([resultCap])
		setSearchLocale(resultCap.local)
		setViewSelects(false)
		setHideResults(true)
		setCurrentPosition(parseFloat(resultCap.latitude), parseFloat(resultCap.longitude), 0.002, 0.002)
	}

	const dataCaps = listCaps.filter(filterCap => filterCap.local.includes(searchLocale))

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
				<View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
					<AutocompleteContainer>
						<Autocomplete
							editable={inputEditable}
							onBlur={() => setHideResults(true)}
							hideResults={hideResults}
							data={dataCaps}
							defaultValue={searchLocale}
							onChangeText={text => { setSearchLocale(text); setHideResults(false) }}
							listContainerStyle={{ position: 'absolute', marginTop: 42, zIndex: 10 }}
							renderItem={({ item, i }) => (
								<TouchableOpacity style={styles.buttonItem} onPress={() => handleSearch(item)}>
									<Text style={{ fontSize: 16 }}>{item.local}</Text>
								</TouchableOpacity>
							)}
							inputContainerStyle={[styles.inputSearch, { backgroundColor: inputEditable ? '#fff' : '#f0f0f0' }]}
							style={{ height: 40, marginBottom: 2, backgroundColor: inputEditable ? '#fff' : '#f0f0f0' }}
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

				{viewSelects ?
					<SelectContainer>
						<Select>
							<Picker style={styles.select} selectedValue={searchDay} onValueChange={value => handleSearchDay(value)} >
								<Picker.Item label="Dia" value="" />
								<Picker.Item label="Segunda" value="Segunda" />
								<Picker.Item label="Terça" value="Terca" />
								<Picker.Item label="Quarta" value="Quarta" />
								<Picker.Item label="Quinta" value="Quinta" />
								<Picker.Item label="Sexta" value="Sexta" />
								<Picker.Item label="Sábado" value="Sabado" />
								<Picker.Item label="Domingo" value="Domingo" />
							</Picker>
							{searchDay ?
								<ButtonCloseSelect onPress={() => handleSearchDay()}>
									<Icon name="window-close" color="#fff" size={30} />
								</ButtonCloseSelect>
								: null}
						</Select>
						<Select>
							<Picker style={styles.select} selectedValue={searchHour} onValueChange={value => handleSearchHour(value)} >
								<Picker.Item label="Hora" value="" />
								<Picker.Item label="18h" value="18h" />
								<Picker.Item label="18:30h" value="18:30h" />
								<Picker.Item label="19h" value="19h" />
								<Picker.Item label="19:30h" value="19:30h" />
								<Picker.Item label="20h" value="20h" />
								<Picker.Item label="20:30h" value="20:30h" />
							</Picker>
							{searchHour ?
								<ButtonCloseSelect onPress={() => handleSearchHour()}>
									<Icon name="window-close" color="#fff" size={30} />
								</ButtonCloseSelect>
								: null}
						</Select>
					</SelectContainer>
					: null}
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

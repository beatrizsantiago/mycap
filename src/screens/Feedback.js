import React, { useState } from 'react'
import { View, Text, ScrollView, Picker, TouchableOpacity, Image, Alert, Modal, ActivityIndicator } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import ImageView from 'react-native-image-view'
import Icon from 'react-native-vector-icons/Ionicons'

import FeedbackService from '../services/FeedbackService'

import { Container } from './styles/MainStyled'
import { Label, InputText, MediumInput, ColMediumInput, LineInput, TextArea, TakePicture, ViewPicture, IconCamera, IconClose, Button, ViewModal } from './styles/FeedbackStyled'


export default function Feedback() {
	const [idCap, setIdCap] = useState('31AMRepLGqrksGrTlUwY')
	const [quantityPeople, setQuantityPeople] = useState('')
	const [quantityConversion, setQuantityConversion] = useState('')
	const [hasMiracles, setHasMiracles] = useState(false)
	const [quantityMiracles, setQuantityMiracles] = useState('')
	const [descriptionMiracles, setDescriptionMiracles] = useState('')
	const [isImageViewVisible, setIsImageViewVisible] = useState(false)
	const [imageSource, setImageSource] = useState(null)
	const [loading, setLoading] = useState(false)

	const initialState = () => {
		setQuantityPeople('')
		setQuantityConversion('')
		setHasMiracles(false)
		setQuantityMiracles('')
		setDescriptionMiracles('')
		setIsImageViewVisible(false)
		setImageSource(null)
		setLoading(false)
	}

	const showMessage = message => {
		Alert.alert('Atenção!', message, [{ text: 'Ok' }]);
	}

	const sendFeedback = async () => {
		setLoading(true)
		let idFeedback = await FeedbackService.RegisterFeedback(idCap, parseInt(quantityPeople), parseInt(quantityConversion), hasMiracles == true ? parseInt(quantityMiracles) : 0, descriptionMiracles)

		if (imageSource) {
			let urlImage = await FeedbackService.UploadImageFeedback(imageSource.path, imageSource.name, idFeedback)
			FeedbackService.UpdateFeedback(idFeedback, urlImage)
				.then(() => {initialState(); return showMessage('Feedback enviado com sucesso.')})
		} else {
			initialState()
			return showMessage('Feedback enviado com sucesso.')
		}
	}

	const validateFeedback = () => {
		if (quantityPeople == '') {
			return showMessage('Por favor, informe a quantidade de pessoas presentes.')

		} else if (quantityConversion == '') {
			return showMessage('Por favor, informe a quantidade de conversões.')

		} else if (hasMiracles == true && quantityMiracles == '') {
			return showMessage('Por favor, informe a quantidade de milagres.')

		} else {
			sendFeedback()
		}
	}

	const showImage = () => imageSource ?
		<ImageView
			images={[{ source: imageSource.image, width: imageSource.width, height: imageSource.height }]}
			imageIndex={0}
			isVisible={isImageViewVisible}
			onClose={() => setIsImageViewVisible(false)}
			animationType="fade"
		/> : null

	const selectPhotoTapped = () => {
		const options = {
			title: 'Selecione uma foto',
			cancelButtonTitle: 'Cancelar',
			takePhotoButtonTitle: 'Abrir câmera',
			chooseFromLibraryButtonTitle: 'Escolher da galeria',
			quality: 1.0,
			storageOptions: {
				skipBackup: true,
			},
		}

		ImagePicker.showImagePicker(options, response => {
			console.warn(response);

			if (response.didCancel) {
				return null
			} else if (response.error) {
				console.warn('ImagePicker Error: ', response.error);
			} else {
				let source = { uri: `data:${response.type};base64,${response.data}` }
				setImageSource({ width: response.width, height: response.height, path: response.path, name: response.fileName, image: source })
			}
		});
	}

	return (
		<Container>
			<ScrollView>
				<MediumInput>
					<ColMediumInput>
						<Label>N° de Pessoas</Label>
						<InputText keyboardType="numeric" value={quantityPeople} onChangeText={value => setQuantityPeople(value)} />
					</ColMediumInput>

					<ColMediumInput>
						<Label>N° de Conversões</Label>
						<InputText keyboardType="numeric" value={quantityConversion} onChangeText={value => setQuantityConversion(value)} />
					</ColMediumInput>
				</MediumInput>

				<LineInput>
					<Label>Houve Milagres? </Label>
					<Picker selectedValue={hasMiracles} onValueChange={value => setHasMiracles(value)} style={{ marginLeft: 12, marginTop: 2, width: 125 }}>
						<Picker.Item label="Não" value={false} />
						<Picker.Item label="Sim" value={true} />
					</Picker>
				</LineInput>

				{hasMiracles ?
					<View>
						<LineInput>
							<Label>Quantidade de Milagres:</Label>
							<InputText keyboardType="numeric" value={quantityMiracles} onChangeText={value => setQuantityMiracles(value)} style={{ width: 50 }} />
						</LineInput>

						<Label>Descrição</Label>
						<TextArea multiline={true} value={descriptionMiracles} onChangeText={value => setDescriptionMiracles(value)} />
					</View>
					: null
				}

				<Label>Enviar Foto</Label>
				{imageSource ?
					<ViewPicture>
						<TouchableOpacity onPress={() => setIsImageViewVisible(true)} style={{ width: '100%', height: '100%' }}>
							<Image style={{ width: '100%', height: '100%' }} source={imageSource.image} />
						</TouchableOpacity>
						<IconCamera onPress={() => selectPhotoTapped()}>
							<Icon name="ios-camera" size={42} color="#fff" />
						</IconCamera>
						<IconClose onPress={() => setImageSource(false)}>
							<Icon name="ios-close-circle" size={35} color="#fff" />
						</IconClose>
					</ViewPicture>
					:
					<TakePicture onPress={() => selectPhotoTapped()}>
						<Text style={{ fontSize: 16, marginRight: 5, color: '#5c5c5c', textTransform: 'uppercase' }}>Selecione uma foto</Text>
						<Icon name="ios-camera" size={35} color="#5c5c5c" />
					</TakePicture>
				}

				<Button onPress={() => validateFeedback()}>
					<Text style={{ color: '#fff', fontSize: 18 }}>Enviar Feedback</Text>
				</Button>

				{showImage()}

				<Modal animationType="fade" transparent={true} visible={loading}>
					<ViewModal>
						<ActivityIndicator size="large" color="#fff" />
						<Text style={{ color: '#fff', fontSize: 20, marginTop: 5 }}>Enviando Feedback...</Text>
					</ViewModal>
				</Modal>

			</ScrollView>
		</Container>
	)
}

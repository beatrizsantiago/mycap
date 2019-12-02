import React, { useState } from 'react'
import { View, Text, ScrollView, Picker, TouchableOpacity, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import ImageView from 'react-native-image-view'
import Icon from 'react-native-vector-icons/Ionicons'

import { Container } from './styles/MainStyled'
import { Label, InputText, MediumInput, ColMediumInput, LineInput, TextArea, TakePicture, ViewPicture, IconCamera, IconClose } from './styles/FeedbackStyled'


export default function Feedback() {
	const [idCap, setIdCap] = useState('')
	const [quantityPeople, setQuantityPeople] = useState('')
	const [quantityConversion, setQuantityConversion] = useState('')
	const [hasMiracles, setHasMiracles] = useState(false)
	const [quantityMiracles, setQuantityMiracles] = useState('')
	const [descriptionMiracles, setDescriptionMiracles] = useState('')
	const [isImageViewVisible, setIsImageViewVisible] = useState(false)
	const [imageSource, setImageSource] = useState(null)

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
			if (response.didCancel) {
				return null
			} else if (response.error) {
				console.warn('ImagePicker Error: ', response.error);
			} else {
				let source = { uri: `data:${response.type};base64,${response.data}` }
				setImageSource({ width: response.width, height: response.height, image: source })
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
						<TextArea numberOfLines={10} multiline={true} value={descriptionMiracles} onChangeText={value => setDescriptionMiracles(value)} />
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

				{showImage()}

			</ScrollView>
		</Container>
	)
}

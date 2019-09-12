import React, { Component } from 'react';
import { View, Text, ScrollView, Picker, TextInput, StyleSheet, PixelRatio, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Entypo'

import { Container } from './styles/MainStyled'
import { Label, InputText, MediumInput, ColMediumInput, LineInput, TextArea, TakePicture, ViewPicture } from './styles/FeedbackStyled'


export default class Feedback extends Component {
	state = {
		idCap: '',
		quantityPeople: 0,
		quantityConversion: 0,
		dateFeedback: new Date(),
		quantityMiracles: 0,
		descriptionMiracles: '',
		photoCap: '',
		imageSource: null,
	}

	selectPhotoTapped = () => {
		const options = {
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
			storageOptions: {
				skipBackup: true,
			},
		};

		ImagePicker.showImagePicker(options, response => {
			console.warn('Response = ', response);

			if (response.didCancel) {
				console.warn('User cancelled photo picker');
			} else if (response.error) {
				console.warn('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.warn('User tapped custom button: ', response.customButton);
			} else {
				let source = { uri: 'data:image/jpeg;base64,' + response.data };

				this.setState({
					imageSource: source,
				});
			}
		});
	}

	render() {
		return (
			<Container>
				<ScrollView>
					<MediumInput>
						<ColMediumInput>
							<Label>N° de Pessoas</Label>
							<InputText />
						</ColMediumInput>

						<ColMediumInput>
							<Label>N° de Conversões</Label>
							<InputText />
						</ColMediumInput>
					</MediumInput>

					<LineInput>
						<Label>Houve Milagres? </Label>
						<Picker style={{ marginLeft: 12, marginTop: 2, fontSize: 20, width: 150 }}>
							<Picker.Item label="Não" value="false" />
							<Picker.Item label="Sim" value="true" />
						</Picker>
					</LineInput>

					<LineInput>
						<Label>Quantidade de Milagres:</Label>
						<InputText style={{ width: 50 }} />
					</LineInput>

					<Label>Descrição</Label>
					<TextArea numberOfLines={10} multiline={true} />

					<Label>Enviar Foto</Label>
					{this.state.imageSource ?
						<ViewPicture>
							<Image style={{ width: '100%', height: '100%' }} source={this.state.imageSource} />
						</ViewPicture>
						:
						<TakePicture onPress={() => this.selectPhotoTapped()}>
							<Text style={{ fontSize: 16, marginRight: 5, color: '#5c5c5c', textTransform: 'uppercase' }}>Selecione uma foto</Text>
							<Icon name="camera" size={25} color="#5c5c5c" />
						</TakePicture>
					}



					{/* <TouchableOpacity onPress={() => this.selectPhotoTapped()}>
							<ViewPicture>
								{this.state.imageSource ?
									<Image style={styles.avatar} source={this.state.imageSource} />
									:
									<View>
										<Text>Selecione uma Foto</Text>
										<Icon name="camera" size={30} color="#000" />
									</View>
								}
							</ViewPicture>
						</TouchableOpacity> */}

				</ScrollView>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	avatarContainer: {
		borderColor: '#9B9B9B',
		borderWidth: 1 / PixelRatio.get(),
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatar: {
		borderRadius: 75,
		width: 150,
		height: 150,
	},
});

import React, { Component } from 'react';
import { View, Text, ScrollView, Picker, TextInput } from 'react-native';

import { Container } from './styles/MainStyled'
import { Label, InputText, MediumInput, ColMediumInput, LineInput, TextArea } from './styles/FeedbackStyled'

export default class Feedback extends Component {
	state = {
		idCap: '',
		quantityPeople: 0,
		quantityConversion: 0,
		dateFeedback: new Date(),
		quantityMiracles: 0,
		descriptionMiracles: '',
		photoCap: '',
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

				</ScrollView>
			</Container>
		)
	}
}

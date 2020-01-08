import React, { useState, useEffect } from 'react'
import { View, Text, Image, Modal, ActivityIndicator, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import IconMComm from 'react-native-vector-icons/MaterialCommunityIcons'

import UserService from '../services/UserService'

import AsyncStorage from '@react-native-community/async-storage'
import StoreKeys from '../config/storeKeys'

import { ContainerGray } from './styles/MainStyled'
import { Spacing, BoxProfile, BoxImage, CircleImage, ButtonAlter, UserName, UserEmail, UserTelefone, Row, MediumBoxWhite, MediumBoxWhitePress, CircleMedim } from './styles/ProfileStyled'

export default function Profile(props) {

    const [profileLeader, setProfileLeader] = useState({})

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        let user = await AsyncStorage.getItem(StoreKeys.UidLogin)
        let datasProfile = await UserService.ProfileLeader(user)
        setProfileLeader(datasProfile)
        console.warn(datasProfile);
    }

    const navigateFeedbacks = () => props.navigation.push('ListFeedbacks') //fazer validação para não navegar caso não tenha feedback

    alterImageProfile = () => {
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
                UserService.UpdateImageProfile(response.path, response.fileName)
                    .then(() => getProfile())
			}
		})
    }

    return (
        <ContainerGray>
            <Spacing />
            <BoxProfile>
                <BoxImage>
                    <CircleImage>
                        <Image style={{ width: '90%', height: '90%', borderRadius: 100 }} source={{ uri: profileLeader.photoProfile || 'https://www.sunsetlearning.com/wp-content/uploads/2019/09/User-Icon-Grey.png' }} />
                    </CircleImage>
                    <ButtonAlter onPress={() => alterImageProfile()}>
                        <IconMaterial name="edit" size={20} color="#fff" />
                    </ButtonAlter>
                </BoxImage>
                <UserName>{profileLeader.name}</UserName>
                <UserEmail>{profileLeader.email}</UserEmail>
                <TouchableOpacity>
                    <UserTelefone>{profileLeader.telephone}</UserTelefone>
                </TouchableOpacity>
            </BoxProfile>

            <Row>
                <MediumBoxWhitePress>
                    <CircleMedim>
                        <IconMComm name="textbox-password" size={36} color="#f68121" />
                    </CircleMedim>
                    <Text>Alterar Senha</Text>
                </MediumBoxWhitePress>
                <MediumBoxWhitePress onPress={() => navigateFeedbacks()}>
                    <CircleMedim>
                        <IconMComm name="message-bulleted" size={36} color="#f68121" />
                    </CircleMedim>
                    <Text>N° Feedbacks</Text>
                </MediumBoxWhitePress>
            </Row>

            <Row>
                <MediumBoxWhite>

                </MediumBoxWhite>
                <MediumBoxWhite>

                </MediumBoxWhite>
            </Row>

        </ContainerGray>
    )
}
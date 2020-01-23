import React, { useState, useEffect } from 'react'
import { View, Text, Image, Alert, Modal, ActivityIndicator, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import IconMComm from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextInputMask } from 'react-native-masked-text'

import UserService from '../services/UserService'

import AsyncStorage from '@react-native-community/async-storage'
import StoreKeys from '../config/storeKeys'

import { ContainerGray } from './styles/MainStyled'
import {
    Spacing, BoxProfile, BoxImage, CircleImage, ButtonAlter, UserName, UserEmail, UserTelefone, Row, MediumBoxWhite,
    MediumBoxWhitePress, CircleMedim, TextBox, ModalAlter, ContainerModal, InputPassword, AlignInputPassword, BoxIconViewPassword,
    ViewButtons, ButtonEnable, ButtonDisable
} from './styles/ProfileStyled'

export default function Profile(props) {

    const [profileLeader, setProfileLeader] = useState({})
    const [editTelephone, setEditTelephone] = useState(false)
    const [newTelephone, setNewTelephone] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [securyText, setSecuryText] = useState(true)
    const [newPassword, setNewPassword] = useState('')

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        let user = await AsyncStorage.getItem(StoreKeys.UidLogin)
        let datasProfile = await UserService.ProfileLeader(user)
        setProfileLeader(datasProfile)
        setNewTelephone(datasProfile.telephone)
    }

    const alertMessage = message => Alert.alert('Atenção!', message, [{ text: 'OK' }])

    const navigateFeedbacks = () => props.navigation.push('ListFeedbacks')

    const alterPassword = () => {
        UserService.UpdatePassword(newPassword)
            .then(() => {
                setIsModalVisible(false)
                return alertMessage("Senha Alterada")
            })
            .catch(() => {
                setIsModalVisible(false)
                return alertMessage("Não foi possível alterar sua senha. Tente novamente mais tarde.")
            })
    }

    const alterTelephone = () => {
        UserService.UpdateTelephone(newTelephone)
            .then(() => {
                getProfile()
                setEditTelephone(false)
            })
    }

    const alterImageProfile = () => {
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
                {
                    !editTelephone ?
                        <TouchableOpacity onPress={() => setEditTelephone(true)}>
                            <UserTelefone>{profileLeader.telephone}</UserTelefone>
                        </TouchableOpacity>
                        :
                        <TextInputMask
                            style={{ height: 20, padding: 0, margin: 0 }}
                            type={'cel-phone'}
                            options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }}
                            onChangeText={text => setNewTelephone(text)}
                            value={newTelephone}
                            keyboardType="numeric"
                            autoFocus={true}
                            onSubmitEditing={() => alterTelephone()}
                        />
                }
            </BoxProfile>

            <Row>
                <MediumBoxWhitePress onPress={() => setIsModalVisible(true)}>
                    <CircleMedim>
                        <IconMComm name="textbox-password" size={36} color="#f68121" />
                    </CircleMedim>
                    <TextBox>Alterar Senha</TextBox>
                </MediumBoxWhitePress>
                <MediumBoxWhitePress onPress={() => navigateFeedbacks()}>
                    <CircleMedim>
                        <IconMComm name="message-bulleted" size={36} color="#f68121" />
                    </CircleMedim>
                    <TextBox>Feedbacks</TextBox>
                </MediumBoxWhitePress>
            </Row>

            <Row>
                <MediumBoxWhitePress onPress={() => props.navigation.push('ViewPreaching')}>
                    <CircleMedim>
                        <IconMComm name="file-document-box-multiple-outline" size={36} color="#f68121" />
                    </CircleMedim>
                    <TextBox>Ver Palavra</TextBox>
                </MediumBoxWhitePress>
                <MediumBoxWhite>

                </MediumBoxWhite>
            </Row>

            <Modal animationType="fade" transparent={true} visible={isModalVisible}>
                <ModalAlter>
                    <ContainerModal>
                        <Text style={{ fontSize: 17, color: '#2b2b2b' }}>Digite sua nova senha:</Text>
                        <Text style={{ fontSize: 12, color: '#2b2b2b' }}>(A senha deve ter entre 4 e 10 caracteres)</Text>
                        <AlignInputPassword>
                            <InputPassword maxLength={10} secureTextEntry={securyText} value={newPassword} onChangeText={text => setNewPassword(text)} />
                            <BoxIconViewPassword onPress={() => setSecuryText(!securyText)}>
                                <IconMComm name={securyText ? 'eye' : 'eye-off'} color="#f68121" size={25} />
                            </BoxIconViewPassword>
                        </AlignInputPassword>
                        <ViewButtons>
                            <ButtonDisable onPress={() => setIsModalVisible(false)}>
                                <Text style={{ fontSize: 15, color: '#f68121' }}>Cancelar</Text>
                            </ButtonDisable>
                            <ButtonEnable onPress={() => alterPassword()}>
                                <Text style={{ fontSize: 15, color: '#fff' }}>Alterar</Text>
                            </ButtonEnable>
                        </ViewButtons>
                    </ContainerModal>
                </ModalAlter>
            </Modal>

        </ContainerGray>
    )
}
import React, { useState, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, Alert, PermissionsAndroid, Platform, Image, Modal, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'

import UserService from '../services/UserService'

import StoreKeys from '../config/storeKeys'

import { Container, ContainerGray } from './styles/MainStyled'
import { Spacing, BoxProfile, BoxImage, CircleImage, ButtonAlter, UserName, UserEmail, UserTelefone, Row, MediumBoxWhite } from './styles/ProfileStyled'

export default function Profile() {
    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        let user = await AsyncStorage.getItem(StoreKeys.UidLogin)
        console.warn(user);
    }

    return (
        <ContainerGray>
            <Spacing />
            <BoxProfile>
                <BoxImage>
                    <CircleImage>
                        <Image style={{ width: '90%', height: '90%', borderRadius: 100 }} source={{uri: 'https://img1.ak.crunchyroll.com/i/spire1/9e3c42b298370225ccfe7a1e890a14991566505370_large.jpg'}} />
                    </CircleImage>
                    <ButtonAlter>
                        <IconMaterial name="edit" size={20} color="#fff" />
                    </ButtonAlter>
                </BoxImage>
                <UserName>Beatriz Santiago</UserName>
                <UserEmail>biabeatriz1999@email.com</UserEmail>
                <UserTelefone>(00) 00000-0000</UserTelefone>
            </BoxProfile>

            <Row>
                <MediumBoxWhite>
                    <Text>Alterar Senha</Text>
                </MediumBoxWhite>
                <MediumBoxWhite>
                    <Text>N° Feedbacks</Text>
                </MediumBoxWhite>
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
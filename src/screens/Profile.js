import React, { useState, useEffect } from 'react'
import { Text, KeyboardAvoidingView, Alert, PermissionsAndroid, Platform, Image, Modal, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/MaterialIcons'

import UserService from '../services/UserService'

import StoreKeys from '../config/storeKeys'

import { Container, ViewModal } from './styles/MainStyled'
import { BoxProfile, BoxImage, CircleImage, ButtonAlter, UserName, UserEmail } from './styles/ProfileStyled'

export default function Profile() {
    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        let user = await AsyncStorage.getItem(StoreKeys.UidLogin)
        console.warn(user);
    }

    return (
        <Container>
            <BoxProfile>
                <BoxImage>
                    <CircleImage source={{uri: 'https://img.elo7.com.br/product/original/E14CAB/papel-de-parede-palha-cinza-1402-papel-de-parede.jpg'}} />
                    <ButtonAlter>
                        <Icon name="edit" size={20} color="#fff" />
                    </ButtonAlter>
                </BoxImage>
                <UserName>Beatriz Santiago</UserName>
                <UserEmail>biabeatriz1999@email.com</UserEmail>
            </BoxProfile>

        </Container>
    )
}
import React, { useState, useEffect } from 'react'
import { View, Text, Alert, Image, Modal, ActivityIndicator, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import CapService from '../services/CapService'

import { ContainerGray } from './styles/MainStyled'
import { CapCard, LargeField } from './styles/ListCapsStyled'

export default function ListCaps(props) {

    const [allCaps, setAllCaps] = useState([])

    useEffect(() => {
        getListCaps()
    }, [])

    const getListCaps = () => {
        CapService.GetCapsLeader()
            .then(caps => {
                setAllCaps(caps)
            })
    }

    return (
        <ContainerGray>
            <ScrollView style={{ flex: 1, width: '100%' }}>
                {
                    allCaps.map((cap, index) => (
                        <CapCard key={index} onPress={() => props.navigation.push('Feedback', { cap })}>
                            <LargeField>
                                <Icon name="home-map-marker" color="#f68121" size={30} />
                                <Text style={{ fontSize: 18, width: '88%' }}>{cap.local}</Text>
                            </LargeField>
                            <LargeField>
                                <Icon name="calendar-multiselect" color="#f68121" size={30} />
                                <Text style={{ fontSize: 18, width: '37%' }}>{cap.day}</Text>
                                <Icon name="clock-outline" color="#f68121" size={30} />
                                <Text style={{ fontSize: 18, width: '37%' }}>{cap.hour}</Text>
                            </LargeField>
                        </CapCard>
                    ))
                }
            </ScrollView>
        </ContainerGray>
    )
}
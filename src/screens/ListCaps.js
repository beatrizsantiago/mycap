import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import CapService from '../services/CapService'

import { ContainerGray } from './styles/MainStyled'
import { CapCard, LargeField } from './styles/ListCapsStyled'

export default function ListCaps(props) {

    const [allCaps, setAllCaps] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getListCaps()
    }, [])

    const getListCaps = () => {
        setLoading(true)
        CapService.GetCapsLeader()
            .then(caps => {
                setAllCaps(caps)
                setLoading(false)
            })
    }

    return (
        <ContainerGray>
            {
                loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#f68121" />
                    </View>
                    :
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
            }
        </ContainerGray>
    )
}
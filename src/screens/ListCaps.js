import React, { useState, useEffect } from 'react'
import { View, Text, Alert, Image, Modal, ActivityIndicator, ScrollView } from 'react-native'

import CapService from '../services/CapService'

import { ContainerGray } from './styles/MainStyled'
import { CapCard } from './styles/ListCapsStyled'

export default function ListCaps() {

    const [allCaps, setAllCaps] = useState([])

    useEffect(() => {
        getListCaps()
    }, [])

    const getListCaps = () => {
        CapService.GetCapsLeader()
            .then(caps => setAllCaps(caps))
    }

    return (
        <ContainerGray>
            <ScrollView style={{ flex: 1, width: '100%' }}>
                {
                    allCaps.map((cap, index) => (
                        <CapCard key={index}>

                        </CapCard>
                    ))
                }
            </ScrollView>
        </ContainerGray>
    )
}
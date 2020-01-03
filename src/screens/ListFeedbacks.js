import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from "react-native"
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import IconAntDesign from 'react-native-vector-icons/AntDesign'

import FeedbackService from '../services/FeedbackService'

import { ContainerGray } from './styles/MainStyled'
import { DateFeedbackCard, EmptyFeedback, TextEmptyFeedback } from './styles/FeedbackListStyled'

export default function ListFeedbacks(props) {

    const [feedbacksCap, setFeedbacksCap] = useState([])

    useEffect(() => {
        FeedbackService.GetFeedbacks()
        // setFeedbacksCap(feedbacks)
    }, [])

    const handlePress = feedback => {
        props.navigation.push('', { feedback })
    }

    return (
        <ContainerGray>
            <ScrollView style={{ flex: 1, width: '100%' }}>
                {/* {
                    feedbacksCap.map(feedback => (
                        <DateFeedbackCard key={feedback.id} onPress={() => handlePress(feedback)}>
                            <Text style={{ fontSize: 16 }}>{moment(feedback.dateFeedback.seconds * 1000).format('DD/MM/YYYY [às] HH:MM')}</Text>
                            <Icon name="arrow-right" size={16} color="#f68121" />
                        </DateFeedbackCard>
                    ))
                } */}
            </ScrollView>
        </ContainerGray>
    )
}
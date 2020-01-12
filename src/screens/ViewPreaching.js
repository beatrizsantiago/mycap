import React, { useState, useEffect } from 'react'
import { View, Text, Clipboard } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Pdf from 'react-native-pdf'

import PreachingService from '../services/PreachingService'

import { ContainerGray } from './styles/MainStyled'
import { LargeBox, TitleBox, TitleTheme, BoxInput, InputUrl, ButtonCopy, ContainerPdf, ButtonDownload, TitleBoxPdf } from './styles/ViewPreachingStyled'

export default function ViewPreaching(props) {

    const [filePreaching, setFilePreaching] = useState({})

    useEffect(() => {
        const date = new Date()
        date.setDate(new Date().getDate() - 6)

        PreachingService.GetFile(date)
            .then(file => setFilePreaching(file))
    }, [])

    return (
        <ContainerGray>
            <LargeBox>
                <TitleBox>Tema da Semana</TitleBox>
                <TitleTheme>{filePreaching.title}</TitleTheme>
            </LargeBox>
            {
                filePreaching.urlVideo ?
                    <LargeBox>
                        <TitleBox>Video de apoio</TitleBox>
                        <BoxInput>
                            <InputUrl value={filePreaching.urlVideo} editable={false} />
                            <ButtonCopy onPress={() => Clipboard.setString(filePreaching.urlVideo)}>
                                <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>Copiar Url</Text>
                            </ButtonCopy>
                        </BoxInput>
                    </LargeBox>
                    : null
            }
            <ContainerPdf>
                <TitleBoxPdf>Anexo do Arquivo</TitleBoxPdf>
                <ButtonDownload>
                    <Icon name="download" color="#f68121" size={30} />
                </ButtonDownload>
                <Pdf
                    scale={1.48}
                    source={{ uri: filePreaching.urlPdfPreaching }}
                    activityIndicatorProps={{ color: '#f68121', progressTintColor: '#f68121' }}
                    style={{ width: '100%', height: '90%' }}
                />
            </ContainerPdf>
        </ContainerGray>
    )
}
import React, { useState, useEffect } from 'react'
import { View, Text, Clipboard, Modal, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Pdf from 'react-native-pdf'
import RNFetchBlob from 'rn-fetch-blob'

import PreachingService from '../services/PreachingService'

import { ContainerGray, ViewModal } from './styles/MainStyled'
import {
    LargeBox, TitleBox, TitleTheme, BoxInput, InputUrl, ButtonCopy, ContainerPdf, ButtonDownload, ButtonFull, TitleBoxPdf, BoxEmptyFile,
    TextEmpty, CloseModal
} from './styles/ViewPreachingStyled'

export default function ViewPreaching(props) {

    const [filePreaching, setFilePreaching] = useState({})
    const [emptyFile, setEmptyFile] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        const date = new Date()
        date.setDate(new Date().getDate() - 6)

        PreachingService.GetFile(date)
            .then(file => {
                let isEmpty = Object.keys(file).length == 0 ? true : false
                setEmptyFile(isEmpty)

                setFilePreaching(file)
            })
    }, [])

    const download = () => {
        let dirs = RNFetchBlob.fs.dirs
        RNFetchBlob
            .config({
                fileCache: true,
                path: dirs.DocumentDir + `/${filePreaching.title}.pdf`
            })
            .fetch('GET', filePreaching.urlPdfPreaching)
            .then((res) => Alert.alert('Sucesso!', `Arquivo salvo em: ${res.path()}`, [{ text: 'OK' }]))
    }

    const copyUrlVideo = () => {
        Clipboard.setString(filePreaching.urlVideo)
    }

    return (
        <View style={{ flex: 1 }}>
            {
                emptyFile ?
                    <BoxEmptyFile>
                        <Icon name="file-alert" color="#e3e3e3" size={180} />
                        <TextEmpty>Aguarde! A palavra da cap desta</TextEmpty>
                        <TextEmpty>semana ainda não foi submetida.</TextEmpty>
                    </BoxEmptyFile>
                    :
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
                                        <ButtonCopy onPress={() => copyUrlVideo()}>
                                            <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>Copiar Url</Text>
                                        </ButtonCopy>
                                    </BoxInput>
                                </LargeBox>
                                : null
                        }
                        <ContainerPdf>
                            <TitleBoxPdf>Anexo do Arquivo</TitleBoxPdf>
                            <ButtonDownload onPress={() => download()}>
                                <Icon name="download" color="#f68121" size={28} />
                            </ButtonDownload>
                            <ButtonFull onPress={() => setIsModalVisible(true)}>
                                <Icon name="fullscreen" color="#f68121" size={30} />
                            </ButtonFull>
                            <Pdf
                                scale={1.48}
                                source={{ uri: filePreaching.urlPdfPreaching }}
                                activityIndicatorProps={{ color: '#f68121', progressTintColor: '#f68121' }}
                                style={{ width: '100%', height: '90%' }}
                            />
                        </ContainerPdf>
                        <Modal animationType="fade" transparent={true} visible={isModalVisible}>
                            <ViewModal>
                                <Pdf scale={1.0} source={{ uri: filePreaching.urlPdfPreaching || '' }} activityIndicatorProps={{ color: '#fff', progressTintColor: '#fff' }} style={{ width: '100%', height: '100%' }} />
                                <CloseModal onPress={() => setIsModalVisible(false)}>
                                    <Icon name="close-circle" color="#f68121" size={36} />
                                </CloseModal>
                            </ViewModal>
                        </Modal>
                    </ContainerGray>
            }
        </View>
    )
}
import styled from 'styled-components/native'

export const LargeBox = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 70px;
    margin: 5px 5px;
    padding: 4px;
    background-color: #fff;
`

export const TitleBox = styled.Text`
    font-size: 15px;
    text-transform: uppercase;
    color: #616161;
`

export const TitleTheme = styled.Text`
    margin-top: 5px;
    font-size: 18px;
    color: #000;
    text-align: center;
`

export const BoxInput = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
`

export const InputUrl = styled.TextInput`
    width: 75%;
    height: 30px;
    padding: 5px;
    border: solid 1px #dbdbdb;
    border-radius: 5px;
    font-size: 15px;
`

export const ButtonCopy = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22%;
    height: 30px;
    margin-left: 5px;
    border-radius: 5px;
    background-color: #f68121;
`

export const ContainerPdf = styled.View`
    display: flex;
    flex: 1;
    align-items: center;
    width: 100%;
    margin: 5px 5px;
    padding: 4px 6px;
    background-color: #fff;
`

export const TitleBoxPdf = styled.Text`
    margin: 6px 0px 8px 0px;
    font-size: 15px;
    text-transform: uppercase;
    color: #616161;
`

export const ButtonDownload = styled.TouchableOpacity`
    position: absolute;
    top: 4px;
    right: 5px;
`
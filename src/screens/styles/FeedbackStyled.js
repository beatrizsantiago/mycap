import styled from 'styled-components/native'

export const Label = styled.Text`
    margin: 14px 12px 0px 12px;
    font-size: 18px;
    color: #000;
    font-weight: bold;
`

export const InputText = styled.TextInput`
    height: 42px;
    margin: 0px 12px;
    padding: 1px;
    border-bottom-width: 2px;
    border-bottom-color: #9c9c9c;
    font-size: 20px;
`

export const MediumInput = styled.View`
    display: flex;
    flex-direction: row;
`

export const ColMediumInput = styled.View`
    display: flex;
    flex-direction: column;
    width: 50%;
`

export const LineInput = styled.View`
    display: flex;
    flex-direction: row;
`

export const TextArea = styled.TextInput`
    height: 100px;
    margin: 5px 12px;
    padding: 8px;
    text-align: center;
    font-size: 16px;
    border: solid 1px #9c9c9c;
    border-radius: 4px;
    background-color: #fff;
`

export const TakePicture = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 5px 12px;
    padding: 5px;
    border: solid 1px #9c9c9c;
    border-radius: 4px;
`

export const ViewPicture = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 220px;
    margin: 5px 12px;
    padding: 4px;
    border: solid 1px #9c9c9c;
    border-radius: 4px;
`

export const IconCamera = styled.TouchableOpacity`
    position: absolute;
    top: 2px;
    right: 12px;
`

export const IconClose = styled.TouchableOpacity`
    position: absolute;
    top: 8px;
    left: 12px;
`

export const Button = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    margin: 10px 12px;
    border-radius: 5px;
    background-color: #f68121;
`
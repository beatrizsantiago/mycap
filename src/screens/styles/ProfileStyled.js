import styled from 'styled-components/native'

export const Spacing = styled.View`
    width: 100%;
    height: 82px;
`

export const BoxProfile = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 145px;
    padding: 10px;
    background-color: #fff;
`

export const BoxImage = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 140px;
    height: 140px;
`

export const CircleImage = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 100px;
    background-color: #fff;
`

export const ButtonAlter = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 30%;
    height: 30%;
    border-radius: 100px;
    background-color: rgba(246, 129, 33, 0.9);
`

export const UserName = styled.Text`
    font-size: 20px;
    color: #242424;
`

export const UserEmail = styled.Text`
    font-size: 16px;
    color: #616161;
`

export const UserTelefone = styled.Text`
    font-size: 14px;
    color: #616161;
`

export const Row = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    width: 100%;
`

export const MediumBoxWhite = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 48.5%;
    height: 90px;
    padding: 4px;
    background-color: #fff;
`

export const MediumBoxWhitePress = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 48.5%;
    height: 90px;
    padding: 4px;
    background-color: #fff;
`

export const CircleMedim = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    margin: 0 6px;
    border-radius: 50px;
    background-color: rgba(246, 129, 33, 0.2);
`

export const TextBox = styled.Text`
    font-size: 15px;
`

export const ModalAlter = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
`

export const ContainerModal = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 300px;
    background-color: #fff;
    border-radius: 4px;
`

export const InputPassword = styled.TextInput`
    width: 82%;
    height: 40px;
    margin: 20px 0px;
    padding: 5px;
    border: solid 1px #dbdbdb;
    border-radius: 5px;
    font-size: 15px;
`

export const AlignInputPassword = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const BoxIconViewPassword = styled.TouchableOpacity`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 38px;
    right: 3%;
    background-color: #fff;
`

export const ViewButtons = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 82%;
`

export const ButtonEnable = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 47%;
    height: 35px;
    background-color: #f68121;
`

export const ButtonDisable = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 47%;
    height: 35px;
    border: solid 1px #f68121;
    background-color: #fff;
`
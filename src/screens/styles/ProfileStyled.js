import styled from 'styled-components/native'

export const BoxProfile = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    background-color: pink;
`

export const BoxImage = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    background-color: green;
`

export const CircleImage = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 100px;
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
    background-color: orange;
`

export const UserName = styled.Text`
    font-size: 20px;
    color: #242424;
`

export const UserEmail = styled.Text`
    font-size: 16px;
    color: #616161;
`
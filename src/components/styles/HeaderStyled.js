import styled from 'styled-components/native'

export const Bar = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    height: 60px;
    border-bottom-color: #ebebeb;
    border-bottom-width: 2px;
    background-color: #fff;
`

export const TitleCenter = styled.View`
    position: absolute;
    width: 100%;
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const Title = styled.Text`
    font-size: 22px;
`
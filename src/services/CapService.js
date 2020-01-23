import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'
import StoreKeys from '../config/storeKeys'

let CollectionCaps = firebase.firestore().collection('caps')

export async function GetCaps() {
    try {
        let listCaps = []
        let caps = await CollectionCaps.where('active', '==', true).get()
        caps.docs.forEach(cap => listCaps.push({ id: cap.id, ...cap.data() }))

        let allInfoCaps = []
        let getLeaders = listCaps.map(async cap => {
            let leader = await cap.leader.get()

            allInfoCaps.push({ ...cap, leader: { id: leader.id, ...leader.data() } })
        })

        await Promise.all(getLeaders)

        return allInfoCaps

    } catch (error) {
        console.warn("Error GetCaps: ", error);
        throw error
    }
}

export async function GetCapsLeader() {
    try {
        let leadeId = await AsyncStorage.getItem(StoreKeys.IdLeader)
        let leaderRef = firebase.firestore().collection('leaders').doc(leadeId)

        let caps = await CollectionCaps.where('leader', '==', leaderRef).get()

        let allCapsLeader = []
        caps.docs.forEach(cap => allCapsLeader.push({ id: cap.id, ...cap.data() }))

        return allCapsLeader

    } catch (error) {
        console.warn("Error GetCapsLeader: ", error);
        throw error
    }
}

export default { GetCaps, GetCapsLeader }
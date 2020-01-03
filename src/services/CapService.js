import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'
import StoreKeys from '../config/storeKeys'

let CollectionCaps = firebase.firestore().collection('caps')

export async function GetCaps() {
    try {
        let listCaps = [];

        let caps = await CollectionCaps.where('active', '==', true).get();

        caps.docs.forEach(cap => {
            let capData = cap.data()
            let leaderCap = {}
            capData.leader.get()
                .then(ldr => {
                    leaderCap = { id: ldr.id, ...ldr.data() }
                })
                
            listCaps.push({ id: cap.id, ...capData, leader: leaderCap })
        })

        return listCaps

    } catch (error) {
        console.warn("Error GetCaps: ", error);
        throw error
    }
}

export async function GetCapsLeader() {
    try {
        let leadeId = await AsyncStorage.getItem(StoreKeys.UidLogin)
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
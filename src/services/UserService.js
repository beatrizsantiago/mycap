import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'
import StoreKeys from '../config/storeKeys'

let collectionLeaders = firebase.firestore().collection('leaders')
let ref = firebase.storage().ref('imgs-profiles')

export async function Login(email, password) {
    try {
        let dataLogin = await firebase.auth()
            .signInWithEmailAndPassword(email, password)

        let leader = await ProfileLeader(dataLogin.user.uid)

        return leader

    } catch (error) {
        console.warn("Error Login: ", error);
        throw error
    }
}

export async function ProfileLeader(uid) {
    try {
        let profile = await collectionLeaders.where('UID', '==', uid).get()

        let userLeader = {}
        profile.docs.forEach(leader => {
            userLeader = { id: leader.id, ...leader.data() }
        })

        if (userLeader.active) {
            return userLeader
        } else {
            return null
        }

    } catch (error) {
        console.warn("Error ProfileLeader: ", error);
        throw error
    }
}

export async function UploadImageProfile(pathImage, nameImage, leadeId) {
    try {
        let image = await ref.child(leadeId).child(nameImage)
        await image.put(pathImage)

        let url = await image.getDownloadURL()

        return url

    } catch (error) {
        console.warn("Error UploadImageProfile: ", error);
        throw error
    }
}

export async function UpdateImageProfile(pathImage, nameImage) {
    try {
        let leadeId = await AsyncStorage.getItem(StoreKeys.IdLeader)
        let url = await UploadImageProfile(pathImage, nameImage, leadeId)

        await collectionLeaders.doc(leadeId).update({
            photoProfile: url
        })

        return true

    } catch (error) {
        console.warn("Error UpdateImageProfile: ", error);
        throw error
    }
}

export async function UpdateTelephone(telephone) {
    try {
        let leadeId = await AsyncStorage.getItem(StoreKeys.IdLeader)

        await collectionLeaders.doc(leadeId).update({
            telephone: telephone
        })

        return true
    } catch (error) {
        console.warn("Error UpdateTelephone: ", error);
        throw error
    }
}

export async function UpdatePassword(newPassword) {
    try {
        let user = firebase.auth().currentUser
        await user.updatePassword(newPassword)

        return true

    } catch (error) {
        console.warn("Error UpdatePassword: ", error);
        throw error
    }
}

export async function Logout() {
    try {
        await AsyncStorage.clear()
        await firebase.auth().signOut()
        return true

    } catch (error) {
        console.warn("Error Logout: ", error);
        throw error
    }
}

export default { Login, ProfileLeader, UploadImageProfile, UpdateImageProfile, UpdateTelephone, UpdatePassword, Logout }
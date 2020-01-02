import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'

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
        let profile = await firebase.firestore().collection('leaders').where('UID', '==', uid).get()

        let userLeader = {}
        profile.docs.forEach(leader => {
            userLeader = { id: leader.id, ...leader.data() }
        })

        if(userLeader.active) {
            return userLeader
        } else {
            return null
        }
        
    } catch (error) {
        console.warn("Error ProfileLeader: ", error);
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

export default { Login, ProfileLeader, Logout }
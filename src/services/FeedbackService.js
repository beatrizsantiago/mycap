import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage'
import StoreKeys from '../config/storeKeys'

let ref = firebase.storage().ref('imgs-feedback')
let collectionFeedback = firebase.firestore().collection('feedback')
let collectionCaps = firebase.firestore().collection('caps')

export async function UploadImageFeedback(pathImage, nameImage, idFeedback) {
    try {
        let image = await ref.child(idFeedback).child(nameImage)
        await image.put(pathImage)
        
        let url = await image.getDownloadURL()

        return url

    } catch (error) {
        console.warn("Error UploadImageFeedback: ", error);
        throw error
    }
}

export async function RegisterFeedback(idCap, quantityPeople, quantityConversion, quantityMiracles, descriptionMiracles) {
    try {
        let feedbackCap = {
			dateFeedback: new Date(),
			descriptionMiracles: descriptionMiracles,
			idCap: firebase.firestore().doc(`caps/${idCap}`),
			photoCap: '',
			quantityConversion: quantityConversion,
			quantityMiracles: quantityMiracles,
			quantityPeople: quantityPeople
        }
        
        let register = await collectionFeedback.add(feedbackCap)

        return register.id

    } catch (error) {
        console.warn("Error RegisterFeedback: ", error);
        throw error
    }
}

export async function UpdateFeedback(idFeedback, url) {
    try {
        await collectionFeedback.doc(idFeedback).update({
            photoCap: url
        })
        return true
        
    } catch (error) {
        console.warn("Error UpdateFeedback: ", error);
        throw error
    }
}

export async function GetFeedbacks() {
    try {
        let leadeId = await AsyncStorage.getItem(StoreKeys.UidLogin)
        let leaderRef = firebase.firestore().collection('leaders').doc(leadeId)

        let caps = await collectionCaps.where('leader', '==', leaderRef).get()

        let feedbacksLeader = []
        caps.docs.map(async cap => {
            let capRef = collectionCaps.doc(cap.id)
            let feedbacks = await collectionFeedback.where('idCap', '==', capRef).get()

            feedbacks.docs.map(feedback => {
                feedbacksLeader.push({ id: feedback.id, ...feedback.data()})
            })
        })

    } catch (error) {
        console.warn("Error GetFeedbacks: ", error);
        throw error
    }
}

export default { UploadImageFeedback, RegisterFeedback, UpdateFeedback, GetFeedbacks }
import firebase from 'react-native-firebase'

let ref = firebase.storage().ref('imgs-feedback')
let collectionFeedback = firebase.firestore().collection('feedback')

export async function UploadImageFeedback(pathImage, nameImage, idFeedback) {
    try {
        let image = ref.child(idFeedback).child(nameImage)

        await image.put(pathImage)
        let url = await image.getDownloadURL()

        return url

    } catch (error) {
        console.warn("Error UploadImageFeedback: ", error.response);
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
        console.warn("Error RegisterFeedback: ", error.response);
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
        console.warn("Error UpdateFeedback: ", error.response);
        throw error
    }
}

export default { UploadImageFeedback, RegisterFeedback, UpdateFeedback }
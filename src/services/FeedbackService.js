import firebase from 'react-native-firebase'

let ref = firebase.storage().ref('imgs-feedback')

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

export function RegisterFeedback(feedback) {
    try {

    } catch (error) {
        console.warn("Error RegisterFeedback: ", error.response);
        throw error
    }
}

export default { RegisterFeedback, UploadImageFeedback }
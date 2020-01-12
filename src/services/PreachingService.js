import firebase from 'react-native-firebase'
import moment from 'moment'

let collectionPreachings = firebase.firestore().collection('preachings')

export async function GetFile(date) {
    try {
        let file = await collectionPreachings.where('dateUpload', '>=', date).get()

        let pdfFile = {}
        file.docs.map(item => {
            pdfFile = {id: item.id, ...item.data()}
        })

        return pdfFile

    } catch (error) {
        console.warn("Error GetFile: ", error);
        throw error
    }
}

export default { GetFile }
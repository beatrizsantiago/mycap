import firebase from 'react-native-firebase'

let CollectionCaps = firebase.firestore().collection('caps')

export async function GetCaps() {
    try {
        let listCaps = [];

        let caps = await CollectionCaps.get();
        
        caps.docs.forEach(cap => {
            listCaps.push({id: cap.id, ...cap.data()});
        })

        return listCaps
        
    } catch (error) {
        console.warn("Error GetCaps: ", error);
        throw error
    }
}

export default { GetCaps }
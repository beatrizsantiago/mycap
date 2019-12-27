import firebase from 'react-native-firebase'

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

export default { GetCaps }
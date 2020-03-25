import firebase from './firebase'
import 'firebase/firestore'

class FireStore {
  findMaster(targetDoc: string): Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> {
    return firebase
      .firestore()
      .collection('master')
      .doc(targetDoc)
      .get()
  }
}

// Firestore settings
const db = firebase.firestore()
const timeStamp = firebase.firestore.Timestamp.now()
const store = new FireStore()

export { db, timeStamp, store }

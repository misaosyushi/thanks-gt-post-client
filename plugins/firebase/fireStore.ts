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

  findMessagesByEmail(email: string): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return firebase
      .firestore()
      .collection('users')
      .doc(email)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .get()
  }

  findNewArrivals(): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    const now = new Date()
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 18, 0)
    return firebase
      .firestore()
      .collectionGroup('messages')
      .where('createdAt', '>=', yesterday)
      .get()
  }

  getTimeStamp(): firebase.firestore.Timestamp {
    return firebase.firestore.Timestamp.now()
  }
}

// Firestore settings
const db = firebase.firestore()
const store = new FireStore()

export { db, store }

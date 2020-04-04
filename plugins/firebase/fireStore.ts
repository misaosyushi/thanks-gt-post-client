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

  // TODO: あとで消す
  findTodayMessages(email: string): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    const date = new Date().getDate()

    return firebase
      .firestore()
      .collection('users')
      .doc(email)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .startAt(new Date(year, month, date - 2, 18))
      .get()
  }
}

// Firestore settings
const db = firebase.firestore()
const timeStamp = firebase.firestore.Timestamp.now()
const store = new FireStore()

export { db, timeStamp, store }

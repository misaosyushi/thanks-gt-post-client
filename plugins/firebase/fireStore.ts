import dayjs from 'dayjs'
import firebase from './firebase'
import 'firebase/firestore'
import { NewArrivalMessage } from '~/entity/NewArrivalMessage'

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

  async findNewArrivals(): Promise<NewArrivalMessage[]> {
    const now = new Date()
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 18, 0)
    const ref = await firebase
      .firestore()
      .collection('users')
      .get()
    const newArrivalMessages = await Promise.all(
      ref.docs.map(async (r) => {
        return await r.ref
          .collection('messages')
          .where('createdAt', '>=', yesterday)
          .get()
          .then((messages) => {
            return messages.docs.map((doc) => {
              const message = doc.data()
              const newArrivalMessage: NewArrivalMessage = {
                to: r.data().name,
                from: message.from,
                createdAt: dayjs(message.createdAt.toDate()).format('YYYY-MM-DD'),
                nDevSpirits: message.nDevSpirits,
                message: message.message
              }
              return newArrivalMessage
            })
          })
      })
    )
    return newArrivalMessages.filter((m) => m.length > 0).flat(2)
  }
}

// Firestore settings
const db = firebase.firestore()
const timeStamp = firebase.firestore.Timestamp.now()
const store = new FireStore()

export { db, timeStamp, store }

import * as functions from 'firebase-functions'
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

type Notice = {
  from: string
  to: string
  message: string
}

export const helloWorld = functions.https.onRequest((request, response) => {
  const now = new Date()

  const result = admin
    .firestore()
    .collection('users')
    .doc('m_tsujita@uluru.jp')
    .collection('messages')
    .orderBy('createdAt', 'asc')
    .startAt(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 18, 0))
    .get()

  console.log(result)

  response.send('Hello from Firebase!')
})

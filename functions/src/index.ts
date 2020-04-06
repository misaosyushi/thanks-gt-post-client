import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: functions.config().someservice.database_url
})
const fireStore = admin.firestore()

type Notice = {
  from: string
  to: string
  message: string
}

exports.getNewArrivals = functions.region('asia-northeast1').https.onRequest(async (request, response) => {
  const userRef = await fireStore
    .collection('master')
    .doc('users')
    .get()
  const now = new Date()
  const noticeList: Notice[] = []

  for (const doc of userRef.data()!.items) {
    const messageRef = await fireStore
      .collection('users')
      .doc(doc.email)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .startAt(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 18, 0))
      .get()

    messageRef.forEach((msgDoc) => {
      noticeList.push({ from: msgDoc.data().from.slice(0, -2), to: msgDoc.data().to, message: msgDoc.data().message })
    })
  }
  response.send(noticeList)
})

type User = {
  name: string | undefined
  email: string | undefined
  photoURL: string | undefined
}

exports.users = functions.region('asia-northeast1').https.onRequest(async (request, response) => {
  const res = await admin.auth().listUsers()
  const users: User[] = []
  res.users.forEach((user) => users.push({ name: user.displayName, email: user.email, photoURL: user.photoURL }))

  // MEMO: 本番でもローカルでも動くように全部許可している。本当は単一ドメインを指定するべき。
  response.set('Access-Control-Allow-Origin', '*')
  response.send(users)
})

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: functions.config().someservice.database_url
})

type Notice = {
  from: string
  to: string
  message: string
}

exports.getNewArrivals = functions.region('asia-northeast1').https.onRequest(async (request, response) => {
  const now = new Date()
  // NOTE: firebase上でnew DateするとUTCになるため、+9時間している
  now.setHours(now.getHours() + 9)
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 18, 0)
  console.log('now time', now)
  console.log('yesterday', yesterday)
  const noticeList: Notice[] = []

  const messageRef = await admin.firestore()
    .collectionGroup('messages')
    .where('createdAt', '>=', yesterday)
    .get()
  messageRef.forEach((msgDoc) => {
    noticeList.push({from: msgDoc.data().from, to: msgDoc.data().to, message: msgDoc.data().message})
  })
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
  res.users.forEach((user) => users.push({name: user.displayName, email: user.email, photoURL: user.photoURL}))

  // MEMO: 本番でもローカルでも動くように全部許可している。本当は単一ドメインを指定するべき。
  response.set('Access-Control-Allow-Origin', '*')
  response.send(users)
})

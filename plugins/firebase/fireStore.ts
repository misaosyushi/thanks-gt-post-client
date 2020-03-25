import firebase from './firebase'
import 'firebase/firestore'

// Firestore settings
const db = firebase.firestore()
const timeStamp = firebase.firestore.Timestamp.now()
export { db, timeStamp }

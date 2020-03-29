import firebase from './firebase'
import 'firebase/auth'

class FirebaseAuth {
  currentUser: firebase.User | null = null

  stateChanged(callback: (user: firebase.User | null) => void) {
    firebase.auth().onAuthStateChanged((user) => callback(user))
  }

  signin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({
      hd: 'uluru.jp'
    })
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(() => resolve())
        .catch((e) => reject(e))
    })
  }

  signout(): Promise<void> {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => resolve())
        .catch((e) => reject(e))
    })
  }
}

const auth = new FirebaseAuth()
export { auth }

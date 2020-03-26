import firebase from './firebase'
import 'firebase/auth'

class FirebaseAuth {
  currentUser: firebase.User | null = null

  constructor() {
    this.stateChanged()
  }

  private stateChanged() {
    firebase.auth().onAuthStateChanged((u) => {
      if (u) this.currentUser = u
    })
  }

  signin(): Promise<firebase.auth.UserCredential> {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({
      hd: 'uluru.jp'
    })
    return firebase.auth().signInWithPopup(provider)
  }

  signout() {
    return firebase.auth().signOut()
  }

  isLogin() {
    return this.currentUser || false
  }

  getUser(): firebase.User | null {
    return this.currentUser
  }
}

const auth = new FirebaseAuth()
export { auth }

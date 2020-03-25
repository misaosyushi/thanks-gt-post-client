import firebase from '@/plugins/firebase'
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

  signin() {
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
}

const auth = new FirebaseAuth()
export { auth }

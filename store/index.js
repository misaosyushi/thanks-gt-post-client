import { auth } from '@/plugins/firebase/firebaseAuth'

export const state = () => ({
  user: null
})

export const getters = {
  user(state) {
    return state.user
  },
  isAuthenticated(state) {
    return !!state.user
  }
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
    localStorage.userName = payload.userName
    localStorage.email = payload.email
    localStorage.photoURL = payload.photoURL
  },
  resetUser(state) {
    state.user = null
    localStorage.removeItem('userName')
    localStorage.removeItem('email')
    localStorage.removeItem('photoURL')
  }
}

export const actions = {
  setUser({ commit }, payload) {
    commit('setUser', payload)
  },
  signin() {
    return new Promise((resolve, reject) => {
      auth
        .signin()
        .then(() => resolve())
        .catch((e) => reject(e))
    })
  },
  signout({ commit }) {
    return new Promise((resolve, reject) => {
      auth
        .signout()
        .then(() => {
          commit('resetUser')
          resolve()
        })
        .catch((e) => reject(e))
    })
  }
}

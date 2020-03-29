import { auth } from '@/plugins/firebase/firebaseAuth'

export default async function({ store, route, redirect }) {
  let isAuthenticated = store.getters.isAuthenticated
  const isSignin = route.name === 'signin'

  if (!isAuthenticated && !isSignin) {
    const user = await new Promise((resolve) => {
      auth.stateChanged((user) => resolve(user))
    })
    if (user) {
      store.dispatch('setUser', user)
      isAuthenticated = true
    }
  }

  if (!isAuthenticated && !isSignin) {
    redirect('/signin')
  }
  if (isAuthenticated && isSignin) {
    redirect('/')
  }
}

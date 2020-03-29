<template>
  <v-card class="mx-auto my-auto signin">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">Signin</v-list-item-title>
        <v-list-item-subtitle>うるるアカウントでサインインしてね</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn large block color="primary" @click="signin">
        <v-icon>mdi-google</v-icon>&nbsp;&nbsp;Signin in with Google
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { auth } from '@/plugins/firebase/firebaseAuth'

@Component({
  layout: 'signin'
})
export default class Signin extends Vue {
  async created() {
    const user: firebase.User | null = await new Promise((resolve) => {
      auth.stateChanged((user) => resolve(user))
    })
    if (user) {
      const u = {
        userName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      }
      this.$store.dispatch('setUser', u)
      this.$router.push('/')
    }
  }

  signin() {
    this.$store.dispatch('signin')
  }
}
</script>

<style scoped lang="scss">
.signin {
  padding: 15px;
}
</style>

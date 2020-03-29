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
  layout: 'signin',
  async asyncData({ store, redirect }) {
    const user: firebase.User | null = await new Promise((resolve) => {
      auth.stateChanged((user) => resolve(user))
    })
    if (user) {
      store.dispatch('setUser', user)
      redirect('/')
    }
  }
})
export default class Signin extends Vue {
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

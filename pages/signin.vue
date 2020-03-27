<template>
  <v-content class="thanks_main">
    <loading v-if="isLoading" />
    <v-card v-else>
      <v-img class="white--text align-end" height="550px" src="/thanks.jpg" />
      <v-card-title>ThanksGT</v-card-title>
      <v-card-actions>
        <v-btn width="150px" large color="primary" @click="signin">
          SIGN IN&nbsp;
          <v-icon>mdi-emoticon-poop mdi-spin</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-content>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { auth } from '@/plugins/firebase/firebaseAuth'
import Loading from '@/components/Loading.vue'

@Component({
  components: {
    Loading
  }
})
export default class Signin extends Vue {
  isLoading: boolean = true

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
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
  }

  signin() {
    this.$store.dispatch('signin')
  }
}
</script>

<style scoped lang="scss">
.thanks_main {
  min-width: 500px;
  &__post_form {
    padding: 10px;
    margin-top: 30px;
  }
  &__text_field {
    padding: 10px;
    max-width: 320px;
  }
}
</style>

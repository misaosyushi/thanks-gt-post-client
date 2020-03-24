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
import firebase from '@/plugins/firebase'
import 'firebase/auth'
import Loading from '@/components/Loading.vue'
@Component({
  components: {
    Loading
  }
})
export default class Signin extends Vue {
  private isLoading: boolean = true
  private created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/')
      }
    })
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
  }

  private signin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.setCustomParameters({
      hd: 'uluru.jp'
    })
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => this.$router.push('/'))
      .catch((e) => console.log(e))
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

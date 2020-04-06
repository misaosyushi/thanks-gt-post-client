<template>
  <v-content class="thanks_main">
    <loading v-if="isLoading" />
    <v-card v-else width="1000px" class="mx-auto">
      <v-img class="white--text align-end" height="550px" src="/thanks.jpg" />

      <v-card-title>ありがとう受付窓口</v-card-title>

      <v-card-text class="text--primary">
        <div>感謝の言葉を贈り合おう</div>
        <alert :is-success="isSuccess" :is-shoe-alert="isShowAlert" />
        <v-layout class="thanks_main__post_form">
          <v-select
            v-model="targetUser"
            class="thanks_main__text_field"
            label="宛先"
            color="accent"
            hint="ありがとうを伝えたい人の名前を選択してください。"
            persistent-hint
            :items="members"
            item-value="email"
            item-text="name"
            return-object
            :error="isValidateError"
            :error-messages="errorMessage"
          />
          <v-select
            v-model="targetSpirits"
            class="thanks_main__text_field"
            label="N-Devスピリット"
            color="accent"
            hint="当てはまるものを選択してください。"
            persistent-hint
            :items="nDevSpirits"
            :error="isValidateError"
            :error-messages="errorMessage"
          />
        </v-layout>
        <v-textarea
          v-model="thanksMessage"
          class="thanks_main__text_area"
          label="ありがとうメッセージ"
          color="accent"
          hint="「〜してくれてありがとう」等のメッセージを添えてください。"
          persistent-hint
          :error="isValidateError"
          :error-messages="errorMessage"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn width="150px" large color="primary" :loading="loading" :disabled="loading" @click="sendMessage">
          送信&nbsp;
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-content>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { User } from '@/entity/User'
import Loading from '@/components/Loading.vue'
import Alert from '@/components/Alert.vue'
import { db, store } from '@/plugins/firebase/fireStore'

@Component({
  head() {
    return { title: 'ありがとう投稿' }
  },
  components: {
    Loading,
    Alert
  }
})
export default class Index extends Vue {
  members: User[] = []
  nDevSpirits: string[] = []
  isLoading = true
  targetUser: User = { email: '', name: '' }
  targetSpirits: string = ''
  thanksMessage: string = ''
  loading: boolean = false
  isSuccess: boolean = false
  isShowAlert: boolean = false
  isValidateError: boolean = false
  errorMessage = ''

  created() {
    store.findMaster('users').then((res) => (this.members = res.data()!.items))
    store.findMaster('nDevSpirits').then((res) => (this.nDevSpirits = res.data()!.items))

    setTimeout(() => {
      this.isLoading = false
    }, 1200)
  }

  // TODO: fireStore.tsに移行
  sendMessage() {
    this.loading = true
    if (this.validate()) return
    db.collection('users')
      .doc(this.targetUser.email)
      .set({ email: this.targetUser.email, name: this.targetUser.name })

    db.collection('users')
      .doc(this.targetUser.email)
      .collection('messages')
      .doc()
      .set(
        {
          to: this.targetUser.name,
          from: localStorage.userName,
          message: this.thanksMessage,
          nDevSpirits: this.targetSpirits,
          createdAt: store.getTimeStamp()
        },
        { merge: true }
      )
      .then(() => {
        this.showAlert(true)
        this.targetUser = { email: '', name: '' }
        this.targetSpirits = ''
        this.thanksMessage = ''
        this.loading = false
      })
      .catch((error) => {
        this.showAlert(false)
        console.error('Error adding document: ', error)
      })
  }

  validate(): boolean {
    if (this.targetUser.email === '' || this.targetSpirits === '' || this.thanksMessage === '') {
      this.isValidateError = true
      this.errorMessage = '必須項目です'
      this.loading = false
      return true
    }
    this.isValidateError = false
    this.errorMessage = ''
    return false
  }

  showAlert(isSuccess: boolean) {
    this.isShowAlert = true
    this.isSuccess = isSuccess
    setTimeout(() => (this.isShowAlert = false), 2000)
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
  &__text_area {
    margin-top: 5px;
    padding: 10px;
  }
}
</style>

<template>
  <v-content class="thanks_main">
    <loading v-if="isLoading" />
    <v-card v-else>
      <v-img class="white--text align-end" height="550px" src="/thanks.jpg" />

      <v-card-title>ありがとう受付窓口</v-card-title>

      <v-card-text class="text--primary">
        <div>感謝の言葉を贈り合おう</div>
        <alert :is-success="isSuccess" :is-shoe-alert="isShoeAlert" />
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
          />
          <v-select
            v-model="targetSpirits"
            class="thanks_main__text_field"
            label="N-Devスピリット"
            color="accent"
            hint="当てはまるものを選択してください。"
            persistent-hint
            :items="nDevSpirits"
          />
        </v-layout>
        <v-textarea
          v-model="thanksMessage"
          class="thanks_main__text_area"
          label="ありがとうメッセージ"
          color="accent"
          hint="「〜してくれてありがとう」等のメッセージを添えてください。"
          persistent-hint
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
import { db, timeStamp, store } from '@/plugins/firebase/fireStore'

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
  targetUser: string = ''
  targetSpirits: string = ''
  thanksMessage: string = ''
  loading: boolean = false
  isSuccess: boolean = false
  isShoeAlert: boolean = false

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
    db.collection('users')
      .doc(this.targetUser)
      .set({ email: this.targetUser })

    db.collection('users')
      .doc(this.targetUser)
      .collection('messages')
      .doc()
      .set(
        {
          from: localStorage.userName,
          message: this.thanksMessage,
          nDevSpirits: this.targetSpirits,
          createdAt: timeStamp
        },
        { merge: true }
      )
      .then(() => {
        this.showAlert(true)
        this.targetUser = ''
        this.targetSpirits = ''
        this.thanksMessage = ''
        this.loading = false
      })
      .catch((error) => {
        this.showAlert(false)
        console.error('Error adding document: ', error)
      })
  }

  showAlert(isSuccess: boolean) {
    this.isShoeAlert = true
    this.isSuccess = isSuccess
    setTimeout(() => (this.isShoeAlert = false), 2000)
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

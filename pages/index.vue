<template>
  <v-content class="thanks_main">
    <!--    <loading v-if="isLoading" />-->
    <v-card>
      <v-img class="white--text align-end" height="550px" src="/thanks.jpg" />

      <v-card-title>ありがとう受付窓口</v-card-title>

      <v-card-text class="text--primary">
        <div>感謝の言葉を贈り合おう</div>
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
        <v-btn width="150px" large color="primary" @click="sendMessage">
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
import { db, timeStamp } from '@/plugins/firebase/fireStore'

@Component({
  head() {
    return { title: 'ありがとう投稿' }
  },
  components: {
    Loading
  }
})
export default class Index extends Vue {
  members: User[] = []
  nDevSpirits: string[] = []
  isLoading = true
  targetUser: string = ''
  targetSpirits: string = ''
  thanksMessage: string = ''

  created() {
    // this.getUsers()
    this.findUsers()
    this.findNDevSpirits()
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
  }

  findUsers() {
    db.collection('master')
      .doc('users')
      .get()
      .then((res) => {
        this.members = res.data()!.items
      })
  }

  findNDevSpirits() {
    db.collection('master')
      .doc('n_dev_spirits')
      .get()
      .then((res) => {
        this.nDevSpirits = res.data()!.items
      })
  }

  sendMessage() {
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
          created_at: timeStamp
        },
        { merge: true }
      )
      .then(() => {
        this.targetUser = ''
        this.targetSpirits = ''
        this.thanksMessage = ''
      })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })
  }

  // TODO: データ取得サンプル。あとで消す。
  async getUsers() {
    const userRef = db
      .collection('users')
      .doc('1') // ここはログインしてるユーザごとに変わるイメージ
      .collection('messages')
    const users = await userRef.get()
    users.forEach((doc) => {
      console.log(doc.data())
    })
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

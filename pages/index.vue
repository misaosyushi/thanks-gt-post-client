<template>
  <v-content class="thanks_main">
    <loading v-if="isLoading" />
    <v-card v-else>
      <v-img class="white--text align-end" height="550px" src="/thanks.jpg" />

      <v-card-title>ありがとう受付窓口</v-card-title>

      <v-card-text class="text--primary">
        <div>感謝の言葉を贈り合おう</div>
        <v-layout class="thanks_main__post_form">
          <v-select
            class="thanks_main__text_field"
            label="宛先"
            color="accent"
            hint="ありがとうを伝えたい人の名前を選択してください。"
            persistent-hint
            :items="members"
            item-value="id"
            item-text="name"
          />
          <v-text-field
            class="thanks_main__text_field"
            label="あなたの名前"
            color="accent"
            hint="あなたの名前を入力してください。"
            persistent-hint
          />
        </v-layout>
        <v-textarea
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
import { Member } from '@/entity/Member'
import Loading from '@/components/Loading.vue'
import { db } from '@/plugins/firebase'

@Component({
  head() {
    return { title: 'ありがとう投稿' }
  },
  components: {
    Loading
  }
})
export default class Index extends Vue {
  members: Member[] = [
    { id: 1, name: 'hoge' },
    { id: 2, name: 'fuga' },
    { id: 3, name: 'piyo' }
  ]

  isLoading = true

  created() {
    console.log(process.env.FIREBASE_DATABASE_URL)
    this.getUsers()
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
  }

  sendMessage() {
    console.log('message')
  }

  async getUsers() {
    const userRef = db.collection('users')
    const users = await userRef.get()
    console.log(users)
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

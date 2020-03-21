<template>
  <v-content>
    <v-card>
      <v-img class="white--text align-end" height="450px" src="/thanks.jpg" />

      <v-card-title>ありがとう受付窓口</v-card-title>

      <v-card-text class="text--primary">
        <div>感謝の言葉を贈り合おう</div>
        <v-layout class="post_form">
          <v-select
            class="text_field"
            label="宛先"
            color="accent"
            hint="ありがとうを伝えたい人の名前を選択してください。"
            persistent-hint
            :items="members"
          />
          <v-text-field
            class="text_field"
            label="あなたの名前"
            color="accent"
            hint="あなたの名前を入力してください。"
            persistent-hint
          />
        </v-layout>
        <v-textarea
          class="text_area"
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
import { defineComponent, ref } from '@vue/composition-api'
import { Member } from '@/entity/Member'

export default defineComponent({
  setup() {
    const members = ref<Member[]>(['hoge', 'fuga', 'piyo'])

    const sendMessage = () => console.log('send message')

    return {
      members,
      sendMessage
    }
  }
})
</script>

<style lang="scss">
.post_form {
  margin-top: 30px;
}

.text_field {
  padding: 10px;
  max-width: 320px;
}

.text_area {
  margin-top: 5px;
  padding: 10px;
}
</style>

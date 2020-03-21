<template>
  <v-content>
    <v-card>
      <v-img class="white--text align-end" src="/thanks.jpg" />

      <v-card-title>ありがとう受付窓口</v-card-title>

      <v-card-text class="text--primary">
        <div>感謝の言葉を贈り合おう</div>
        <v-layout class="post_form">
          <v-select
            class="text_field"
            label="宛先"
            color="accent"
            hint="ありがとうを伝えたい人の名前を選択してください。"
          />
          <v-text-field
            class="text_field"
            label="あなたの名前"
            color="accent"
            hint="あなたの名前を入力してください。"
          />
        </v-layout>
        <v-textarea
          class="text_area"
          label="ありがとうメッセージ"
          color="accent"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn large color="primary">
          送信&nbsp;
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-content>
</template>

<script>
export default {}
</script>

<style lang="scss">
.post_form {
  margin-top: 30px;
}

.text_field {
  padding: 10px;
  max-width: 300px;
}

.text_area {
  padding: 10px;
}
</style>

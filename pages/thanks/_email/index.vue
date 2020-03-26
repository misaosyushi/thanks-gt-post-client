<template>
  <v-content class="thanks_main">
    <h1>hoge</h1>
  </v-content>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { store } from '@/plugins/firebase/fireStore'
import { Message } from '@/entity/Message'

@Component({
  head() {
    return { title: 'ありがとう一覧' }
  }
})
export default class Thanks extends Vue {
  messages: Message[] = []

  async created() {
    const users = await store.findMessagesByEmail(this.$route.params.email)
    users.forEach((doc) => {
      console.log(doc.data().created_at.toDate())
      this.messages.push({
        from: doc.data().from,
        createdAt: doc.data().created_at.toDate(), // TODO: キャメルケースに直す
        nDevSpirits: doc.data().nDevSpirits,
        message: doc.data().message
      })
    })
  }
}
</script>

<style scoped lang="scss">
.thanks_main {
  min-width: 500px;
}
</style>

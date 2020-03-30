<template>
  <v-content class="thanks_main">
    <h1 class="page_title">ありがとう一覧</h1>
    <v-data-table :headers="headers" :items="messages" :items-per-page="20" />
    <v-btn class="ma-2" color="primary" to="/users"> <v-icon left>mdi-arrow-left</v-icon>Back </v-btn>
  </v-content>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import dayjs from 'dayjs'
import { store } from '@/plugins/firebase/fireStore'
import { NewArrivalMessage } from '@/entity/NewArrivalMessage'

@Component({
  head() {
    return { title: '新着ありがとう一覧' }
  }
})
export default class Thanks extends Vue {
  messages: NewArrivalMessage[] = []

  headers: any[] = [
    { text: 'TO', value: 'to', sortable: true, width: '10%' },
    { text: 'FROM', value: 'from', sortable: true, width: '10%' },
    { text: 'N-Devスピリット', value: 'nDevSpirits', sortable: true, width: '20%' },
    { text: 'メッセージ', value: 'message', sortable: false, width: '60%' }
  ]

  async created() {
    const messages = await store.findAllMessages()
    messages.forEach((doc) => {
      this.messages.push({
        from: doc.data().from,
        to: doc.ref.parent.parent?.id,
        createdAt: dayjs(doc.data().createdAt.toDate()).format('YYYY-MM-DD'),
        nDevSpirits: doc.data().nDevSpirits,
        message: doc.data().message
      })
    })
  }
}
</script>

<style scoped lang="scss">
.page_title {
  margin-bottom: 20px;
}

.thanks_main {
  min-width: 500px;
}
</style>

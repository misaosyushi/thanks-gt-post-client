<template>
  <v-content class="thanks_main">
    <h1 class="page_title">ありがとう一覧</h1>
    <v-data-table :headers="headers" :items="messages" :items-per-page="20" />
  </v-content>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
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
    { text: 'FROM', value: 'from', sortable: true, width: '10%' },
    { text: 'TO', value: 'to', sortable: true, width: '10%' },
    { text: 'N-Devスピリット', value: 'nDevSpirits', sortable: true, width: '20%' },
    { text: 'メッセージ', value: 'message', sortable: false, width: '60%' }
  ]

  async created() {
    await store.findNewArrivals().then((docs) =>
      docs.forEach((doc) => {
        const data = doc.data()
        this.messages.push({
          to: data.to,
          from: data.from,
          message: data.message,
          nDevSpirits: data.nDevSpirits,
          createdAt: data.createdAt
        })
      })
    )
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

<template>
  <v-content class="thanks_main">
    <h1 class="page_title">メンバー一覧</h1>
    <v-list two-line subheader>
      <v-list-item v-for="user in users" :key="user.email" @click="showThanks(user.name, user.email)">
        <v-list-item-avatar>
          <!-- TODO: 認証情報から取ってきたアイコンを表示させる -->
          <v-icon class="grey lighten-1 white--text">mdi-account</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="user.name"></v-list-item-title>
          <v-list-item-subtitle v-text="user.email"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-content>
</template>

<script lang="ts">
import { Location } from 'vue-router'
import { Vue, Component } from 'vue-property-decorator'
import { store } from '@/plugins/firebase/fireStore'
import { User } from '@/entity/User'

@Component({
  head() {
    return { title: 'メンバー一覧' }
  }
})
export default class Users extends Vue {
  users: User[] = []

  created() {
    // TODO: firebase admin sdkで認証済みのユーザ一覧を取れるっぽいので後で直す
    // このへん：https://firebase.google.com/docs/admin/setup?hl=ja
    store.findMaster('users').then((res) => (this.users = res.data()!.items))
  }

  showThanks(queryName: string, queryEmail: string) {
    const location: Location = {
      name: 'thanks',
      query: { name: queryName, email: queryEmail }
    }
    this.$router.push(location)
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

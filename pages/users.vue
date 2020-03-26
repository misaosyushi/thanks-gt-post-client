<template>
  <v-content class="thanks_main">
    <v-list two-line subheader>
      <v-list-item v-for="user in users" :key="user.email" @click="hoge">
        <v-list-item-avatar>
          <v-icon class="grey lighten-1 white--text">mdi-account</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="user.name"></v-list-item-title>
          <v-list-item-subtitle v-text="user.email"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-content>
</template>

<script lang="ts">
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
    store.findMaster('users').then((res) => (this.users = res.data()!.items))
  }

  hoge() {
    console.log('hoge')
  }
}
</script>

<style scoped lang="scss">
.thanks_main {
  min-width: 500px;
}
</style>

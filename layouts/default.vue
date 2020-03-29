<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <!-- 旧ThanksGTへのリンク -->
        <v-list-item @click="openOldThanksGT">
          <v-list-item-action>
            <v-icon>mdi-link</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>旧ThanksGT</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title @click="toIndex" v-text="title" />
      <v-spacer />
      <v-btn text outlined height="50px" @click="signout">
        <v-avatar size="45px">
          <img :src="userAvatar" alt="Avatar" />
        </v-avatar>
        <span class="logout">
          SIGN OUT
        </span>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-pencil',
          title: 'ありがとう投稿',
          to: '/'
        },
        {
          icon: 'mdi-account-multiple',
          title: 'メンバー一覧',
          to: '/users'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'ThanksGT',
      userAvatar: localStorage.photoURL
    }
  },
  methods: {
    signout() {
      this.$store.dispatch('signout').then(() => this.$router.push('/signin'))
    },
    openOldThanksGT() {
      window.open('https://jovial-wilson-f1f7b0.netlify.com/')
    },
    toIndex() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
.logout {
  padding: 0 8px 0 10px;
}
</style>

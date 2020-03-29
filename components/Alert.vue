<template>
  <div class="alert">
    <v-alert v-if="isSuccess" :value="isShoeAlert" dense text type="success">
      登録完了しました。
    </v-alert>
    <v-alert v-else :value="isShoeAlert" dense ou text type="error">
      登録に失敗しました。
    </v-alert>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class Alert extends Vue {
  @Prop({ default: false, type: Boolean })
  isSuccess!: boolean

  @Prop({ default: false, type: Boolean })
  isShoeAlert: boolean = false
}
</script>

<style scoped lang="scss">
.alert {
  margin-top: 20px;
  padding: 0 10px;
}
</style>

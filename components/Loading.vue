<template>
  <lottie-animation
    path="/loading.json"
    :options="options"
    @animCreated="anim"
  />
</template>

<script>
import LottieAnimation from 'vue-lottie'

export default {
  components: {
    LottieAnimation
  },
  data: () => ({
    loading: false,
    options: {
      loop: false,
      autoplay: false,
      rendererSettings: ''
    }
  }),
  mounted() {
    // TODO: ローディングスタート/終了
  }
}
</script>

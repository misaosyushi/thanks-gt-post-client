<template>
  <lottie-animation
    :options="defaultOptions"
    :height="400"
    :width="400"
    @animCreated="handleAnimation"
  />
</template>

<script>
import LottieAnimation from 'vue-lottie'
import * as animationData from '~/assets/loading.json'

export default {
  components: {
    LottieAnimation
  },
  data: () => ({
    defaultOptions: { type: animationData },
    animationSpeed: 1
  }),
  methods: {
    handleAnimation(anim) {
      this.anim = anim
    }
  }
}
</script>

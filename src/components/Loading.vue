<template>
  <div class="loading">
    <lottie :options="defaultOptions" :height="400" :width="400" @animCreated="handleAnimation" />
  </div>
</template>

<script>
import lottie from 'vue-lottie'
import * as animationData from '@/assets/heart.json'

// TODO: TSに書き換え
export default {
  components: {
    lottie
  },
  data: () => ({
    defaultOptions: {
      animationData: animationData.default,
      loop: true,
      autoplay: true
    },
    animationSpeed: 1
  }),
  methods: {
    handleAnimation(anim) {
      this.anim = anim
      this.anim.setSpeed(1.5)
    }
  }
}
</script>

<style>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
  z-index: 9999;
}
</style>

<template>
  <AuthView/>
</template>

<script>
import AuthView from './views/AuthView.vue'

export default {
  name: 'App',
  components: {
    AuthView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

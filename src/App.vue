<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p>count: {{count}}</p>
    <p @click="changeCount">Update</p>
  </div>
</template>

<script>
import testModel from './stores/TestStore'

export default {
  name: 'App',
  fromMobx: {
    testModel
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

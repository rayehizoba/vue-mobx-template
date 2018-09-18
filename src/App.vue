<template>
  <div id="app">
    <Messaging />
  </div>
</template>

<script>
import Messaging from './features/Messaging'

export default {
  name: 'App',
  components: { Messaging }
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-gap: 30px;
  background: #EEE;
}
#app > * {
  background: white;
  padding: 0 15px;
}
</style>

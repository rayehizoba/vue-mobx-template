<template>
  <div id="app">
    <Biding />
    <Biding />
    <Messaging />
  </div>
</template>

<script>
import Messaging from './features/Messaging'
import Biding from './features/Biding'

export default {
  name: 'App',
  components: {
    Messaging,
    Biding
  }
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
  grid-template-columns: repeat(3, 50vw);
  grid-gap: 30px;
  background: #EEE;
  overflow-x: auto;
  height: 100vh;
}
#app > * {
  background: white;
  padding: 0 15px 15px;
  height: stretch;
  overflow: auto;
}
.sticky-header {
  position: sticky;
  top: 0;
  margin: 0;
  padding: 15px 0;
  background: white;
  z-index: 10;
  margin-bottom: 15px;
  border-bottom: 1px dotted #EEE;
}
hr {
  border: none;
  border-bottom: #EEE dotted 1px;
}
</style>

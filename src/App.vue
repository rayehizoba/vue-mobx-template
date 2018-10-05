<template>
  <div id="app">
    <template v-if="store.profileStore.token" >
      <Deal />
      <!-- <Biding />
      <Agency />
      <Service />
      <Document />
      <Messaging /> -->
    </template>
    <!-- <Auth />
    <Profile /> -->
  </div>
</template>

<script>
import Messaging from './features/Messaging'
import Biding from './features/Biding'
import Document from './features/Document'
import Deal from './features/Deal'
import Agency from './features/Agency'
import Auth from './features/Auth'
import Profile from './features/Profile'
import Service from './features/Service'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Observer } from 'mobx-vue'
import store from './stores/RootStore'

@Observer
@Component({
  components: {
    Messaging,
    Biding,
    Document,
    Deal,
    Auth,
    Profile,
    Agency,
    Service,
  }
})
export default class App extends Vue {
  store = store
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
  grid-template-columns: repeat(8, 30vw);
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
.form {
  background-color: #EEE;
  padding: 1px 15px 15px;
  margin-top: 15px;
  border-radius: 5px;
}
</style>

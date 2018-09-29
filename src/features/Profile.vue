<template>
  <div>
    <h5 class="sticky-header" >Profile Store</h5>

    <p v-if="!store.token" >Please login to view more stores</p>

    <vue-json-pretty
      :data="JSON.parse(stringify(store))"
      showLength
      :deep="1"
    />

    <button @click="store.onLogout()" >Log out</button>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Observer } from 'mobx-vue'
import store from '../stores/RootStore'
import VueJsonPretty from 'vue-json-pretty'
import stringify from 'json-stringify-safe'

@Observer
@Component({
  components: {
    VueJsonPretty
  }
})
export default class Profile extends Vue {
  stringify = stringify
  store = store.profileStore
  deal = null
}
</script>

<style>

</style>

<template>
  <div>
    <h5 class="sticky-header" >Service Store</h5>
    <button @click="store.fetch()" >Fetch</button>
    <vue-json-pretty
      :data="JSON.parse(stringify(store))"
      showLength
      :deep="1"
    />
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
export default class Service extends Vue {
  stringify = stringify
  store = store.serviceStore
}
</script>

<style>

</style>

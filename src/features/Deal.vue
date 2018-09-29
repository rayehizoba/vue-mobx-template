<template>
  <div>
    <h5 class="sticky-header" >Deal Store</h5>
    <button @click="store.fetchDeals()" >Fetch deals</button>
    <vue-json-pretty
      :data="JSON.parse(stringify(store))"
      showLength
      :deep="1"
      @click="handleClick"
      selectableType="tree"
      :pathSelectable="pathSelectable"
    />
  
    <div v-if="!!deal" >
      <hr>
      <p>Selected Deal</p>
      <button @click="onRemove(deal)" >Remove deal</button>
      <vue-json-pretty
        :data="JSON.parse(stringify(deal))"
        showLength
        :deep="1"
      />
    </div>
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
export default class Deal extends Vue {
  stringify = stringify
  store = store.dealStore
  deal = null

  handleClick(path) {
    let pathSplit = path.split('[')
    pathSplit = pathSplit[1].split(']')
    const dealIndex = parseInt(pathSplit[0])
    this.deal = this.store.deals[dealIndex]
  }
  pathSelectable(path) {
    const pathSplit = path.split('.')
    if (pathSplit.length === 2 && pathSplit[1].includes('[')) {
      return true
    }
    return false
  }
  onRemove(deal) {
    this.store.remove(deal)
    this.deal = null
  }
}
</script>

<style>

</style>

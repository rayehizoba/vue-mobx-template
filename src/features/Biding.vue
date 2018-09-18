<template>
  <div>
    <h5 class="sticky-header" >Bid Store</h5>
  
    <button @click="store.fetchBids()" >Fetch bids</button>
    <vue-json-pretty
      :data="JSON.parse(JSON.stringify(store))"
      showLength
      :deep="3"
      @click="handleClick"
      selectableType="tree"
      :pathSelectable="pathSelectable"
    />

    <div v-if="!!bid" >
      <hr>
      <p>Selected Bid</p>
      <button @click="bid.fetchResponses()" >Refresh</button>
      <button @click="remove(bid)" >Remove</button>
      <vue-json-pretty
        :data="JSON.parse(JSON.stringify(bid))"
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
import BidStore from '../stores/BidStore'
import VueJsonPretty from 'vue-json-pretty'

@Observer
@Component({
  components: {
    VueJsonPretty
  }
})
export default class Biding extends Vue {
  store = BidStore
  bid = null

  handleClick(path) {
    let pathSplit = path.split('[')
    pathSplit = pathSplit[1].split(']')
    const threadIndex = parseInt(pathSplit[0])
    this.bid = this.store.bids[threadIndex]
  }

  pathSelectable(path, data) {
    const pathSplit = path.split('.')
    if (pathSplit.length === 2 && pathSplit[1].includes('[')) {
      return true
    }
    return false
  }
  remove(bid) {
    this.store.remove(bid)
    this.bid = null
  }
}
</script>

<style>

</style>

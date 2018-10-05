<template>
  <div>
    <h5 class="sticky-header" >Deal Store</h5>
    <button @click="store.fetchDeals()" >Fetch deals</button>
    <div class="form">
      <h5>Filter deals</h5>
      <h5 v-if="store.filter.isActive" >(ACTIVE)</h5>
      <button
        v-for="service in serviceStore.services"
        :class="{ selected : store.filter.services.includes(service.id) }"
        :key="service.name"
        @click="store.filter.setService(service.id)"
      >{{service.name}}</button>
      <input
        type="number"
        placeholder="Min price"
        name="minPrice"
        :value="store.filter.minPrice"
        @keyup="(evt) => {store.filter.set(evt.target.name, evt.target.value)}"
      />
      <input
        type="number"
        placeholder="Max price"
        name="maxPrice"
        :value="store.filter.maxPrice"
        @keyup="(evt) => {store.filter.set(evt.target.name, evt.target.value)}"
      />
      <button @click="store.filter.clear()" >clear</button>
    </div>
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
  serviceStore = store.serviceStore
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
button.selected {
  background-color: blue;
  color: white;
}
</style>

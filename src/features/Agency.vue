<template>
  <div>
    <h5 class="sticky-header" >Agency Store</h5>
    <button @click="store.fetchDeals()" >Fetch agencies</button>
    <vue-json-pretty
      :data="JSON.parse(stringify(store))"
      showLength
      :deep="1"
      @click="handleClick"
      selectableType="tree"
      :pathSelectable="pathSelectable"
    />

    <div v-if="!!agency" >
      <hr>
      <p>Selected Agency</p>
      <button @click="agency.refresh()" >Refresh</button>
      <button @click="agency.fetchDeals()" >Fetch deals</button>
      <vue-json-pretty
        :data="JSON.parse(stringify(agency))"
        showLength
        :deep="1"
      />
    </div>

    <hr>

    <h5>Search</h5>
    <input
      v-model="location"
      type="text"
      placeholder="Press enter to search location"
      @keyup.enter="searchStore.setLocation(location)"
    >
    <button
      v-for="service in serviceStore.services"
      :class="{ selected : searchStore.services.includes(service.id) }"
      :key="service.name"
      @click="searchStore.setService(service.id)"
    >{{service.name}}</button>
    <vue-json-pretty
      :data="JSON.parse(stringify(searchStore))"
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
export default class Agency extends Vue {
  stringify = stringify
  store = store.agencyStore
  searchStore = store.agencySearchStore
  serviceStore = store.serviceStore
  agency = null
  location = ''

  handleClick(path) {
    let pathSplit = path.split('[')
    pathSplit = pathSplit[1].split(']')
    const index = parseInt(pathSplit[0])
    this.agency = this.store.agencies[index]
  }
  pathSelectable(path) {
    const pathSplit = path.split('.')
    if (pathSplit.length === 2 && pathSplit[1].includes('[')) {
      return true
    }
    return false
  }
}
</script>

<style>
button.selected {
  background-color: blue;
  color: white;
}
</style>

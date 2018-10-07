<template>
  <div>
    <h5 class="sticky-header" >Deal Store</h5>
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
    <button @click="store.fetchDeals()" >Fetch deals</button>
    <br>
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
    <br>
    <vue-json-pretty
      :data="JSON.parse(stringify(newDealForm))"
      showLength
      :deep="0"
    />

    <div class="form">
      <h5>Create/Edit deal</h5>
      <input
        type="file"
        accept="image/*"
        @change="(evt) => newDealForm.addImage(evt.target.files[0])"
      />
      <button
        v-for="service in serviceStore.services"
        :class="{ selected : newDealForm.services.includes(service.id) }"
        :key="service.name"
        @click="newDealForm.setService(service.id)"
      >{{service.name}}</button>
      <input
        type="text"
        placeholder="agencyId"
        name="agencyId"
        :value="newDealForm.agencyId"
        @keyup="(evt) => {newDealForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{newDealForm.validateErrorAgencyId}}</small>
      <br>
      
      <input
        type="text"
        placeholder="name"
        name="name"
        :value="newDealForm.name"
        @keyup="(evt) => {newDealForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{newDealForm.validateErrorName}}</small>
      <br>
      
      <input
        type="text"
        placeholder="description"
        name="description"
        :value="newDealForm.description"
        @keyup="(evt) => {newDealForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{newDealForm.validateErrorDescription}}</small>
      <br>
      
      <input
        type="number"
        placeholder="amount"
        name="amount"
        :value="newDealForm.amount"
        @keyup="(evt) => {newDealForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{newDealForm.validateErrorAmount}}</small>
      <br>
      
      <select name="currency" :value="newDealForm.currency" @change="(evt) => {newDealForm.set(evt.target.name, evt.target.value)}" >
        <option value="" disabled >Choose currency</option>
        <option value="USD">US Dollars</option>
        <option value="NGN">Naira</option>
      </select>
      <small>{{newDealForm.validateErrorCurrency}}</small>
      <br>

      <input
        type="date"
        name="arrivalDate"
        placeholder="arrivalDate"
        :value="newDealForm.arrivalDate"
        @change="(evt) => {newDealForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{newDealForm.validateErrorArrivalDate}}</small>
      <br>

      <input
        type="date"
        name="departureDate"
        placeholder="departureDate"
        :value="newDealForm.departureDate"
        @change="(evt) => {newDealForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{newDealForm.validateErrorDepartureDate}}</small>
      <br>
      
      <input
        type="text"
        placeholder="fromDestination"
        name="fromDestination"
        :value="newDealForm.fromDestination"
        @keyup="(evt) => {newDealForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{newDealForm.validateErrorFromDestination}}</small>
      <br>
      
      <input
        type="text"
        placeholder="toDestination"
        name="toDestination"
        :value="newDealForm.toDestination"
        @keyup="(evt) => {newDealForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{newDealForm.validateErrorToDestination}}</small>
      <br>

      <input
        type="date"
        name="expiresOn"
        placeholder="expiresOn"
        :value="newDealForm.expiresOn"
        @change="(evt) => {newDealForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{newDealForm.validateErrorExpiresOn}}</small>
      <br>
      <button @click="newDealForm.submit(newDealForm.reset)" >submit</button>
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
  newDealForm = store.newDealForm
  deal = null

  handleClick(path) {
    let pathSplit = path.split('[')
    pathSplit = pathSplit[1].split(']')
    const dealIndex = parseInt(pathSplit[0])
    this.deal = this.store.deals[dealIndex]
    this.newDealForm.setAll(this.deal)
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

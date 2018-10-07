<template>
  <div>
    <h5 class="sticky-header" >Bid Store</h5>
  
    <button @click="store.fetchBids()" >Fetch bids</button>
    <vue-json-pretty
      :data="JSON.parse(stringify(store))"
      showLength
      :deep="1"
      @click="onTreeNodeSelection"
      selectableType="tree"
      :pathSelectable="pathSelectable"
    />

    <div v-if="!!bid" >
      <hr>
      <p>Selected Bid</p>
      <button @click="bid.fetchResponses()" >Refresh</button>
      <button @click="remove(bid)" >Remove</button>
      <vue-json-pretty
        :data="JSON.parse(stringify(bid))"
        showLength
        :deep="1"
      />
    </div>

    <div class="bid-request-form">
      <h5>Bid request form</h5>
      <input
        type="text"
        placeholder="userId"
        name="userId"
        :value="bidRequestForm.userId"
        @keyup="(evt) => {bidRequestForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{bidRequestForm.validateErrorUserId}}</small>
      <br>

      <input
        type="text"
        placeholder="state"
        name="state"
        :value="bidRequestForm.state"
        @keyup="(evt) => {bidRequestForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{bidRequestForm.validateErrorState}}</small>
      <br>

      <input
        type="text"
        placeholder="flightFrom"
        name="flightFrom"
        :value="bidRequestForm.flightFrom"
        @keyup="(evt) => {bidRequestForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{bidRequestForm.validateErrorFlightFrom}}</small>
      <br>

      <input
        type="text"
        name="flightTo"
        placeholder="flightTo"
        :value="bidRequestForm.flightTo"
        @keyup="(evt) => {bidRequestForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{bidRequestForm.validateErrorFlightTo}}</small>
      <br>

      <input
        type="date"
        name="flightDeparture"
        placeholder="flightDeparture"
        :value="bidRequestForm.flightDeparture"
        @change="(evt) => {bidRequestForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{bidRequestForm.validateErrorFlightDeparture}}</small>
      <br>

      <input
        type="text"
        name="hotelLocation"
        placeholder="hotelLocation"
        :value="bidRequestForm.hotelLocation"
        @keyup="(evt) => {bidRequestForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{bidRequestForm.validateErrorHotelLocation}}</small>
      <br>

      <input
        type="number"
        name="hotelStar"
        placeholder="hotelStar"
        :value="bidRequestForm.hotelStar"
        @keyup="(evt) => {bidRequestForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{bidRequestForm.validateErrorHotelStar}}</small>
      <br>

      <input
        type="number"
        name="tripDuration"
        placeholder="tripDuration"
        :value="bidRequestForm.tripDuration"
        @keyup="(evt) => {bidRequestForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{bidRequestForm.validateErrorTripDuration}}</small>
      <br>

      <input
        type="number"
        name="adultTravellers"
        placeholder="adultTravellers"
        :value="bidRequestForm.adultTravellers"
        @keyup="(evt) => {bidRequestForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{bidRequestForm.validateErrorAdultTravellers}}</small>
      <br>

      <input
        type="number"
        name="childTravellers"
        placeholder="childTravellers"
        :value="bidRequestForm.childTravellers"
        @keyup="(evt) => {bidRequestForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{bidRequestForm.validateErrorChildTravellers}}</small>
      <br>

      <input
        type="text"
        name="tourLanguages"
        placeholder="tourLanguages"
        :value="bidRequestForm.tourLanguages"
        @keyup="(evt) => {bidRequestForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{bidRequestForm.validateErrorTourLanguages}}</small>
      <br>

      <input
        type="number"
        name="budget"
        placeholder="budget"
        :value="bidRequestForm.budget"
        @keyup="(evt) => {bidRequestForm.set(evt.target.name, evt.target.value)}"
      />
      <small>{{bidRequestForm.validateErrorBudget}}</small>
      <br>

      <select name="currency" :value="bidRequestForm.currency" @change="(evt) => {bidRequestForm.set(evt.target.name, evt.target.value)}" >
        <option value="" disabled >Choose currency</option>
        <option value="USD">US Dollars</option>
        <option value="NGN">Naira</option>
      </select>
      <small>{{bidRequestForm.validateErrorCurrency}}</small>
      <br>

      <select name="flightType" :value="bidRequestForm.flightType" @change="(evt) => {bidRequestForm.set(evt.target.name, evt.target.value)}" >
        <option value="" disabled >Choose flight type</option>
        <option value="return">Return</option>
        <option value="one-way">One way</option>
      </select>
      <small>{{bidRequestForm.validateErrorFlightType}}</small>
      <br>

      <select name="cabType" :value="bidRequestForm.cabType" @change="(evt) => {bidRequestForm.set(evt.target.name, evt.target.value)}" >
        <option value="" disabled >Choose cab type</option>
        <option value="private">Private</option>
        <option value="shared">Shared</option>
      </select>
      <small>{{bidRequestForm.validateErrorCabType}}</small>
      <br>

      <!-- <button @click="bidRequestForm.reset()" >reset</button> -->
      <button
        :disabled="!bidRequestForm.isValid"
        @click="bidRequestForm.submit()"
      >{{bidRequestForm.isBusy ? 'submitting...' : 'submit'}}</button>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Observer } from 'mobx-vue'
import store from '../stores/RootStore'
import VueJsonPretty from 'vue-json-pretty'
import BidRequestForm from '../stores/BidRequestForm'
import stringify from 'json-stringify-safe'

@Observer
@Component({
  components: {
    VueJsonPretty
  }
})
export default class Biding extends Vue {
  stringify = stringify
  store = store.bidStore
  bidRequestForm = store.bidRequestForm
  bid = null

  onTreeNodeSelection(path) {
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
.bid-request-form {
  background-color: #EEE;
  padding: 1px 15px 15px;
  margin-top: 15px;
  border-radius: 5px;
}
</style>

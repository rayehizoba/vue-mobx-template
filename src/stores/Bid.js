import {observable, action} from 'mobx'
import api from '../api/Biding'

export class Bid {
  /**
   * this bid must load its responses once it is created
   * @param {data from server} json 
   */
  constructor(json) {
    this.id = json.id
    this.updateFromJson(json)
    this.fetchResponses()
  }

  /**
   * unique id of this bid, immutable.
   */
  id = null

  /**
   * loading state of store
   */
  @observable
  loading = false

  /**
   * error state of store
   */
  @observable
  error = false

  @observable
  userId = null

  @observable
  services = []

  @observable
  servicesData = []
  
  @observable
  responses = []

  @observable
  budget = null

  @observable
  currency = null

  @observable
  flightTo = null

  @observable
  flightFrom = null

  @observable
  flightType = null

  @observable
  flightDeparture = null

  @observable
  hotelLocation = null

  @observable
  hotelStar = null

  @observable
  tripDuration = null

  @observable
  adultTravellers = null

  @observable
  childTravellers = null

  @observable
  totalTravellers = null

  @observable
  cabType = null

  @observable
  tourLanguages = null

  @observable
  createdAt = null

  /**
   * Update this bid with information from the server
   */
  updateFromJson(json) {
    this.userId = json.userId
    this.services = json.services
    this.servicesData = json.servicesData
    this.budget = json.budget
    this.currency = json.currency
    this.slug = json.slug
    this.flightTo = json.flightTo
    this.flightFrom = json.flightFrom
    this.flightType = json.flightType
    this.flightDeparture = json.flightDeparture
    this.hotelLocation = json.hotelLocation
    this.hotelStar = json.hotelStar
    this.tripDuration = json.tripDuration
    this.adultTravellers = json.adultTravellers
    this.childTravellers = json.childTravellers
    this.totalTravellers = json.totalTravellers
    this.cabType = json.cabType
    this.tourLanguages = json.tourLanguages
    this.createdAt = json.created_at
    this.responses = json.responses
  }

  /**
   * fetch responses for this bid from
   * backend server
   */
  async fetchResponses() {
    this.loading = true
    const { data, error } = await api.fetchBidResponses(this.slug)
    this.loading = false
    this.error = error
    if (!error) {
      this.updateFromJson(data)
    }
  }

  @action
  async sendResponse() {}

}
export default Bid
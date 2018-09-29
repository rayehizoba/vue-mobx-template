import {observable, action} from 'mobx'

export class Bid {
  /**
   * this bid must load its responses once it is created
   * @param {data from server} json 
   */
  constructor(json, bidingApi) {
    this.bidingApi = bidingApi
    this.id = json.id
    this.updateFromJson(json)
    this.fetchResponses()
  }

  bidingApi

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

  /**
   * json data from server
   * TODO: split this aggregated data into atomic data points
   */
  @observable
  json = {}

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
  slug = null

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
    this.json = json
  }

  /**
   * fetch responses for this bid from
   * backend server
   */
  async fetchResponses() {
    this.loading = true
    const { data: fetchedResponses, error } = await this.bidingApi.fetchBidResponses(this.slug)
    this.loading = false
    this.error = error
    this.responses = fetchedResponses
  }

  @action
  async sendResponse() {}

}
export default Bid
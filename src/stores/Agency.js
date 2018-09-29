import {observable, action} from 'mobx'
import { Deal } from './Deal'

export class Agency {
  constructor(json, api) {
    this.id = json.id
    this.updateFromJson(json)
    this.api = api
  }

  api

  /**
   * unique id of this model, immutable.
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
  address

  @observable
  country

  @observable
  createdAt

  @observable
  email

  @observable
  logo

  @observable
  name

  @observable
  phone

  @observable
  slug

  @observable
  state

  @observable
  loadingDeals = false

  @observable
  errorDeals = false

  @observable
  deals = []

  @action
  async refresh() {
    this.loading = true
    const { data: fetchedAgency, error, message } = await this.api.fetchAgency(this.slug)
    this.loading = false
    this.error = error
    this.notification = message
    if (!error) {
      this.updateFromJson(fetchedAgency)
    }
  }

  @action
  async fetchDeals() {
    this.loadingDeals = true
    const { data: fetchedDeals, error, message } = await this.api.fetchDeals(this.id)
    this.loadingDeals = false
    this.loadingError = error
    this.notification = message
    if (!error) {
      fetchedDeals.forEach(json => this.updateDealsFromServer(json))
    }
  }

  updateDealsFromServer(json) {
    let deal = this.deals.find(d => d.id === json.id);
    if (!deal) {
      deal = new Deal(json)
      this.deals.push(deal)
    } else {
      deal.updateFromJson(json)
    }
  }

  /**
   * Update this model with information from the server
   */
  updateFromJson(json) {    
    this.address = json.address
    this.country = json.country
    this.createdAt = json.created_at
    this.email = json.email
    this.logo = json.logo
    this.name = json.name
    this.phone = json.phone
    this.slug = json.slug
    this.state = json.state
  }
}
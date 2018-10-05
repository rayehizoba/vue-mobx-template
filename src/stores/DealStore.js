import {observable, action, when, computed, autorun} from 'mobx'
import api from '../api/Deal'
import { Deal } from './Deal'
import Form from './FormStore'

class Filter extends Form {
  constructor(parentStore) {
    super()
    this.parentStore = parentStore
    autorun(() => {
      if ( this.services.length ) {
        this.parentStore.fetchDeals()
      }
      if (!!this.minPrice && !!this.maxPrice) {
        this.parentStore.fetchDeals()
      }
      if (!this.isActive) {
        this.parentStore.fetchDeals()
      }
    }, { delay: 500 })
  }

  @observable
  services = []

  @observable
  minPrice = ''

  @observable
  maxPrice = ''

  /**
   * adds a service id to this.services
   * ensures that this.services contains no duplicates
   */
  @action
  setService(id) {
    if (this.services.indexOf(id) < 0) {
      this.services.push(id)
    } else {
      this.services.splice( this.services.indexOf(id), 1 )
    }
  }

  @computed
  get isActive() {
    if (this.services.length > 0) {
      return true
    }
    if (this.minPrice.length && this.maxPrice.length) {
      return true
    }
    return false
  }

  @computed
  get query() {
    const q = {
      services: this.services.slice(),
      price: [this.minPrice, this.maxPrice]
    }
    if (!this.minPrice.length || !this.maxPrice.length) {
      delete q.price
    }
    return q
  }

  @action
  clear() {
    this.services.clear()
    this.minPrice = ''
    this.maxPrice = ''
  }
}

export default class DealStore {
  filter
  constructor(rootStore) {
    this.rootStore = rootStore
    this.filter = new Filter(this)
    when(
      () => this.notification.length,
      () => console.log('New notification! ', this.notification)
    )
  }
  
  /**
   * Loading state of store
   */
  @observable
  loading = false

  /**
   * Error state of store
   */
  @observable
  error = false

  /**
   * latest notification message
   */
  @observable
  notification = ''

  /**
   * List of Deal observables
   */
  @observable
  deals = []

  @action
  async filterDeals() {
    this.loading = 'Filtering deals'
    const { data: fetchedDeals, error, message } = await api.filterDeals(this.filter.query)
    this.loading = false
    this.error = error
    this.notification = message
    if (!error) {
      this.deals.clear()
      fetchedDeals.forEach(json => this.updateDealFromServer(json))
    }
  }

  /**
   * Fetch deals from backend service
   */
  @action
  async fetchDeals() {
    if (this.filter.isActive) {
      return this.filterDeals()
    }
    this.loading = 'Fetching deals'
    const { data: fetchedDeals, error, message } = await api.fetchDeals()
    this.loading = false
    this.error = error
    this.notification = message
    if (!error) {
      fetchedDeals.forEach(json => this.updateDealFromServer(json))
    }
  }

  /**
   * Update a deal with information from the server. Guarantees a deal
   * only exists once. Might either construct a new deal, update an existing one
   */
  updateDealFromServer(json) {
    let deal = this.deals.find(d => d.id === json.id);
    if (!deal) {
      deal = new Deal(json, api)
      this.deals.push(deal)
    } else {
      deal.updateFromJson(json)
    }
  }

  /**
   * Remove this deal from the client and server
   */
  @action
  async remove(deal) {
    deal.loading = 'Removing deal...'
    const { error, message } = await api.deleteDeal(deal.slug)
    deal.loading = false
    if (!error) {
      this.notification = message
      this.deals.splice(this.deals.indexOf(deal), 1);
    }
  }

}

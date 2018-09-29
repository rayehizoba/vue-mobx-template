import {observable, action, when} from 'mobx'
import api from '../api/Deal'
import { Deal } from './Deal'

export default class DealStore {

  constructor(rootStore) {
    this.rootStore = rootStore
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

  /**
   * Fetch deals from backend service
   */
  @action
  async fetchDeals() {
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

import {observable, action, when} from 'mobx'
import bidingApi from '../api/Biding'
import { Bid } from './Bid'

export default class BidStore {

  constructor(rootStore) {
    this.rootStore = rootStore
    when(
      () => this.notification.length,
      () => console.log('New notification! ', this.notification)
    )
  }
  
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
   * latest notification message
   */
  @observable
  notification = ''

  /**
   * List of Bid observables
   */
  @observable
  bids = []

  /**
   * Fetch bids for this account from backend service
   */
  @action
  async fetchBids() {
    this.loading = 'Fetching bids'
    const { data: fetchedBids, error, message } = await bidingApi.fetchBids()
    this.loading = false
    this.error = error
    this.notification = message
    if (!error) {
      fetchedBids.forEach(json => this.updateBidFromServer(json))
    }
  }

  /**
   * Update a bid with information from the server. Guarantees a bid
   * only exists once. Might either construct a new bid, update an existing one
   */
  updateBidFromServer(json) {
    let bid = this.bids.find(b => b.id === json.id);
    if (!bid) {
      bid = new Bid(json, bidingApi)
      this.bids.push(bid)
    } else {
      bid.updateFromJson(json)
    }
  }

  /**
   * Remove this bid from the client and server
   */
  @action
  async remove(bid) {
    bid.loading = true
    const { error, message } = await bidingApi.deleteBid(bid.slug)
    bid.loading = false
    if (!error) {
      this.notification = message
      this.bids.splice(this.bids.indexOf(bid), 1);
    }
  }
}

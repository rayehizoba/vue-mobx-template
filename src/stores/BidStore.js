import {observable, action} from 'mobx'
import bidingApi from '../api/Biding'
import { Bid } from './Bid'

export class BidStore {

  constructor(bidingApi) {
    this.bidingApi = bidingApi
    this.fetchBids()
  }

  bidingApi
  
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
   * List of Bid observables
   */
  @observable
  bids = []

  /**
   * Fetch bids for this account from backend service
   */
  @action
  async fetchBids() {
    this.loading = true
    const { data: fetchedBids, error } = await this.bidingApi.fetchBids()
    this.loading = false
    this.error = error
    fetchedBids.forEach(json => this.updateBidFromServer(json))
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
   * sends a new bid request form to the backend server
   */
  @action
  sendBidRequest() {}

  /**
   * Remove this bid from the client and server
   */
  @action
  async remove(bid) {
    bid.loading = true
    const { error, message } = await this.bidingApi.deleteBid(bid.slug)
    bid.loading = false
    if (!error) {
      this.error = message
      this.bids.splice(this.bids.indexOf(bid), 1);
    }
  }
}

const store = new BidStore(bidingApi)
export default store

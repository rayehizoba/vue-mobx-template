import axios from '../lib/axios'
import Constants from '../lib/constants'

export class BidingApi {
  static async fetchBids() {
    try {
      const { data: response } = await axios.get(`${Constants.baseUrl}/bids/fetchAll`)
      return response
    } catch(e) {
      return e.response.data
    }
  }
  static async fetchBidResponses(bidSlug) {
    const { data: response } = await axios({
      method: 'get',
      url: `${Constants.baseUrl}/bids/fetchOne`,
      params: {
        slug: bidSlug,
        getResponses: true
      }
    });
    return response
  }
  static async deleteBid(bidSlug) {
    const { data: response } = await axios({
      method: 'get',
      url: `${Constants.baseUrl}/bids/delete`,
      params: { slug: bidSlug }
    });
    return response
  }
  static async sendBidRequest(data) {
    const response = await axios({
      method: 'post',
      url: `${Constants.baseUrl}/bids/sendBid`,
      data
    });
    return response
  }
}
export default BidingApi
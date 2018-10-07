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
    try {
      const { data: response } = await axios({
        method: 'get',
        url: `${Constants.baseUrl}/bids/fetchOne`,
        params: {
          slug: bidSlug,
          getResponses: true
        }
      })
      return response
    } catch(e) {
      return e.response.data
    }
  }
  static async deleteBid(bidSlug) {
    try {
      const { data: response } = await axios({
        method: 'get',
        url: `${Constants.baseUrl}/bids/delete`,
        params: { slug: bidSlug }
      })
      return response
    } catch(e) {
      return e.response.data
    }
  }
  static async sendBidRequest(data) {
    try {
      const response = await axios({
        method: 'post',
        url: `${Constants.baseUrl}/bids/sendBid`,
        data
      })
      return response.data
    } catch(e) {
      return e.response.data
    }
  }
  static async sendBidResponse(data) {
    try {
      const response = await axios({
        method: 'post',
        url: `${Constants.baseUrl}/bids/sendResponse`,
        data
      })
      return response.data
    } catch(e) {
      return e.response.data
    }
  }
}
export default BidingApi
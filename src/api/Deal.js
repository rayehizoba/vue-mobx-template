import axios from '../lib/axios'
import Constants from '../lib/constants'

export class DealApi {
  static async fetchDeals() {
    try {
      const { data: response } = await axios.get(`${Constants.baseUrl}/deals/fetchAll`)
      return response
    } catch(e) {
      return e.response.data
    }
  }
  static async deleteDeal(slug) {
    const { data: response } = await axios({
      method: 'get',
      url: `${Constants.baseUrl}/deals/delete`,
      params: { slug }
    });
    return response
  }
}
export default DealApi
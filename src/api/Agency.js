import axios from '../lib/axios'
import Constants from '../lib/constants'

export class AgencyApi {
  static async fetchAgencies() {
    try {
      const { data: response } = await axios.get(`${Constants.baseUrl}/agency/fetchAll`)
      return response
    } catch(e) {
      return e.response.data
    }
  }
  static async fetchAgency(slug) {
    const { data: response } = await axios({
      method: 'get',
      url: `${Constants.baseUrl}/agency/fetchOne`,
      params: { slug }
    });
    return response
  }
  static async fetchDeals(id) {
    const { data: response } = await axios({
      method: 'get',
      url: `${Constants.baseUrl}/deals/fetchAll`,
      params: { agencyId: id }
    });
    return response
  }
  static async search(data) {
    try {
      const { data: response } = await axios({
        method: 'post',
        url: `${Constants.baseUrl}/search/findAgencies`,
        data
      })
      return response
    } catch(e) {
      return e.response.data
    }
  }
}
export default AgencyApi
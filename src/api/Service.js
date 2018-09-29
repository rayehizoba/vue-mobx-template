import axios from '../lib/axios'
import Constants from '../lib/constants'

export class ServiceApi {
  static async fetchServices() {
    try {
      const { data: response } = await axios.get(`${Constants.baseUrl}/categories/fetchAll`)
      return response
    } catch(e) {
      return e.response.data
    }
  }
}
export default ServiceApi
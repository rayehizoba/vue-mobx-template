import axios from '../lib/axios'
import Constants from '../lib/constants'

export class AuthApi {
  static async login(data) {
    try {
      const { data: response } = await axios({
        method: 'post',
        url: `${Constants.baseUrl}/authentication/signIn`,
        data
      })
      return response
    } catch(e) {
      return e.response.data
    }
  }
  static async forgotPassword(data) {
    try {
      const { data: response } = await axios({
        method: 'post',
        url: `${Constants.baseUrl}/authentication/forgotPassword`,
        data
      })
      return response
    } catch(e) {
      return e.response.data
    }
  }
  static async signup(data) {
    try {
      const { data: response } = await axios({
        method: 'post',
        url: `${Constants.baseUrl}/authentication/signUp`,
        data
      })
      return response
    } catch(e) {
      return e.response.data
    }
  }
}
export default AuthApi
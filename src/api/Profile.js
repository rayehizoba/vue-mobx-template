import axios from '../lib/axios'
import Constants from '../lib/constants'

export class ProfileApi {
  static async update(data, isMultipartData) {
    try {
      const headers = isMultipartData ? {
        'Content-Type': 'multipart/form-data'
      } : {}
      const { data: response } = await axios({
        method: 'post',
        url: `${Constants.baseUrl}/user/update`,
        data,
        headers
      })
      return response
    } catch(e) {
      return e.response.data
    }
  }
}
export default ProfileApi
import axios from '../lib/axios'
import Constants from '../lib/constants'

export class MessagingApi {
  static async fetchThreads() {
    const { data: response } = await axios.get(`${Constants.baseUrl}/messages/getThreads`)
    return response
  }
  static async fetchMessages(threadSlug) {
    const { data: response } = await axios({
      method: 'get',
      url: `${Constants.baseUrl}/messages/getMessages`,
      headers: { threadSlug }
    });
    return response
  }
  static async sendMessage(query, threadSlug) {
    const { data: response } = await axios({
      method: 'post',
      url: `${Constants.baseUrl}/messages/sendMessage`,
      headers: { threadSlug },
      data: query
    });
    return response
  }
}
export default MessagingApi
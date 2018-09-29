import axios from '../lib/axios'
import Constants from '../lib/constants'

export class MessagingApi {
  static async fetchThreads() {
    try {
      const { data: response } = await axios.get(`${Constants.baseUrl}/messages/getThreads`)
      return response
    } catch(e) {
      return e.response.data
    }
  }
  static async fetchThread(slug) {
    const { data: response } = await axios({
      method: 'get',
      url: `${Constants.baseUrl}/messages/getThreads`,
      params: { slug }
    })
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
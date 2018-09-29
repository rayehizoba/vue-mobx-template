import axios from '../lib/axios'
import Constants from '../lib/constants'

export class DocumentApi {
  static async fetchDocuments() {
    try {
      const { data: response } = await axios.get(`${Constants.baseUrl}/documents/fetchAll`)
      return response
    } catch(e) {
      return e.response.data
    }
  }
  static async deleteDocument(docSlug) {
    const { data: response } = await axios({
      method: 'get',
      url: `${Constants.baseUrl}/documents/delete`,
      params: { slug: docSlug }
    });
    return response
  }
  static async uploadDocuments(formData) {
    try {
      const { data: response } = await axios.post(`${Constants.baseUrl}/documents/upload`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }
      )
      return response
    } catch(e) {
      return e.response.data
    }
  }
}
export default DocumentApi
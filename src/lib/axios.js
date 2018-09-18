import axios from 'axios'
import Constants from './constants'

const instance = axios.create({
  baseURL: Constants.baseURL,
  headers: {
    'Content': 'application/json',
    'Authorization': `bearer ${Constants.token}`
  }
})

export default instance

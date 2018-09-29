import axios from 'axios'
import Constants from './constants'

const instance = axios.create({
  baseURL: Constants.baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export default instance

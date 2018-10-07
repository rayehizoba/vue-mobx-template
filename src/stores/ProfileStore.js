import {observable, action, when, computed} from 'mobx'
import axios from '../lib/axios'
import { persist } from 'mobx-persist'

export default class ProfileStore {

  constructor(rootStore) {
    this.rootStore = rootStore
    when(
      () => !!this.token,
      () => {
        /**
         * set Axios auth bearer when ever token changes
         */
        axios.defaults.headers.common['Authorization'] = `bearer ${this.token}`
      }
    )
  }

  @persist
  @observable
  id = null

  @persist
  @observable
  fullName

  @persist
  @observable
  email

  @persist
  @observable
  phone

  @persist
  @observable
  country

  @persist
  @observable
  state

  @persist
  @observable
  address

  @persist
  @observable
  avatar

  @persist
  @observable
  type

  @persist
  @observable
  slug

  @persist
  @observable
  createdAt

  @persist
  @observable
  token

  @persist('object')
  @observable
  agency

  @action
  updateFromJson(json) {
    json.id && (this.id = json.id)
    json.fullName && (this.fullName = json.fullName)
    json.email && (this.email = json.email)
    json.phone && (this.phone = json.phone)
    json.country && (this.country = json.country)
    json.state && (this.state = json.state)
    json.address && (this.address = json.address)
    json.avatar && (this.avatar = json.avatar)
    json.type && (this.type = json.type)
    json.slug && (this.slug = json.slug)
    json.created_at && (this.createdAt = json.created_at)
    json.token && (this.token = json.token)
    json.agency && (this.agency = json.agency)
  }

  @action
  onLogout() {
    this.id = null
    this.fullName = null
    this.email = null
    this.phone = null
    this.country = null
    this.state = null
    this.address = null
    this.avatar = null
    this.type = null
    this.slug = null
    this.createdAt = null
    this.token = null
    this.agency = null
  }

  @computed
  get isAgency() {
    if (this.type === 'agency') return true
    return false
  }
}

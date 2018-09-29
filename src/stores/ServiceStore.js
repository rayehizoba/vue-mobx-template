import {observable, action} from 'mobx'
import api from '../api/Service'
import { Service } from './Service'
import { persist } from 'mobx-persist'

export default class ServiceStore {

  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable
  loading = false

  @observable
  error = false

  @observable
  notification = ''

  @persist('list')
  @observable
  services = []

  /**
   * Fetch models from backend service
   */
  @action
  async fetch() {
    this.loading = 'Fetching services'
    const { data: fetchedServices, error, message } = await api.fetchServices()
    this.loading = false
    this.error = error
    this.notification = message
    if (!error) {
      fetchedServices.forEach(json => this.updateFromServer(json))
    }
  }

  updateFromServer(json) {
    let service = this.services.find(a => a.id === json.id)
    if (!service) {
      service = new Service(json)
      this.services.push(service)
    } else {
      service.updateFromJson(json)
    }
  }
}

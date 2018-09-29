import {observable, when, action} from 'mobx'
import api from '../api/Agency'
import { Agency } from './Agency'

export default class AgencyStore {

  constructor(rootStore) {
    this.rootStore = rootStore
    when(
      () => this.notification.length,
      () => console.log('New notification! ', this.notification)
    )
  }

  @observable
  loading = false

  @observable
  error = false

  @observable
  notification = ''

  @observable
  agencies = []

  /**
   * Fetch agencies from backend service
   */
  @action
  async fetch() {
    this.loading = 'Fetching agencies'
    const { data: fetchedAgencies, error, message } = await api.fetchAgencies()
    this.loading = false
    this.error = error
    this.notification = message
    if (!error) {
      fetchedAgencies.forEach(json => this.updateFromServer(json))
    }
  }

  /**
   * Update a agency with information from the server. Guarantees a agency
   * only exists once. Might either construct a new agency, update an existing one
   */
  updateFromServer(json) {
    let agency = this.agencies.find(a => a.id === json.id);
    if (!agency) {
      agency = new Agency(json, api)
      this.agencies.push(agency)
    } else {
      agency.updateFromJson(json)
    }
  }
}

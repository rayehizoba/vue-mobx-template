import {observable, action, when, autorun} from 'mobx'
import api from '../api/Agency'
import { Agency } from './Agency'

export default class AgencySearchStore {

  constructor(rootStore) {
    this.rootStore = rootStore
    const a = autorun(() => {
      if (this.services.length === 0) return
      if (this.location.length === 0) return
      this.onSearch()
    })
  }

  @observable
  loading = false

  @observable
  error = false

  @observable
  notification = ''

  @observable
  agencies = []

  @observable
  location = ''

  @observable
  services = []

  /**
   * Fetch agencies from backend service
   */
  @action
  async onSearch() {
    this.loading = 'Searching agencies'
    const { data: fetchedAgencies, error, message } = await api.search({
      location: this.location, services: this.services
    })
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

  /**
   * adds a service id to this.services
   * ensures that this.services contains no duplicates
   */
  @action
  setService(id) {
    if (this.services.indexOf(id) < 0) {
      this.services.push(id)
    } else {
      this.services.splice( this.services.indexOf(id), 1 )
    }
  }

  @action
  setLocation(location) {
    this.location = location
  }
}

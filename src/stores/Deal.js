import {observable, action} from 'mobx'

export class Deal {
  constructor(json, dealApi) {
    this.id = json.id
    this.updateFromJson(json)
    this.dealApi = dealApi
  }

  dealApi

  /**
   * unique id of this deal, immutable.
   */
  id = null

  /**
   * loading state of store
   */
  @observable
  loading = false

  /**
   * error state of store
   */
  @observable
  error = false

  @observable
  agency

  @observable
  agencyId
  
  @observable
  amount

  @observable
  arrivalDate

  @observable
  createdAt

  @observable
  currency

  @observable
  departureDate

  @observable
  description

  @observable
  expiresOn

  @observable
  fromDestination
  
  @observable
  images
  
  @observable
  limit
  
  @observable
  name
  
  @observable
  services
  
  @observable
  slug
  
  @observable
  toDestination
  
  @observable
  userId
  
  @observable
  views

  /**
   * Update this deal with information from the server
   */
  updateFromJson(json) {    
    this.agency = json.agency
    this.agencyId = json.agencyId
    this.amount = json.amount
    this.arrivalDate = json.arrivalDate
    this.createdAt = json.created_at
    this.currency = json.currency
    this.departureDate = json.departureDate
    this.description = json.description
    this.expiresOn = json.expiresOn
    this.fromDestination = json.fromDestination
    this.images = json.images
    this.limit = json.limit
    this.name = json.name
    this.services = json.services
    this.slug = json.slug
    this.toDestination = json.toDestination
    this.userId = json.userId
    this.views = json.views
  }
}
import {observable} from 'mobx'

export class Service {
  constructor(json) {
    this.id = json.id
    this.updateFromJson(json)
  }

  /**
   * unique id of this model, immutable.
   */
  id = null

  @observable
  name

  @observable
  slug

  @observable
  image

  /**
   * Update this model with information from the server
   */
  updateFromJson(json) {    
    this.name = json.name
    this.slug = json.slug
    this.image = json.image
  }
}
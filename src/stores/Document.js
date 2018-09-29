import {observable, action} from 'mobx'

export class Document {
  constructor(json, documentApi) {
    this.documentApi = documentApi
    this.id = json.id
    this.updateFromJson(json)
  }

  documentApi

  /**
   * unique id of this document, immutable.
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
  slug = null

  @observable
  userId

  @observable
  source

  @observable
  type

  @observable
  createdAt

  @observable
  name

  @observable
  shares

  /**
   * Update this document with information from the server
   */
  updateFromJson(json) {
    this.slug = json.slug
    this.userId = json.userId
    this.source = json.document
    this.type = json.type
    this.createdAt = json.created_at
    this.shares = json.shares
    this.name = json.name
  }

}
export default Document
import {observable} from 'mobx'
import { persist } from 'mobx-persist'

export class Message {
  constructor(json) {
    this.id = json.id
    this.updateFromJson(json)
  }

  /**
   * unique id of this message, immutable.
   */
  @persist
  @observable
  id = null

  @persist
  @observable
  isRead
  
  @persist
  @observable
  message

  @persist
  @observable
  type

  /**
   * true if message is on its way to the
   * server
   */
  @observable
  isSending = false

  /**
   * Update this message with information from the server
   */
  updateFromJson(json) {    
    this.isRead = json.isRead | false
    this.isSending = !!json.isSending
    this.message = json.message
    this.senderId = json.senderId
    this.type = json.type
  }
}
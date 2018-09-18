import {observable, action} from 'mobx'

export class Message {
  constructor(json) {
    this.id = json.id
    this.updateFromJson(json)
  }

  /**
   * unique id of this thread, immutable.
   */
  id = null

  @observable
  isRead
  
  @observable
  message

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
    this.message = json.message
    this.type = json.type
    if (json.id) {
      this.isSending = false
    } else {
      this.isSending = true
    }
  }
}
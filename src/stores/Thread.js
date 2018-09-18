import {observable, action} from 'mobx'
import { Message } from './Message';

export class Thread {
  /**
   * this thread must load its messages once it is created
   * @param {data from server} json 
   */
  constructor(json, messagingApi) {
    this.messagingApi = messagingApi
    this.id = json.id
    this.updateFromJson(json)
    this.fetchMessages()
  }

  messagingApi

  /**
   * unique id of this thread, immutable.
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

  /**
   * last message in this thread
   */
  @observable
  lastMessage

  /**
   * list of messages in this thread
   */
  @observable
  messages = []

  @observable
  sender

  @observable
  receiver

  @observable
  agency

  @observable
  createdAt

  @observable
  slug

  @observable
  canRespond = false

  /**
   * Update this thread with information from the server
   */
  updateFromJson(json) {
    this.lastMessage = json.message
    this.sender = json.sender
    this.receiver = json.receiver
    this.agency = json.agency
    this.createdAt = json.created_at
    this.slug = json.slug
  }

  /**
   * fetch messages for this thread from
   * backend server
   */
  async fetchMessages() {
    this.loading = true
    const { data: fetchedMessages, error } = await this.messagingApi
      .fetchMessages(this.slug)
    this.loading = false
    this.error = error
    this.canRespond = fetchedMessages.canRespond
    for (var key in fetchedMessages) {
      if (isFinite(parseInt(key))) {
        const json = fetchedMessages[key]
        this.updateMessageFromServer(json)
      }
    }
  }

  /**
   * Update a message with information from the server. Guarantees a message
   * only exists once. Might either construct a new message or update an existing one
   */
  updateMessageFromServer(json) {
    let message = this.messages.find(m => m.id === json.id);
    if (!message) {
      message = new Message(json)
      this.messages.unshift(message)
    } else {
      message.updateFromJson(json)
    }
  }

  @action
  async sendMessage(message, type = 'text') {
    const query = {
      message,
      type,
      senderId: this.sender.id,
      agencyId: this.agency.id,
    }
    this.updateMessageFromServer(query)
    const { data: sentMessage } = await this.messagingApi.sendMessage(query, this.slug)
    this.updateMessageFromServer(sentMessage)
  }
  
}
export default Thread
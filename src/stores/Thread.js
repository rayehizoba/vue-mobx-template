import {observable, action, useStrict} from 'mobx'
import { Message } from './Message'
import uuidv1 from 'uuid/v1'
import { persist } from 'mobx-persist'

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
  @persist
  @observable
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
  // @persist
  @observable
  lastMessage

  /**
   * list of messages in this thread
   */
  // @persist('list', Message)
  @observable
  messages = []

  // @persist
  @observable
  sender

  // @persist
  @observable
  receiver

  // @persist
  @observable
  agency

  @persist
  @observable
  createdAt

  @persist
  @observable
  slug

  @persist
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
    const { data: fetchedMessages, error } = await this.messagingApi.fetchMessages(this.slug)
    this.loading = false
    this.error = error

    if (!error) {
      this.canRespond = fetchedMessages.canRespond
      this.messages.clear()
      for (var key in fetchedMessages) {
        if (isFinite(parseInt(key))) {
          const json = fetchedMessages[key]
          this.updateMessageFromServer(json)
        }
      }
    }
  }

  /**
   * Update a message with information from the server. Guarantees a message
   * only exists once. Might either construct a new message or update an existing one
   */
  updateMessageFromServer(json) {
    let message = this.messages.find(m => m.id === json.id)
    if (!message) {
      message = new Message(json)
      this.messages.unshift(message)
    } else {
      message.updateFromJson(json)
    }
  }

  @action
  async sendMessage(message, type = 'text') {
    const model = {
      message,
      type,
      senderId: this.sender.id,
      agencyId: this.agency.id,
      id: uuidv1(),
      isSending: true
    }
    this.updateMessageFromServer(model)
    const { data: sentMessage } = await this.messagingApi.sendMessage(model, this.slug)
    const updatedModel = { ...sentMessage, ...model, isSending: false }
    this.updateMessageFromServer(updatedModel)
    this.refresh()
  }

  @action
  async refresh() {
    this.loading = true
    const { data: fetchedThreads, error, message } = await this.messagingApi.fetchThread(this.slug)
    this.loading = false
    if (error) {
      this.error = message
    } else {
      this.updateFromJson(fetchedThreads.pop())
    }
  }
  
}
export default Thread
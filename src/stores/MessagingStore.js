import {observable, action} from 'mobx'
import messagingApi from '../api/Messaging';
import { Thread } from './Thread';

export class MessagingStore {

  constructor(messagingApi) {
    this.messagingApi = messagingApi
    this.fetchThreads()
  }

  messagingApi
  
  /**
   * Loading state of store
   */
  @observable
  loading = false

  /**
   * Error state of store
   */
  @observable
  error = false

  /**
   * List of Thread observables
   */
  @observable
  threads = []

  /**
   * Fetch threads for this account from backend service
   */
  @action
  async fetchThreads() {
    this.loading = true
    const { data: fetchedThreads, error } = await this.messagingApi.fetchThreads()
    this.loading = false
    this.error = error
    fetchedThreads.forEach(json => this.updateThreadFromServer(json))
  }

  /**
   * Update a thread with information from the server. Guarantees a thread
   * only exists once. Might either construct a new thread, update an existing one
   */
  updateThreadFromServer(json) {
    let thread = this.threads.find(t => t.id === json.id);
    if (!thread) {
      thread = new Thread(json, messagingApi)
      this.threads.push(thread)
    } else {
      thread.updateFromJson(json)
    }
  }
}

const store = new MessagingStore(messagingApi)
export default store
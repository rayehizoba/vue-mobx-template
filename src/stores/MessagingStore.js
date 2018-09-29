import {observable, action, when} from 'mobx'
import messagingApi from '../api/Messaging'
import { Thread } from './Thread'
import { persist } from 'mobx-persist'

export default class MessagingStore {

  constructor(rootStore) {
    this.rootStore = rootStore
    when(
      () => this.notification.length,
      () => console.log('New notification! ', this.notification)
    )
  }
  
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
   * store notification
   */
  @observable
  notification = ''

  /**
   * List of Thread observables
   */
  @persist('list', Thread)
  @observable
  threads = []

  /**
   * Fetch threads for this account from backend service
   */
  @action
  async fetchThreads() {
    this.loading = 'Fetching threads'
    const { data: fetchedThreads, error, message } = await messagingApi.fetchThreads()
    this.loading = false
    this.error = error
    this.notification = message
    if (!error) {
      fetchedThreads.forEach(json => this.updateThreadFromServer(json))
    }
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

import {observable, action, computed} from 'mobx'

class MessagingStore {
  
  @observable
  loading = false

  @observable
  error = false

  @observable
  threads = []

  @action.bound
  addThread() {
    this.loading = !this.loading
    // console.log(this.threads)
    // this.threads.push(t)
  }
}

const store = new MessagingStore()
export default store
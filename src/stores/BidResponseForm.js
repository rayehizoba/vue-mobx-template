import {observable, action} from 'mobx'
import validate from 'mobx-form-validate'
import api from '../api/Biding'
import Form from './FormStore'
import { flatten } from 'rambda'

export default class BidResponseForm extends Form {
  constructor(rootStore, data) {
    super(data)
    this.rootStore = rootStore
  }

  @observable
  @validate(/^.+$/)
  userId

  @observable
  @validate(/^.+$/)
  agencyId

  @observable
  @validate(/^.+$/)
  bidId

  @observable
  @validate((value) => value.length === 0, 'Please select at least one service')
  services = [2, 3]

  @observable
  @validate(/^.+$/, 'Please enter your message')
  message = null

  @observable
  @validate(/^[0-9]+$/, 'Please enter your budget')
  budget = null

  @observable
  @validate((value) => {
    const isValid = value === 'USD' || value === 'NGN'
    return isValid ? undefined : 'Please select a valid currency'
  })
  currency = null

  @action
  async submit() {
    if (this.loading) return false
    this.loading = true
    console.log('Submitting ', this.value)
    const { data, error, message } = await api.sendBidResponse(this.value)
    this.loading = false
    this.error = error
    this.notification = Array.isArray(message) ? flatten(message) : [message]
    this.rootStore.uiStore.setNotification(this.notification[0])
    if (!error) {
      let bid = this.rootStore.bidStore.bids.find(b => b.id === data.bidId)
      bid.fetchResponses()
    }
  }

  /**
   * adds a service id to this.services
   * ensures that this.services contains no duplicates
   */
  @action
  setService(id) {
    if (this.services.indexOf(id) < 0) {
      this.services.push(id)
    } else {
      this.services.splice( this.services.indexOf(id), 1 )
    }
  }
}

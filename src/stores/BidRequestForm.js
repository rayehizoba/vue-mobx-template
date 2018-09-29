import {observable, action} from 'mobx'
import validate from 'mobx-form-validate'
import bidingApi from '../api/Biding'
import Form from './FormStore'

export default class BidRequestForm extends Form {
  constructor(rootStore, data) {
    super(data)
    this.rootStore = rootStore
  }

  @observable
  @validate(/^.+$/)
  userId

  @observable
  @validate((value) => value.length === 0, 'Please select at least one service')
  services = [2, 3]

  @observable
  @validate(/^.+$/, 'Please enter your state')
  state = null

  @observable
  @validate(/^.+$/, 'Please enter your flight departure location')
  flightFrom = null

  @observable
  @validate(/^.+$/, 'Please enter your flight destination location')
  flightTo = null

  @observable
  @validate(/^.+$/, 'Please enter your flight departure date')
  flightDeparture = null

  @observable
  @validate(/^.+$/, 'Please enter your hotel location')
  hotelLocation = null

  @observable
  @validate(/^[0-5]{1}$/, 'Please enter your hotel rating [0 - 5]')
  hotelStar = null

  @observable
  @validate(/^[0-9]+$/, 'Please enter your trip duration (days)')
  tripDuration = null

  @observable
  @validate(/^[0-9]+$/, 'Please enter the number of adult travellers')
  adultTravellers = 1

  @observable
  @validate(/^[0-9]+$/, 'Please enter the number of child travellers')
  childTravellers = 0

  @observable
  @validate((value) => {
    const isValid = value === 'return' || value === 'one-way'
    return isValid ? undefined : 'Please select a valid flight-type'
  })
  flightType = null

  @observable
  @validate((value) => {
    const isValid = value === 'private' || value === 'shared'
    return isValid ? undefined : 'Please select a valid cab-type'
  })
  cabType = null

  @observable
  @validate(/^.+$/, 'Please choose your preferred tour language')
  tourLanguages = null

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
    const { data, error, message } = await bidingApi.sendBidRequest(this.value)
    console.log(data, error, message)
    this.loading = false
    if (error) {
      this.notification = message
    } else {
      this.notification = message
      this.rootStore.bidStore.fetchBids()
    }
  }
}
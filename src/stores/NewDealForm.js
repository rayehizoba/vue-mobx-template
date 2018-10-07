import {observable, action, toJS, computed} from 'mobx'
import validate from 'mobx-form-validate'
import api from '../api/Deal'
import Form from './FormStore'
import { flatten } from 'rambda'

export default class NewDealForm extends Form {
  constructor(rootStore, data) {
    super(data)
    this.rootStore = rootStore
  }

  @observable
  @validate(/^.+$/, 'Please enter agency id')
  agencyId

  @observable
  @validate(/^.+$/, 'Please enter a name')
  name

  @observable
  @validate((value) => value.length === 0, 'Please select at least one service')
  services = []

  @observable
  @validate(/^.+$/, 'Please enter a description')
  description = null

  @observable
  @validate(/^.+$/, 'Please enter your flight from-destination')
  fromDestination = null

  @observable
  @validate(/^.+$/, 'Please enter your flight to-destination')
  toDestination = null

  @observable
  @validate(/^.+$/, 'Please enter your flight departure date')
  departureDate = null

  @observable
  @validate(/^.+$/, 'Please enter your flight arrival date')
  arrivalDate = null

  @observable
  @validate(/^.+$/, 'Please enter your flight arrival date')
  expiresOn = null

  @observable
  @validate(/^.+$/, 'Please enter your limit')
  limit = 5

  @observable
  @validate(/^[0-9]+$/, 'Please enter your amount')
  amount = null

  @observable
  @validate((value) => {
    const isValid = value === 'USD' || value === 'NGN'
    return isValid ? undefined : 'Please select a valid currency'
  })
  currency = null

  @observable
  images = []

  @observable
  newImages = []

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

  @action
  async submit(next) {
    if (this.rootStore.profileStore.isAgency) {
      if (this.loading) return false
      this.loading = true
      console.log('Submitting ', this.value)
      let response
      if (this.value.dealId) {
        response = await api.updateDeal(this.value)
      } else {
        response = await api.createDeal(this.value)
      }
      const { data, error, message } = response
      console.log(data, error, message)
      this.loading = false
      this.notification = Array.isArray(message) ? flatten(message) : [message]
      this.rootStore.uiStore.setNotification(this.notification[0])
      if (!error) {
        this.rootStore.dealStore.updateDealFromServer(data)
        this.uploadImages(data.id)
        next()
      }
    } else {
      console.log('Only profileStore.type = agency and create deal')
    }
  }

  @action
  async uploadImages(id) {
    console.log(this.newImages)
    if (this.newImages.length > 0) {
      const formData = new FormData()
      formData.append('dealId', id)
      this.newImages.forEach(i => formData.append('images[]', i))
      const { message, error } = await api.uploadImages(formData)
      if (!error) {
        this.rootStore.uiStore.setNotification(message)
        this.rootStore.dealStore.fetchDeals()
      }
    }
  }

  @action
  addImage(image) {
    this.newImages.push(image)
  }

  @action
  removeImage(index) {
    this.newImages.splice(index, 1)
  }

  @action
  setAll(deal) {
    const data = toJS(deal)
    delete data.loading
    delete data.error
    delete data.notification
    data.dealId = deal.id
    delete data.id
    if (this.rootStore) {
      const foundServices = this.rootStore.serviceStore.findAll(data.services)
      data.services = foundServices.map(s => s.id)
    }
    super.setAll(data)
  }

  @computed
  get value() {
    const formValue = toJS(this)
    delete formValue.rootStore
    delete formValue.loading
    delete formValue.error
    delete formValue.notification
    delete formValue.images
    delete formValue.newImages
    delete formValue.agency
    delete formValue.agencyId
    delete formValue.createdAt
    delete formValue.slug
    delete formValue.userId
    delete formValue.views
    return formValue
  }
}

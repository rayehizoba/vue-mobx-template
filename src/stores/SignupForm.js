import {observable, action} from 'mobx'
import validate from 'mobx-form-validate'
import api from '../api/Auth'
import profileStore from './ProfileStore'
import Form from './FormStore'
import { flatten } from 'rambda'

export default class SignupForm extends Form {
  constructor(rootStore, data) {
    super(data)
    this.rootStore = rootStore
  }

  @observable
  @validate(/^.+$/, 'Please enter a valid password')
  password = null

  @observable
  @validate(/^.+$/, 'Please enter a valid password')
  password_confirmation = null

  @observable
  @validate(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address')
  email = null

  @observable
  @validate(/^.+$/, 'Please enter a valid fullname')
  fullName = null

  @observable
  @validate(/^.+$/, 'Please enter a valid address')
  address = null

  @observable
  @validate(/^.+$/, 'Please enter a valid phone number')
  phone = null

  @observable
  @validate(/^.+$/, 'Please enter a valid account type')
  type = 'user'

  @observable
  @validate(/^.+$/, 'Please enter a valid country')
  country = null

  @observable
  @validate(/^.+$/, 'Please enter a valid state')
  state = null

  @action
  async submit(next) {
    if (this.loading || !this.isValid) return false
    this.loading = true
    console.log('Submitting signup form ' + this.value)
    const { error = false, message, data } = await api.signup(this.value)
    this.loading = false
    this.error = error
    this.notification = Array.isArray(message) ? flatten(message) : [message]
    this.rootStore.uiStore.setNotification(this.notification[0])
    if (!this.error) {
      profileStore.updateFromJson(data)
      this.reset()
      next()
    }
  }
}

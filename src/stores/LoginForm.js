import {observable, action} from 'mobx'
import validate from 'mobx-form-validate'
import authApi from '../api/Auth'
import Form from './FormStore'
import { flatten } from 'rambda'

export default class LoginForm extends Form {
  constructor(rootStore, data) {
    super(data)
    this.rootStore = rootStore
  }

  @observable
  @validate(/^.+$/, 'Please enter a valid password')
  password = null

  @observable
  @validate(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address')
  email = null

  @action
  async submit(next) {
    if (this.loading || !this.isValid) return false
    this.loading = true
    console.log('Submitting form', this.value)
    const { error, message, data } = await authApi.login(this.value)
    this.loading = false
    this.error = error
    this.notification = Array.isArray(message) ? flatten(message) : [message]
    if (!error) {
      this.rootStore.profileStore.updateFromJson(data)
      this.rootStore.profileUpdateForm.set('userId', data.id)
      this.rootStore.profileUpdateForm.setAll(data)
      next()
    } else {
      this.rootStore.uiStore.setNotification(this.notification[0])
    }
  }
}

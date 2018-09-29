import {observable, action} from 'mobx'
import validate from 'mobx-form-validate'
import authApi from '../api/Auth'
import Form from './FormStore'

export default class ForgotPasswordForm extends Form {
  constructor(rootStore, data) {
    super(data)
    this.rootStore = rootStore
  }

  @observable
  @validate(/^.+$/, 'Please enter a target url')
  target = 'http://example.com/resetPassword'

  @observable
  @validate(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address')
  email = null

  @action
  async submit() {
    if (this.loading || !this.isValid) return false
    this.loading = true
    console.log('Submitting', this.value)
    const { error, message } = await authApi.forgotPassword(this.value)
    this.error = error
    this.notification = message
    this.loading = false
  }
}

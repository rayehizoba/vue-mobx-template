import {observable, action} from 'mobx'
import validate from 'mobx-form-validate'
import api from '../api/Profile'
import Form from './FormStore'
import { flatten } from 'rambda'

export default class ProfileUpdateForm extends Form {
  constructor(rootStore, data) {
    super(data)
    this.rootStore = rootStore
  }

  @observable
  @validate(/^.+$/, 'Please enter a valid userId')
  userId

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
  @validate(/^.+$/, 'Please enter a valid country')
  country = null

  @observable
  @validate(/^.+$/, 'Please enter a valid state')
  state = null

  @observable
  avatar = null

  @action
  async submit() {
    if (this.loading || !this.isValid) return false
    this.loading = true
    let formValue = {...this.value}
    if (!formValue.avatar) {
      delete formValue.avatar
    } else {
      const multipartForm = new FormData()
      Object.entries(formValue).forEach(([key, value]) => multipartForm.append(key, value))
      formValue = multipartForm
    }
    console.log('Submitting form', formValue)
    const { error, message, data } = await api.update(formValue, !!this.value.avatar)
    this.loading = false
    this.error = error
    this.notification = Array.isArray(message) ? flatten(message) : message
    console.log(error, message, data)
    if (!error) {
      this.rootStore.profileStore.updateFromJson(data)
    }
  }
}

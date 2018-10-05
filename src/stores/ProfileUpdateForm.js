import {observable, action} from 'mobx'
import validate from 'mobx-form-validate'
import api from '../api/Profile'
import Form from './FormStore'
import { flatten } from 'rambda'
import { persist } from 'mobx-persist'

export default class ProfileUpdateForm extends Form {
  constructor(rootStore, data) {
    super(data)
    this.rootStore = rootStore
  }

  @persist
  @observable
  @validate(/^.+$/, 'Please enter a valid userId')
  userId

  @persist
  @observable
  @validate(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address')
  email = null

  @persist
  @observable
  @validate(/^.+$/, 'Please enter a valid fullname')
  fullName = null

  @persist
  @observable
  @validate(/^.+$/, 'Please enter a valid address')
  address = null

  @persist
  @observable
  @validate(/^.+$/, 'Please enter a valid phone number')
  phone = null

  @persist
  @observable
  @validate(/^.+$/, 'Please enter a valid country')
  country = null

  @persist
  @observable
  @validate(/^.+$/, 'Please enter a valid state')
  state = null

  @observable
  avatar = null

  @action
  async submit(next) {
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
    this.notification = Array.isArray(message) ? flatten(message) : [message]
    console.log(error, this.notification, data)
    this.rootStore.uiStore.setNotification(this.notification[0])
    if (!error) {
      this.rootStore.profileStore.updateFromJson(data)
      next()
    }
  }
}

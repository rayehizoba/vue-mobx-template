import {observable, action, extendObservable, toJS, computed} from 'mobx'

export default class Form {
  /**
   * extends form with default data and
   * overwrites already present values
   * (
   *  useful for initializing form 
   *  with default values
   * )
   */
  constructor(data = {}) {
    this.setAll(data)
    try {
      extendObservable(this, data)
    } catch(e) {}
  }

  @observable
  loading = false

  @observable
  error = null

  @observable
  notification = null

  @action
  set(key, value) {
    if (!!!key) return
    this[key] = value
  }

  @action
  setAll(keyValues) {
    Object.entries(keyValues).forEach(
      ([key, value]) => this[key] = value
    )
  }

  @action
  reset() {
    Object.entries(this.value).forEach(
      ([key, _]) => this[key] = null
    )
  }

  @computed
  get value() {
    const formValue = toJS(this)
    delete formValue.rootStore
    delete formValue.loading
    delete formValue.error
    delete formValue.notification
    return formValue
  }
}
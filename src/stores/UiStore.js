import { observable, action, when } from 'mobx'

export default class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore
    when(
      () => this.notification.length,
      () => console.log('New notification! ', this.notification)
    )
  }

  @observable
  notification = ''

  @observable
  imageViewer = false

  @observable
  imageViewerImages = []

  @observable
  imageViewerIndex

  @action
  onShowImageViewer = (images, index) => {
    this.imageViewerImages = images
    this.imageViewerIndex = index
    this.imageViewer = true
  }

  @action
  onHideImageViewer = () => {
    this.imageViewer = false
  }

  @action
  setNotification(notification, timeout = 2500) {
    this.notification = notification
    setTimeout(() => {
      this.notification = ''
    }, timeout)
  }
}
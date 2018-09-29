import AgencyStore from './AgencyStore'
import BidStore from './BidStore'
import DealStore from './DealStore'
import DocumentStore from './DocumentStore'
import MessagingStore from './MessagingStore'
import ProfileStore from './ProfileStore'
import BidRequestForm from './BidRequestForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import LoginForm from './LoginForm'
import ProfileUpdateForm from './ProfileUpdateForm'
import SignupForm from './SignupForm'
import ServiceStore from './ServiceStore'
import AgencySearchStore from './AgencySearchStore'
import { create } from 'mobx-persist'

const hydrate = create({
  /**
   * localStorage or AsyncStorage in react-native.
   * default: localStorage
   */
  storage: localStorage
})

class RootStore {
  constructor() {
    this.signupForm = new SignupForm(this, {
      address: '7 awoyaya street, lekki',
      country: 'Nigeria',
      email: 'tunde@findworka.com',
      fullName: 'raymond',
      password: 'secret',
      password_confirmation: 'secret',
      phone: '08143545665',
      state: 'lagos',
      type: 'user',
    })
    this.loginForm = new LoginForm(this, {
      email: 'tunde@findworka.com',
      password: 'secret'
    })
    this.forgotPasswordForm = new ForgotPasswordForm(this, { email: 'raymond@findworka.com' })
    this.profileUpdateForm = new ProfileUpdateForm(this)
    this.agencyStore = new AgencyStore(this)
    this.dealStore = new DealStore(this)
    this.bidStore = new BidStore(this)
    this.bidRequestForm = new BidRequestForm(this)
    this.documentStore = new DocumentStore(this)
    this.profileStore = new ProfileStore(this)
    this.serviceStore = new ServiceStore(this)
    // hydrate('ServiceStore', this.serviceStore).then(
    //   (s) => console.log('serviceStore hydrated', s)
    // )
    this.messagingStore = new MessagingStore(this)
    this.agencySearchStore = new AgencySearchStore(this)
    // hydrate('MessagingStore', this.messagingStore).then(
    //   (x) => console.log('messagingStore hydrated', x)
    // )
    hydrate('ProfileStore', this.profileStore).then(
      (_) => {
        // console.log('profileStore hydrated', x)
        this.subscribeStoresWithServer()
      }
    )
  }
  subscribeStoresWithServer() {
    this.dealStore.fetchDeals()
    this.agencyStore.fetch()
    this.messagingStore.fetchThreads()
    this.bidStore.fetchBids()
    this.documentStore.fetchDocuments()
    this.serviceStore.fetch()
  }
}
const rootStore = new RootStore()
export default rootStore

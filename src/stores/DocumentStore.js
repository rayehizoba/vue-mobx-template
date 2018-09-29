import {observable, action, when, computed} from 'mobx'
import documentApi from '../api/Document'
import { Document } from './Document'

export default class DocumentStore {

  constructor(rootStore) {
    this.rootStore = rootStore
    when(
      () => this.notification.length,
      () => console.log('New notification! ', this.notification)
    )
  }
  
  /**
   * loading state of store
   */
  @observable
  loading = false

  /**
   * error state of store
   */
  @observable
  error = false

  /**
   * latest notification message
   */
  @observable
  notification = ''

  /**
   * List of Document observables
   */
  @observable
  documents = []

  @observable
  filter = ''

  @computed
  get filteredDocuments() {
    if (this.filter === '') {
      return this.documents
    }
    return this.documents.filter((doc) => {
      return doc.name.toLowerCase().includes(this.filter)
    })
  }

  /**
   * Fetch documents for this account from backend service
   */
  @action
  async fetchDocuments() {    
    this.loading = 'Fetching documents'
    const { data: fetchedDocs, error, message } = await documentApi.fetchDocuments()
    this.loading = false
    this.error = error
    this.notification = message
    if (!error) {
      fetchedDocs.forEach(json => this.updateDocFromServer(json))
    }
  }

  /**
   * Update a doc with information from the server. Guarantees a doc
   * only exists once. Might either construct a new doc, update an existing one
   */
  updateDocFromServer(json) {
    let doc = this.documents.find(d => d.id === json.id);
    if (!doc) {
      doc = new Document(json, documentApi)
      this.documents.push(doc)
    } else {
      doc.updateFromJson(json)
    }
  }

  /**
   * Remove this document from the client and server
   */
  @action
  async remove(document) {
    document.loading = 'Removing document...'
    const { error, message } = await documentApi.deleteDocument(document.slug)
    document.loading = false
    if (!error) {
      this.notification = message
      this.documents.splice(this.documents.indexOf(document), 1);
    }
  }

  @action
  async uploadDocument(document, type) {
    this.loading = 'Uploading document file'
    const formData = new FormData()
    formData.append('types[]', type)
    formData.append('documents[]', document)
    const { data: fetchedDocs, error, message } = await documentApi.uploadDocuments(formData)
    this.loading = false
    this.error = error
    this.notification = message
    if (!error) {
      fetchedDocs.forEach(json => this.updateDocFromServer(json))
    }
  }

  @action
  setFilter(value) {
    this.filter = value
  }
}

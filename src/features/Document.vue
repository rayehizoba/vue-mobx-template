<template>
  <div>
    <h5 class="sticky-header" >Document Store</h5>
    <button @click="store.fetchDocuments()" >Fetch documents</button>
    <vue-json-pretty
      :data="JSON.parse(stringify(store))"
      showLength
      :deep="1"
      @click="handleClick"
      selectableType="tree"
      :pathSelectable="pathSelectable"
    />

    <div v-if="!!document" >
      <hr>
      <p>Selected Document</p>
      <button @click="onRemove(document)" >Remove Document</button>
      <vue-json-pretty
        :data="JSON.parse(stringify(document))"
        showLength
        :deep="1"
      />
    </div>

    <div class="document-filter">
      <h5>Filtered documents</h5>
      <input
        type="text"
        placeholder="Type to search"
        @keyup="(evt) => store.setFilter(evt.target.value)" 
      />
      <vue-json-pretty
        :data="JSON.parse(stringify(store.filteredDocuments))"
        showLength
        :deep="0"
        @click="handleClick"
        selectableType="tree"
        :pathSelectable="pathSelectable"
      />
    </div>

    <div class="new-document-form">
      <h5>New document form</h5>
      <input type="file" accept="application/pdf" @change="onUploadDoc" >
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Observer } from 'mobx-vue'
import store from '../stores/RootStore'
import VueJsonPretty from 'vue-json-pretty'
import stringify from 'json-stringify-safe'

@Observer
@Component({
  components: {
    VueJsonPretty
  }
})
export default class Document extends Vue {
  stringify = stringify
  store = store.documentStore
  document = null

  handleClick(path) {
    let pathSplit = path.split('[')
    pathSplit = pathSplit[1].split(']')
    const docIndex = parseInt(pathSplit[0])
    this.document = this.store.documents[docIndex]
  }
  pathSelectable(path) {
    const pathSplit = path.split('.')
    if (pathSplit.length === 2 && pathSplit[1].includes('[')) {
      return true
    }
    return false
  }
  onRemove(document) {
    this.store.remove(document)
    this.document = null
  }
  onUploadDoc(evt) {
    this.store.uploadDocument(evt.target.files[0], evt.target.value)
  }
}
</script>

<style>
.document-filter, .new-document-form {
  background-color: #EEE;
  padding: 1px 15px 15px;
  margin-top: 15px;
  border-radius: 5px;
}
</style>

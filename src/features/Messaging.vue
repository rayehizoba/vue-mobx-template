<template>
  <div>
    <h5 class="sticky-header" >Messaging Store</h5>
  
    <button @click="store.fetchThreads()" >Fetch threads</button>
    <vue-json-pretty
      :data="JSON.parse(stringify(store))"
      showLength
      :deep="1"
      @click="handleClick"
      selectableType="tree"
      :pathSelectable="pathSelectable"
    />

    <div v-if="!!thread" >
      <hr>
      <p>Selected Thread</p>
      <button @click="thread.refresh()" >Refresh thread</button>
      <button @click="thread.fetchMessages()" >Refresh messages</button>
      <input
        v-model="newMessage"
        placeholder="Press enter to send msg"
        @keyup.enter="onSendMessage()"
      />
      <vue-json-pretty
        :data="JSON.parse(stringify(thread))"
        showLength
        :deep="1"
      />
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
export default class Messaging extends Vue {
  stringify = stringify
  store = store.messagingStore
  thread = null
  newMessage = ''

  handleClick(path) {
    let pathSplit = path.split('[')
    pathSplit = pathSplit[1].split(']')
    const threadIndex = parseInt(pathSplit[0])
    this.thread = this.store.threads[threadIndex]
  }

  pathSelectable(path, data) {
    const pathSplit = path.split('.')
    if (pathSplit.length === 2 && pathSplit[1].includes('[')) {
      return true
    }
    return false
  }

  onSendMessage() {
    this.thread.sendMessage(this.newMessage)
    this.newMessage = ''
  }
}
</script>

<style>

</style>

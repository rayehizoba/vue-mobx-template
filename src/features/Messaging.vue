<template>
  <div>
    <h5>Messaging Store</h5>
    
    <div>loading: {{store.loading}}</div>
    <div>error: {{store.error}}</div>
    <div>threads: {{store.threads}}</div>
    <tree-view :data="store.threads"></tree-view>
    <button @click="store.addThread()">Update</button>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Observer } from 'mobx-vue'
import MessagingStore from '../stores/MessagingStore'

@Observer
@Component
export default class Messaging extends Vue {
  store = MessagingStore
}
</script>

<style>

</style>

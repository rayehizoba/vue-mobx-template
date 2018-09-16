// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {observable, isObservable, toJS} from 'mobx'
import VueMobx from 'vue-mobx'
import App from './App'

Vue.config.productionTip = false

Vue.use(VueMobx, {
  toJS: toJS, // must
  isObservable: isObservable, // must
  observable: observable,  // optional
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

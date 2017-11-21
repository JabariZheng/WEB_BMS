import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuex)

import ElementUI from 'element-ui'
Vue.use(ElementUI)

import _ from 'lodash'
Vue.prototype._=_

import api from './api/index.js'
Vue.prototype.$api = api

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
 
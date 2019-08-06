import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify'
import { apiClient } from '@/services/HttpService.js'

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (token && user) {
      apiClient.defaults.headers.common['authorization'] = token
      this.$store.commit('SET_TOKEN', token)
      this.$store.commit('SET_USER', user)
    }
  },
  vuetify,
  render: h => h(App)
}).$mount('#app')

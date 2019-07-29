import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify';

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    const userString = localStorage.getItem('user') // grab user data from local storage
    if (userString) { // check to see if there is indeed a user
      const userData = JSON.parse(userString) // parse user data into JSON
      this.$store.commit('UPDATE_USER', userData) // restore user data with Vuex
    }
  },
  vuetify,
  render: h => h(App)
}).$mount('#app')

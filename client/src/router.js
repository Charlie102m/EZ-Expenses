import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Trips from './views/Trips.vue'
import NewTrip from './views/NewTrip.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/trips',
      name: 'trips',
      component: Trips
    },
    {
      path: '/trips/new',
      name: 'newtrip',
      component: NewTrip
    }
  ]
})

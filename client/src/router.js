import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Trips from './views/Trips.vue'
import NewTrip from './views/NewTrip.vue'
import EditTrip from './views/EditTrip.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Expenses from './views/Expenses.vue'
import NewExpense from './views/NewExpense.vue'

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
      name: 'newTrip',
      component: NewTrip
    },
    {
      path: '/trips/edit/:tripId',
      name: 'editTrip',
      component: EditTrip,
      props: true
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: Expenses
    },
    {
      path: '/expenses/new',
      name: 'newExpense',
      component: NewExpense
    }
  ]
})

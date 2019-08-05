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
import Claims from './views/Claims.vue'
import NewClaim from './views/NewClaim.vue'
import Playgrounds from './views/Playgrounds.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/trips',
      name: 'trips',
      component: Trips,
      meta: { requiresAuth: true }
    },
    {
      path: '/trips/new',
      name: 'newTrip',
      component: NewTrip,
      meta: { requiresAuth: true }
    },
    {
      path: '/trips/edit/:tripId',
      name: 'editTrip',
      component: EditTrip,
      meta: { requiresAuth: true },
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
      component: Expenses,
      meta: { requiresAuth: true }
    },
    {
      path: '/expenses/new',
      name: 'newExpense',
      component: NewExpense,
      meta: { requiresAuth: true }
    },
    {
      path: '/claims',
      name: 'claims',
      component: Claims,
      meta: { requiresAuth: true }
    },
    {
      path: '/claims/new',
      name: 'newClaim',
      component: NewClaim,
      meta: { requiresAuth: true }
    },
    {
      path: '/playgrounds',
      name: 'playgrounds',
      component: Playgrounds
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token')
  if(to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login')
  }
  next()
})

export default router

import Vue from 'vue'
import Vuex from 'vuex'
import { HttpService, apiClient } from '@/services/HttpService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // the data
  state: {
    token: null,
    user: null,
    message: null
  },
  // the computed properties of the state object, similar to computed & data (model) objects
  // within the vue components/views
  getters: {
    user (state) {
      return state.user
    },
    userId (state) {
      return state.user.id
    },
    userEmail (state) {
      return state.user.email
    },
    message (state) {
      return state.message
    }
  },
  // methods used to change data
  mutations: {
    SET_TOKEN(state, token) {
      apiClient.defaults.headers.common['authorization'] = token
      state.token = token
      localStorage.setItem('token', token)
    },
    DESTROY_TOKEN(state) {
      apiClient.defaults.headers.common['authorization'] = null
      state.token = null,
      localStorage.removeItem('token')
    },
    SET_USER(state, user) {
      state.user = JSON.parse(user)
      localStorage.setItem('user', user)
    },
    DESTROY_USER(state) {
      state.user = null
      localStorage.removeItem('user')
    },
    SET_MESSAGE(state, text) {
      state.message = text
    },
    CLEAR_MESSAGE(state) {
      state.message = null
    }
  },
  // methods used to decide when/how to invole the mutations to change the data
  actions: {
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        HttpService.login(credentials)
          .then((response) => {
            const token = response.headers.authorization
            const user = response.headers.user
            commit('SET_TOKEN', token)
            commit('SET_USER', user)
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('DESTROY_TOKEN')
        commit('DESTROY_USER')
        resolve()
      })
    },
    setMessage({ commit }, message) {
      console.log(message);
      commit('SET_MESSAGE', message)
    },
    clearMessage({ commit }) {
      commit('CLEAR_MESSAGE')
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import HttpService from '@/services/HttpService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // the data
  state: {
    user: null,
    message: null
  },
  // the computed properties of the state object, similar to computed & data (model) objects
  // within the vue components/views
  getters: {
    loggedIn(state) {
      return !!state.user
    }
  },
  // methods used to change data
  mutations: {
    UPDATE_USER(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
    },
    CLEAR_USER_STATE(state) {
      state.user = null
      localStorage.removeItem('user')
      axios.defaults.headers.common['Authorization'] = null
    },
    UPDATE_MESSAGE(state, text) {
      state.message = text
    },
    CLEAR_MESSAGE(state) {
      state.message = null
    }
  },
  // methods used to decide when/how to invole the mutations to change the data
  actions: {
    // updateState(context, newState) {
    //   context.commit('updateState', newState)
    // },
    register({ commit }, credentials) {
      HttpService.register(credentials)
          .then((response) => {
            if (response.status === 200) {
              commit('UPDATE_USER', {
                email: response.data.results[0].email,
                id: response.data.results[0].id,
                token: response.data.token
              })
              
            }
          })
          .then(() => {
            commit('CLEAR_MESSAGE')
          })
          .catch((error) => {
            console.log(error.response);
            commit('UPDATE_MESSAGE', {
              status: error.response.status,
              text: error.response.data
            })
          })
    },
    login({ commit }, credentials) {
      HttpService.login(credentials)
        .then((response) => {
          if (response.status === 200) {
            commit('UPDATE_USER', {
              email: response.data.results[0].email,
              id: response.data.results[0].id,
              token: response.data.token
            })
            
          }
        })
        .then(() => {
          commit('CLEAR_MESSAGE')
        })
        .catch((error) => {
          console.log(error.response);
          commit('UPDATE_MESSAGE', {
            status: error.response.status,
            text: error.response.data
          })
        })
    },
    logout({commit}) {
      commit('CLEAR_USER_STATE')
    }
  }
})

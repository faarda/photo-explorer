import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const AXIOS = axios.create({
  headers: {
    Authorization: '563492ad6f917000010000015b675bbb30174c42b1e7d6839f589417'
  }
})

export default new Vuex.Store({
  state: {
    photos: [

    ]
  },
  mutations: {
    ADD_PHOTOS: (state, payload) => {
      state.photos = [...state.photos, ...payload];
    },
    EMPTY_PHOTOS: (state) => {
      state.photos = [];
    }
  },
  actions: {
    fetchData: (context, payload) => {
      return new Promise((resolve, reject) => {
        AXIOS.get(payload.address)
          .then(response => {
            resolve({
              status: true,
              data: response.data
            })
          })
          .catch(error => {
            reject(error.response.data)
          })
      })
    },
  },
  modules: {}
})
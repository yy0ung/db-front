import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import persist from './persist.js'

export default createStore({
  state: {
    
  },
  mutations: {

  },
  actions: {

  },
  modules:{
    persist
  },
  plugins:[
    createPersistedState({
      paths : ['persist']
    })
  ]
})
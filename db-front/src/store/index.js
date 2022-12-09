import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import persist from './persist.js'

export default createStore({
  state: {
    dbConnect:{
      host: "-",
      port : "-",
      db : "-",
      user : "-",
      pw : "-"
    }
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
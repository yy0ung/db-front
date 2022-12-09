const persist = {
  state:{
    indexColor : -1,
    login : false
  },
  mutations:{
    loginMutation(state){
      state.login = true
    }
  },
  actions:{
    loginDB({commit}){
      commit('loginMutation')
    }
  }
}

export default persist;
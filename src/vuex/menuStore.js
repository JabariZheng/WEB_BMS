import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state={
	activebar:'',
	routerTitle:''
}
const mutations={
  changeActivebar(state,barname){
    if(barname != state.activebar){
      state.activebar = barname
    }
  },
  changeRouterTitle(state,routerTitle){
    state.routerTitle = routerTitle;
  }
}


export default new Vuex.Store({
    state,mutations
})
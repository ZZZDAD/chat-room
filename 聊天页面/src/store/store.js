import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const state = {
  me: {
    id: 'me_id',
    username: 'me_username'
  },
  target: {
    id: '',
    username: ''
  }
}

const getters = {
  me: state => state.me,
  target: state => state.target
}

const mutations = {
  SET_ME (state, data) {
    state.me = data
  },
  SET_TARGET (state, data) {
    state.target = data
  }
}

const actions = {
  GetMe ({ commit }, me) {
    commit('SET_ME', me)
  },
  GetTarget ({ commit }, target) {
    commit('SET_TARGET', target)
  }
}

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: state => ({
    me: state.me
  }),
  filter: (mutation) => (
    mutation.type === 'SET_ME' ||
    mutation.type === 'SET_TARGET'
  )
})

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [vuexLocal.plugin]
})

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      isLoggedIn: false,
      data: null
    }
  },
  getters: {
    user(state){
      return state.user
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.isLoggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          email: user.email,
          firstName: user.firstName
        });
      } else {
        commit("SET_USER", null);
      }
    }
  }
});

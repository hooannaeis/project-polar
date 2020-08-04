import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    identities: [null],
    isLoggedIn: false,
    searchTerm: null,
    user: {
      data: null
    }
  },
  getters: {
    identities(state) {
      return state.identities;
    },
    filteredIdentities(state) {
      try {
        const search = state.searchTerm.trim().toLowerCase();
        if (!search.length) {
          return state.identities;
        }
        return state.identities.filter(item => item.identityName.toLowerCase().indexOf(search) > -1);
      } catch(e) {
        return state.identities;
      }
    },
    user(state) {
      return state.user;
    },
    userId(state) {
      if (state.user.data) {
        return state.user.data.userId;
      }
      return null;
    },
    isLoggedIn(state) {
      console.info(state.isLoggedIn);
      return state.isLoggedIn;
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.isLoggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_IDENTITIES(state, data) {
      state.identities = data;
    },
    UPDATE_SEARCH_TERM(state, value) {
      state.searchTerm = value;
    }
  },
  actions: {
    setIdentities({ commit }, data) {
      commit('SET_IDENTITIES', data);
    },
    updateSearchTerm({ commit }, data) {
      commit('UPDATE_SEARCH_TERM', data);
    },
    fetchUser({ commit }, user) {
      commit('SET_LOGGED_IN', user !== null);
      if (user) {
        commit('SET_USER', {
          email: user.email,
          displayName: user.displayName,
          userId: user.uid
        });
      } else {
        commit('SET_USER', null);
      }
    }
  }
});

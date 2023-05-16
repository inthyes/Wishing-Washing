import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      token: '',
      id: '',
    };
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setId(state, id) {
      state.id = id;
    },
  },
});

export default store;

import { createStore } from 'vuex';

const store = createStore({
	state: {
		userId: null,
		token: null
	},
	mutations: {
		setUserId(state, userId) {
			state.userId = userId;
		},
		setToken(state, token) {
			state.token = token;
		}
	}
});

export default store;

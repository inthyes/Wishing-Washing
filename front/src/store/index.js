import { createStore } from 'vuex';
import loginStore from '@/store/modules/login.js';

export default createStore({
	modules: {
		loginStore: loginStore
	}
});
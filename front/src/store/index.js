import { createStore } from 'vuex';
import loginStore from '@/store/modules/store.js';

export default createStore({
	modules: {
		loginStore: loginStore
	}
});
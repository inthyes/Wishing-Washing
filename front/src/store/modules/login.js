import axios from 'axios';
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();   // useCookies() 메서드를 사용하여 cookie를 생성


const loginStore = {
    namespaced: true,
    state: {
        memberId: '',
        accessToken: ''
    },
    getters: {
        // 로그인 여부를 가져옵니다.
        isLogin(state) {
            return state.accessToken == '' ? false : true;
        }
    },
    mutations: {
        // memberId를 설정합니다.
        setMmemberId(state, memberId) {
            state.memberId = memberId;
        },
        // accessToken를 설정합니다.
        setAccessToken(state, accessToken) {
            state.accessToken = accessToken;
        },
        // Refresh-Token를 설정합니다.
        setRefreshToken(state, refreshToken) {
            state.refreshToken = refreshToken;
        },
        // 초기화시킵니다.
        reset(state) {
            state.memberId = '';
            state.accessToken = '';
            state.refreshToken = '';
            // 방법3) Json 객체로 관리할 경우 cookie 삭제
            cookies.remove("testvue.login");
        },
        // Storage에 state를 저장합니다.
        saveStateToStorage(state) {
            // 3. Json 객체로 관리할 경우 cookie 저장
            cookies.set("testvue.login", JSON.stringify(state), 60 * 60 * 24 * 30);
        },
        // Storage에서 state를 읽어옵니다.
        readStateFromStorage(state) {
            // Json 객체 쿠키 사용
            if (cookies.get("testvue.login") != null) {
                let storage = cookies.get("testvue.login");
                if (storage.memberId != null) {
                    state.memberId = storage.memberId;
                }
                if (storage.accessToken != null) {
                    state.accessToken = storage.accessToken;
                }
                if (storage.memberId != null) {
                    state.refreshToken = storage.refreshToken;
                }
            }
        }
    },
    actions: {
        // 로그인합니다.
        async doLogin({ commit }, memberInfo) {
            let result = false;
            let resultErr = null;
            try {
                let res = await axios.post("http://localhost:3000/members/login", memberInfo);
                if (res.data.success == true) {
                    console.log("로그인되었습니다.");
                    commit('setMmemberId', memberInfo.id);
                    commit('setAccessToken', res.data.accessToken);
                    commit('setRefreshToken', res.data.refreshToken);
                    commit('saveStateToStorage');   // Storage에 state를 저장합니다.
                    axios.defaults.headers.common['Access-Token'] = res.data.accessToken;   // doLogin() 메서드에서 axios의 모든 요청에 적용되게 전역 기본값으로 헤더를 추가
                    result = true;
                } else {
                    console.log("로그인되지 않았습니다.");
                    let err = new Error("Request failed with status code 401");
                    err.response = { data: { "success": false, "errormessage": "로그인되지 않았습니다." } };
                    resultErr = err;
                }
            } catch (err) {
                if (!err.response) {
                    err.response = { data: { "success": false, "errormessage": err.message } };
                }
                resultErr = err;
            }
            return new Promise((resolve, reject) => {
                if (result) {
                    resolve();
                } else {
                    reject(resultErr);
                }
            });
        },
        // 로그아웃합니다.
        doLogout({ commit }) {
            commit('reset');
            // actions의 doLogout() 메서드에서 모든 요청에 적용된 전역 "Access-Token" 헤더를 삭제합니다.
            delete axios.defaults.headers.common['Access-Token'];
        },
        //  store의 commit() 메서드로 readStateFromStorage() 함수를 호출
        doReadStateFromStorage({ commit }) {
            commit('readStateFromStorage');
        }
    }
};

export default loginStore;
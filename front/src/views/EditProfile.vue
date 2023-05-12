<!--프로필 편집-->
<!--이시언-->

<template>
    <v-card class="mx-auto my-5" max-width="400" title="프로필편집" elevation="0">
        <v-container>
            <!-- rules="[rules.required]" 제거 (반드시 입력 필요하지 않음)  -->
            <v-text-field v-model="name" color="blue" label="이름" placeholder="이름을 입력하세요"
                variant="underlined"></v-text-field>


            <!-- back과의 매개변수 일치를 위해 -->
            <v-text-field v-model="email" :rules="[rules.emailRules]" color="blue" label="이메일"
                placeholder="이메일을 입력하세요" variant="underlined"></v-text-field>


            <!-- ID는 변경할 수 없음 -->
            <!-- <v-text-field v-model="id"  color="blue" label="닉네임" placeholder="닉네임을 입력하세요"
                variant="underlined"></v-text-field> -->

            <v-text-field v-model="phone" :rules="[rules.phoneRules]" color="blue" label="연락처"
                placeholder="연락처를 입력하세요" variant="underlined"></v-text-field>

            <!-- 비밀번호도 바꾸지말까요 그냥 -->
            <v-text-field v-model="password" :rules="[rules.minRules]" :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1" color="blue" label="비밀번호"
                placeholder="비밀번호를 입력하세요" variant="underlined"></v-text-field>

            <!-- <v-text-field v-model="PasswordCheck" :rules="[rules.passwordMatch]"
                :type="show2 ? 'text' : 'password'" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show2 = !show2" color="blue" label="비밀번호 확인" placeholder="한번 더 비밀번호를 입력하세요"
                variant="underlined">
            </v-text-field> -->

            <div>프로필 사진 편집</div>
            <br>
            <div>
                <input multiple @change="'onInputImage()'" ref="surveyImage" type="file">
            </div>

            <v-checkbox v-model="terms" color="secondary" label="동의합니다"></v-checkbox>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="success" @click="addUsers">
                수정 완료
                <v-icon icon="mdi-chevron-right" end></v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios';
const baseURL = "http://localhost:3000/myPage/profileEdit";
export default {
    data() {
        return {
            name: null,
            // id: null,
            phone: null,
            email: null,
            password: null,
            // PasswordCheck: null,
            image: null,
            terms: false,
            show1: false,
            show2: false,
            users: [],
            rules: {    // 유효성 검사 규칙
                required: value => !!value || '반드시 입력하세요',
                phoneRules: value => {
                    const pattern = /^(\+)?([0-9]{3})?[-]?([0-9]{3,4})?[-]?([0-9]{4})$/
                    return pattern.test(value) || '번호를 정확히 입력하세요'
                },
                emailRules: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || '이메일 형식으로 입력하세요'
                },
                // minRules: value => value.length >= 8 || '8자 이상 입력하세요',
                // passwordMatch: value => value === this.password || '비밀번호가 일치하지 않습니다',
            },
        }
    },
    created() {
            // 로컬 스토리지에서 토큰 가져오기
            const token = localStorage.getItem('token');

            // 가져온 토큰을 원하는 변수에 할당하거나 사용하기
            this.token = token;
            console.log(this.token);

            // 토큰 검증 요청
            this.verifyToken(token)
                .then(() => {
                // 토큰 검증 성공
                console.log('토큰이 유효합니다.');
                // 여기에서 원하는 작업 수행
                })
                .catch((error) => {
                // 토큰 검증 실패
                console.error('토큰이 유효하지 않습니다.',error);
                // 여기에서 토큰이 유효하지 않을 때의 처리를 수행
                });
        },

    methods: {
        onInputImage() {
            this.input.image = this.$refs.serveyImage.filters
            console.log("this.input.image")
            
        },
        verifyToken(token) {
        // 서버로 토큰 검증 요청을 보내는 함수
        // axios 등의 HTTP 클라이언트를 사용하여 서버로 요청을 보낼 수 있습니다.
        // 아래는 예시 코드이므로 실제 서버의 엔드포인트 및 요청 방식에 맞게 수정해주셔야 합니다.

        // axios 예시 코드
        return axios.post('/verify-token', { token });
        },
       
        async addUsers() {

            if (
                // this.rules.required(this.name) === true &&
                // this.rules.required(this.id) === true &&
                this.rules.phoneRules(this.phone) === true 
                // &&
                // this.rules.emailRules(this.email) === true 
                // &&
                // this.rules.minRules(this.password) === true &&
                // this.rules.passwordMatch(this.PasswordCheck) === true
            )
             {
                try {
                    const res = await axios.post(baseURL, {
                        name: this.name,
                        id: this.id,
                        phone: this.phone,
                        // email: this.email,
                        // password: this.password,
                    });
                    this.users = [...this.users, res.data];
                    console.log('Axios POST 요청이 성공적으로 전송되었습니다.', res.data);
                } catch (e) {
                    console.error(e);
                }
            }
        },
    },
};
</script>
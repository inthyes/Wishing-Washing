<!-- 회원가입 -->

<template>
    <v-card class="mx-auto" max-width="400" elevation="0">
        <v-container>
            <v-form ref="form" v-model="form" class="pa-4 pt-10">
                <v-text-field v-model="name" :rules="[rules.required]" color="blue" label="이름" placeholder="이름을 입력하세요"
                    variant="underlined" clearable></v-text-field>

                <v-text-field v-model="email" :rules="[rules.required, rules.emailRules, rules.emailDuplicate]" color="blue"
                    label="이메일" placeholder="이메일을 입력하세요" variant="underlined" clearable></v-text-field>

                <v-text-field v-model="id" :rules="[rules.required, rules.ID_Duplicate]" color="blue" label="닉네임"
                    placeholder="닉네임을 입력하세요" variant="underlined" clearable></v-text-field>

                <v-text-field v-model="phone" :rules="[rules.required, rules.phoneRules]" color="blue" label="연락처"
                    placeholder="연락처를 입력하세요" variant="underlined" clearable></v-text-field>

                <v-text-field v-model="password" :rules="[rules.required, rules.minRules]"
                    :type="show1 ? 'text' : 'password'" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1" color="blue" label="비밀번호" placeholder="비밀번호를 입력하세요" variant="underlined"
                    clearable></v-text-field>

                <v-text-field v-model="PasswordCheck" :rules="[rules.required, rules.passwordMatch]"
                    :type="show2 ? 'text' : 'password'" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show2 = !show2" color="blue" label="비밀번호 확인" placeholder="한번 더 비밀번호를 입력하세요"
                    variant="underlined" clearable>
                </v-text-field>

                <v-checkbox v-model="terms" :rules="[rules.agree]" color="secondary" label="약관동의"></v-checkbox>
            </v-form>
            <v-divider></v-divider>

            <v-card-actions>

                <v-spacer></v-spacer>

                <!-- 버튼 클릭 -> 회원가입 완료 후 로그인 페이지로 이동 -->
                <v-btn to="/login" color="success" :disabled="!form" :loading="isLoading" @click="addUsers">
                    가입 완료
                    <v-icon icon="mdi-chevron-right" end></v-icon>
                </v-btn>

            </v-card-actions>
        </v-container>


    </v-card>
</template>

<script>
import axios from 'axios';
const baseURL = "http://localhost:3001/users";

export default {
    data() {
        return {
            name: null,
            id: null,
            phone: null,
            email: null,
            password: null,
            PasswordCheck: null,

            terms: false,
            show1: false,
            show2: false,

            form: false,
            isLoading: false,

            users: [],


            rules: {
                // 회원가입 유효성 검사
                required: value => !!value || '반드시 입력하세요',
                phoneRules: value => {
                    const pattern = /^(\+)?([0-9]{3})?[-]?([0-9]{3,4})?[-]?([0-9]{4})$/
                    return pattern.test(value) || '번호를 정확히 입력하세요'
                },
                emailRules: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || '이메일 형식으로 입력하세요'
                },
                minRules: value => value.length >= 8 || '8자 이상 입력하세요',
                passwordMatch: value => value === this.password || '비밀번호가 일치하지 않습니다',

                // 회원가입 이메일 중복검사
                emailDuplicate: async (value) => {
                    try {
                        const res = await axios.get(`${baseURL}?email=${value}`);
                        if (res.data.length > 0) {
                            return '이미 사용중인 이메일입니다';
                        } else {
                            return true;
                        }
                    } catch (e) {
                        console.error(e);
                        return 'Error checking email duplication.';
                    }
                },
                // 회원가입 닉네임 중복검사
                ID_Duplicate: async (value) => {
                    try {
                        const res = await axios.get(`${baseURL}?id=${value}`);
                        if (res.data.length > 0) {
                            return '이미 사용중인 닉네임입니다';
                        } else {
                            return true;
                        }
                    } catch (e) {
                        console.error(e);
                        return 'Error checking id duplication.';
                    }
                },
                // 약관동의
                agree: value => !!value || '약관에 동의해야 합니다'
            },
        }
    },
    // 회원가입 저장
    methods: {
        async addUsers() {
            if (
                this.rules.required(this.name) === true &&
                this.rules.required(this.id) === true &&
                this.rules.phoneRules(this.phone) === true &&
                this.rules.emailRules(this.email) === true &&
                this.rules.minRules(this.password) === true &&
                this.rules.passwordMatch(this.PasswordCheck) === true &&

                await this.rules.emailDuplicate(this.email) &&
                await this.rules.ID_Duplicate(this.id)
            ) {
                try {
                    const res = await axios.post(baseURL, {
                        name: this.name,
                        id: this.id,
                        phone: this.phone,
                        email: this.email,
                        password: this.password,
                    });

                    this.users = [...this.users, res.data];
                } catch (e) {
                    console.error(e);
                }
            }
        },
    },
};
</script>
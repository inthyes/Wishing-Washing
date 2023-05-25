<!-- 회원가입 -->

<template>
    <v-card class="mx-auto" max-width="400" elevation="0">
        <v-container>
            <v-form ref="form" v-model="form" class="pa-4 pt-10">
                <v-text-field v-model="managerName" :rules="[rules.required]" color="blue" label="이름" placeholder="이름을 입력하세요"
                    variant="underlined" clearable></v-text-field>

                <v-text-field v-model="managerId" :rules="[rules.required, rules.ID_Duplicate]" color="blue" label="아이디"
                    placeholder="아이디를 입력하세요" variant="underlined" clearable></v-text-field>

                <v-text-field v-model="businessnum" :rules="[rules.required]" color="blue" label="사업자번호"
                    placeholder="사업자번호를 입력하세요" variant="underlined" clearable></v-text-field>

                <v-text-field v-model="managerpsword" :rules="[rules.required, rules.minRules]"
                    :type="show1 ? 'text' : 'password'" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1" color="blue" label="비밀번호" placeholder="비밀번호를 입력하세요" variant="underlined"
                    clearable></v-text-field>

                <v-text-field v-model="managerPswordCheck" :rules="[rules.required, rules.passwordMatch]"
                    :type="show2 ? 'text' : 'password'" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show2 = !show2" color="blue" label="비밀번호 확인" placeholder="한번 더 비밀번호를 입력하세요"
                    variant="underlined" clearable>
                </v-text-field>

                <v-text-field v-model="S_ID" :rules="[rules.required, rules.ID_Duplicate]" color="blue" label="사장님아이디"
                    placeholder="사장님아이디를 입력하세요" variant="underlined" clearable></v-text-field>

                <v-checkbox v-model="terms" :rules="[rules.agree]" color="light-blue-darken-4" label="약관동의"></v-checkbox>
            </v-form>
            <v-divider></v-divider>

            <v-card-actions>

                <v-spacer></v-spacer>

                <!-- 버튼 클릭 -> 회원가입 완료 후 로그인 페이지로 이동 -->
                <v-btn block to="/login" color="light-blue-darken-4" variant="outlined" size="large"
                 :disabled="!form" :loading="isLoading" @click="addUsers">
                    가입 완료
                    <v-icon icon="mdi-chevron-right" end></v-icon>
                </v-btn>

            </v-card-actions>
        </v-container>


    </v-card>
</template>

<script>
import axios from 'axios';
const baseURL = "http://localhost:3000/register";

export default {
    data() {
        return {
            managerName: null,
            managerId: null,
            businessnum: null,
            S_ID: null,
            managerpsword: null,
            managerPswordCheck: null,

            terms: false,
            show1: false,
            show2: false,

            form: false,
            isLoading: false,

            managers: [],


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
                passwordMatch: value => value === this.managerpsword || '비밀번호가 일치하지 않습니다',


                // 회원가입 이메일 중복검사


                // emailDuplicate: async (value) => {
                //     try {
                //         const res = await axios.get(`${baseURL}?email=${value}`);
                //         if (res.data.length > 0) {
                //             return '이미 사용중인 이메일입니다';
                //         } else {
                //             return true;
                //         }

             
                //     } catch (error) {
                //         console.error(error);

                //         return 'Error checking email duplication.';
                //     }
                // },
                // 회원가입 닉네임 중복검사
                // ID_Duplicate: async (value) => {
                //     try {
                //         const encodedValue = encodeURIComponent(value);
                //         const res = await axios.post('baseURL/', { id: encodedValue, action: 'checkDuplicate' });
                //         if (res.data.code === 409) {
                //         return '이미 사용중인 아이디입니다. 다른 아이디를 사용해주세요.';
                //         } else {
                //         return true;
                //         }
                //     } catch (e) {
                //         console.error(e);
                //         return '아이디 중복 검사 중에 오류가 발생했습니다.';
                //     }
                //     },

                // message: '닉네임 중복 검사에 실패했습니다.',
                // 약관동의
                agree: value => !!value || '약관에 동의해야 합니다'
            },
        }
    },
    // 회원가입 저장
    methods: {
        async addManagers() {
            if (
                this.rules.required(this.managerName) === true &&
                this.rules.required(this.managerId) === true &&
                this.rules.required(this.businessnum) === true &&
                this.rules.required(this.S_ID) === true &&
                this.rules.minRules(this.managerpsword) === true &&
                this.rules.passwordMatch(this.managerPswordCheck) === true 
                // &&

                // await this.rules.emailDuplicate(this.email) &&
                // await this.rules.ID_Duplicate(this.id)
            ) {
                try {
                    const res = await axios.post(baseURL, {
                        managerName: this.managerName,
                        managerId: this.managerId,
                        businessnum: this.businessnum,
                        S_ID: this.S_ID,
                        managerpsword: this.managerpsword,
                        confirmPsword: this.managerPswordCheck,
                    });

                    this.managers = [...this.managers, res.data];
                } catch (e) {
                    console.error(e);
                }
            }
        },
    },
};
</script>

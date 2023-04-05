<template>
    <v-card class="mx-auto" max-width="344" title="회원가입">
        <v-container>
            <v-text-field v-model="name" :rules="[rules.required]" color="blue" label="Name" placeholder="이름을 입력하세요"
                variant="underlined"></v-text-field>

            <v-text-field v-model="id" :rules="[rules.required]" color="blue" label="ID" placeholder="아이디를 입력하세요"
                variant="underlined"></v-text-field>

            <v-text-field v-model="phone" :rules="[rules.required, rules.phone]" color="blue" label="Phone"
                placeholder="휴대폰 번호를 입력하세요" variant="underlined"></v-text-field>

            <v-text-field v-model="email" :rules="[rules.required, rules.email]" color="blue" label="Email"
                placeholder="이메일을 입력하세요" variant="underlined"></v-text-field>

            <v-text-field v-model="password" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1" color="blue"
                label="Password" placeholder="비밀번호를 입력하세요" variant="underlined"></v-text-field>

            <v-text-field v-model="PasswordCheck" :rules="[rules.required]" :type="show2 ? 'text' : 'password'"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show2 = !show2" color="blue"
                label="Password Check" placeholder="한번 더 비밀번호를 입력하세요" variant="underlined"></v-text-field>

            <v-checkbox v-model="terms" color="secondary" label="동의합니다"></v-checkbox>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="success">
                Create Account

                <v-icon icon="mdi-chevron-right" end></v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        name: null,
        id: null,
        phone: null,
        email: null,
        password: null,
        PasswordCheck: null,
        terms: false,
        show1: false,
        show2: false,
        rules: {
            required: value => !!value || '반드시 입력하세요',
            phone: value => {
                const pattern = /^(\+)?([0-9]{3})?[-]?([0-9]{3,4})?[-]?([0-9]{4})$/
                return pattern.test(value) || '번호를 정확히 입력하세요'
            },
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || '이메일 형식으로 입력하세요'
            },
            min: v => v.length >= 8 || '8자 이상 입력하세요',
        }
    }),
}
</script>
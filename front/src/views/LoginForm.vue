<!-- 로그인 -->

<template>
  <v-card class="mx-auto pa-12" max-width="344" elevation="0">
    <v-form v-model="form" @submit.prevent="login">

      <v-text-field v-model="id" :readonly="loading" :rules="[required]" class="mb-2" clearable label="아이디"
        placeholder="아이디를 입력하세요" variant="underlined"></v-text-field>

      <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="비밀번호"
        placeholder="비밀번호를 입력하세요" variant="underlined" :type="show1 ? 'text' : 'password'"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1"></v-text-field>

      <br>

      <v-btn to="/" :disabled="!form" :loading="loading" block color="success" size="large" type="submit" variant="elevated" @click="login">
        로그인
      </v-btn>

      
    </v-form>
  </v-card>
</template>

<script>
import axios from 'axios';
const baseURL = "http://localhost:3000/login";

export default {
  data() {
    return {
      id: null,
      password: null,

      show1: false,
      form: false,
      loading: false,
      required: value => !!value || '필수 항목입니다.', // 필수 입력 필드 유효성 검사
      users: []
    }
  },

 //수정필요, 함수작성 필요 -
   methods: {
    async login() {
      this.loading = true;

      const data = {
        id: this.id,
        psword: this.password,
        token: this.token
      };
      try {
        const response = await axios.post(baseURL, data);
        const user = response.data;
        this.users.push(user);
        const token = response.data.token;
        localStorage.setItem("token", token);

        console.log(user);
        console.log(token);

        alert('로그인 성공');
    } catch (error) {
      console.log(error);
      alert('로그인 실패');
    }
  },
  verifyToken(token) {
        // 서버로 토큰 검증 요청을 보내는 함수
        // axios 등의 HTTP 클라이언트를 사용하여 서버로 요청을 보낼 수 있습니다.
        // 아래는 예시 코드이므로 실제 서버의 엔드포인트 및 요청 방식에 맞게 수정해주셔야 합니다.

        // axios 예시 코드
        return axios.post('/verify-token', { token });
        },
       

    }
  }

</script>


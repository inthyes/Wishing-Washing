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

      <v-btn to="/" :disabled="!form" :loading="loading" block color="success" size="large" type="submit" variant="elevated">
        로그인
      </v-btn>

      
    </v-form>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      id: "",
      password: "",

      show1: false,
    };
  },
  methods: {
    login() {
      const data = {
        id: this.id,
        psword: this.password
      };

      axios.post("http://localhost:3000/login", data)
        .then(response => {
          // 통신 성공 시 실행할 코드
          console.log(response.data);
          // 로그인 성공 여부를 확인하고 필요한 로직을 추가하세요.
          alert('로그인 성공');
        })
        .catch(error => {
          // 통신 실패 시 실행할 코드
          console.log(error);
          // 에러 처리 로직을 추가하세요.
          alert('로그인 실패');
        });
    }
  }
};
</script>


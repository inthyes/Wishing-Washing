<!-- 로그인 -->

<template>
    <v-card class="mx-auto pa-12" max-width="344" elevation="0">
      <v-form v-model="form" @submit.prevent="login">

        <v-text-field v-model="id" :readonly="loading" :rules="[required]" class="mb-2" clearable
          label="아이디" placeholder="아이디를 입력하세요" variant="underlined"></v-text-field>

        <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable 
          label="비밀번호" placeholder="비밀번호를 입력하세요" variant="underlined" 
           :type="show1 ? 'text' : 'password'" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="show1 = !show1"></v-text-field>

        <br>

        <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit" variant="elevated">
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
            required: [(v) => !!v || '필수 항목입니다.'],
        };
    },
    methods: {
      login() {
      const formData = {
        id: this.id,
        psword: this.password,
      };

      this.loading = true;

      axios
        .post("http://localhost:3000/login", formData)
        .then((response) => {
          // 로그인 성공 처리
          console.log(response.data);
          // 토큰 저장 등 필요한 작업 수행

          // 예를 들어, 토큰을 로컬 스토리지에 저장하는 방법:
          // localStorage.setItem('token', response.data.token);
        })
        .catch((error) => {
          // 로그인 실패 처리
          console.log(error.response.data);
          // 에러 메시지 출력 등 필요한 작업 수행
        })
        .finally(() => {
          this.loading = false;});
    },
  },
};
</script>


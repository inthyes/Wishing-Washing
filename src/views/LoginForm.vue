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

      <v-btn :disabled="!form" :loading="loading" block color="success" size="large" type="submit" variant="elevated">
        로그인
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
// import axios from 'axios';

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
      alert('로그인 되었습니다');
    }
  }
};
</script>


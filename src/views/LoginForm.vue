<!-- 로그인 -->

<template>
    <v-card class="mx-auto pa-12" max-width="344" elevation="0">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable
          label="Email"></v-text-field>

        <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="Password"
          placeholder="Enter your password"></v-text-field>

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
            email: "",
            password: "",
        };
    },
};
</script>


<template>

    <div class="loginform">

       <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" lg="4">
            <v-card class="elevation-12">
              <v-toolbar color="white" dark>
                <v-toolbar-title>로그인</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    type="email"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                  <v-btn type="submit" color="blue" block>Login</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        login() {
            axios.post('http://localhost:3000/users', {
        username: this.username,
        password: this.password
      })
        },
    },
};
</script>


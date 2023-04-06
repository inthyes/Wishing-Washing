<template>
  <v-app>
    <!-- 상단 Appbar -->
    <v-app-bar :elevation="1">
      <template v-slot:prepend>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>WW</v-app-bar-title>

      <v-spacer></v-spacer>

      <template v-slot:append>
        <v-btn icon="mdi-magnify"></v-btn>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" location="left" temporary>
      <v-list>
      <v-list-item router-link to="/login"> <!-- Add router link to Login -->
        <v-list-item-title>로그인</v-list-item-title>
      </v-list-item>
      <v-list-item router-link to="/signup"> <!-- Add router link to Sign Up -->
        <v-list-item-title>회원가입</v-list-item-title>
      </v-list-item>
    </v-list>
    </v-navigation-drawer>

    <!-- 메인 -->
    <v-main>
      <router-view />
    </v-main>
    <!-- 하단 navbar -->
    <v-footer class="fixed-bottom">
      <bottom-nav-bar />
    </v-footer>
  </v-app>

  
</template>

<script>
// import AppBar from './components/AppBar.vue'
import BottomNavBar from './components/BottomNavBar.vue'

export default {
  components: { BottomNavBar, },
  name: 'App',

  data: () => ({
    drawer: false,
    group: null,
 
  }),
  watch: {
    group() {
      this.drawer = false
    },
  },
}
</script>

<style>
.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
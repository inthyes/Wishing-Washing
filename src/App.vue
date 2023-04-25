<template>
  <v-app>
    <!-- 상단 Appbar -->
    <v-app-bar :elevation="1">

      <!-- 버튼 : 앱바 맨 오른쪽 고정 -->
      <template v-slot:prepend>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <!-- 앱바 타이틀 
      홈 컴포넌트에서만 왼쪽정렬, 나머지는 가운데 정렬-->
      <v-app-bar-title :class="['m-2', isHome ? 'text-left' : 'text-center']">{{ $route.name }}</v-app-bar-title>

      <!-- 버튼 : 앱바 맨 왼쪽 고정 -->
      <template v-slot:append>
        <v-btn icon="mdi-magnify"></v-btn>
        <!-- <v-btn icon="mdi-dots-vertical"></v-btn> -->
      </template>
    </v-app-bar>

    <!-- 앱바 드롭다운 메뉴 : 왼쪽에서  -->
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
  computed: {
    isHome() {
      return this.$route.path === '/';
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

.align-center {
  text-align: center;
}
</style>
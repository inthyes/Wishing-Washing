<template>
  <!-- <header class="head">
    <app-bar />
  </header> -->
  <v-app>
    <!-- 상단 Appbar -->
    <v-app-bar :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>WW</v-app-bar-title>

      <v-spacer></v-spacer>

      <template v-slot:append>
        <v-btn icon="mdi-magnify"></v-btn>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>

    <!-- 메인 화면 라우터 -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>

  <!-- 하단 navbar -->
  <footer>
    <bottom-nav-bar />
  </footer>
</template>

<script>
// import AppBar from './components/AppBar.vue'
import BottomNavBar from './components/BottomNavBar.vue'

export default {
  components: { BottomNavBar, },
  name: 'App',

  data: () => ({

  }),
}
</script>

<style>
</style>
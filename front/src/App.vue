<template>
  <v-app>
    <!-- 상단 Appbar -->
    <AppBar />
    
    <!-- 메인 -->
    <v-main>
      <router-view />
    </v-main>

    <!-- 하단 navbar -->
    <v-footer>
      <bottom-navbar />
    </v-footer>

  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import BottomNavbar from './components/BottomNavbar.vue';

export default {
  components: { AppBar, BottomNavbar },
  name: 'App',
}
</script>
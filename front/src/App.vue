<template>
  <v-app>
    <!-- 상단 Appbar -->
    <AppBar />
    
    <!-- 메인 -->
    <v-main>
      <router-view />
    </v-main>

    <!-- 하단 navbar -->
    <v-footer class="fixed-bottom">
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
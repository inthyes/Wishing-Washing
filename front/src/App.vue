<template>
  <v-app>
    <!-- 상단 Appbar -->
    <AppBar />

    <!-- 메인 -->
    <v-main style="background-color:  rgba(255, 255, 255, 0.689)">
      <router-view />
    </v-main>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :timeout="3000" color="info">
      {{ snackbarText }}
    </v-snackbar>
    
    <!-- 하단 navbar -->
    <v-footer>
      <bottom-nav-bar />
    </v-footer>

  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue'
import BottomNavBar from './components/BottomNavBar.vue'

export default {
  components: { AppBar, BottomNavBar,  },
  name: 'App',

  data: () => ({
    // 스낵바
    snackbar: false,
    snackbarText: '',

  }),
}
</script>

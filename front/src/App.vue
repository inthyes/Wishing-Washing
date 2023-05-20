<template>
  <v-app>
    <!-- 상단 Appbar -->
    <v-app-bar v-if="!isLogin" app class="rounded-bottom" :elevation="1"
      style="background-color:rgba(97, 151, 202, 0.874)" :style="{ color: '#ffffff' }" height="75">

      <!-- 버튼 : 앱바 맨 왼쪽 고정 -->
      <template v-slot:prepend>
        <!-- 홈 화면에선 토글 버튼 -->
        <v-app-bar-nav-icon v-if="isHome" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <!-- 메인 컴포넌트에선 로고 버튼 (로고 추후 수정) -->
        <v-btn v-if="isMain" icon="mdi-washing-machine" @click="$router.push('/')"></v-btn>
        <!-- 이외의 모든 페이지에선 뒤로가기 버튼 -->
        <v-btn v-if="!isHome && !isMain" icon="mdi-arrow-left" @click="goBack"></v-btn>

      </template>

      <!-- 앱바 타이틀 
      홈 컴포넌트에서만 왼쪽정렬, 나머지는 가운데 정렬-->
      <v-app-bar-title :class="['m-2', isHome ? 'text-left' : 'text-center']">{{ $route.name }}</v-app-bar-title>

      <!-- 버튼 : 앱바 맨 오른쪽 고정 -->
      <template v-slot:append>
        <v-btn icon="mdi-magnify"></v-btn>
        <!-- <v-btn icon="mdi-dots-vertical"></v-btn> -->
      </template>
    </v-app-bar>

    <!-- 앱바 드롭다운 메뉴 : 왼쪽에서  -->
    <v-navigation-drawer v-model="drawer" location="left" temporary width="200">
      <v-list>
        <v-list-item class="text-left px-5" @click="logout">
          로그아웃
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- 메인 -->
    <v-main style="background-color:  rgba(255, 255, 255, 0.689)">
      <router-view />
    </v-main>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :timeout="3000" color="info">
      {{ snackbarText }}
    </v-snackbar>
    
    <!-- 하단 navbar -->
    <v-footer class="fixed-bottom">
      <bottom-nav-bar />
    </v-footer>

  </v-app>
</template>

<script>
import BottomNavBar from './components/BottomNavBar.vue'
import axios from 'axios'

export default {
  components: { BottomNavBar, },
  name: 'App',

  data: () => ({
    drawer: false,
    group: null,

    // 스낵바
    snackbar: false,
    snackbarText: '',

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
    isMain() {
      const path = this.$route.path;
      return path === '/aroundlaundry' || path === '/usagehistory' || path === '/mypage2';
    },
    isLogin() {
      return this.$route.path === '/login';
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async logout() {
      try {
        const response = await axios.post('http://localhost:3000/logout', null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = response.data;
        console.log(data);
        // alert(data.message);

        // 스낵바 알람
        this.snackbarText = data.message;
        this.snackbar = true;

        localStorage.removeItem("token");


        this.$router.push('/login');
      } catch (error) {
        console.log(error);
        alert('로그아웃 실패');
      }
    }
  },
}
</script>

<style scoped>
.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

/* .align-center {
  text-align: center;
} */

.rounded-bottom {
  border-radius: 0 0 80px 80px;
}
</style>
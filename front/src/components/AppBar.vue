<template>
  <!-- 상단 Appbar -->
  <v-app-bar app class="rounded-bottom2" :elevation="1" style="background-color:rgba(97, 151, 202, 0.874)"
    :style="{ color: '#ffffff' }" height="75">

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
  <v-navigation-drawer v-model="drawer" location="left" temporary  width="200">
    <v-list>
      <v-list-item router-link to="/login"> <!-- Add router link to Login -->
        <v-list-item-title>로그인</v-list-item-title>
      </v-list-item>
      <v-list-item router-link to="/signup"> <!-- Add router link to Sign Up -->
        <v-list-item-title>회원가입</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// import axios from 'axios'

export default {
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
    isMain() {
      const path = this.$route.path;
      return path === '/managelaundry' || path === '/manageorder' || path === '/managermypage2';
    },
    isLogin() {
      return this.$route.path === '/login';
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
    //   async logout() {
    //     try {
    //       const response = await axios.post('http://localhost:3000/logout', null, {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("token")}`
    //         }
    //       });
    //       const data = response.data;
    //       console.log(data);
    //       // alert(data.message);

    //       localStorage.removeItem("token");


    //       this.$router.push('/login');
    //     } catch (error) {
    //       console.log(error);
    //       alert('로그아웃 실패');
    //     }
    //   }
  }
}
</script>

<style scoped>
.rounded-bottom2 {
  border-radius: 0 0 10px 10px;
}
</style>
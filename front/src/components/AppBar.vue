<template>
    <!-- 상단 Appbar -->
    <!-- 로그인 화면에선 앱바 안보임 -->
    <v-app-bar v-if="!isLogin" app class="rounded-bottom1" :elevation="1" style="background-color:rgba(97, 151, 202, 0.874)"
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
    <v-navigation-drawer v-model="drawer" location="left" temporary width="240">
        <v-list>

            <v-list-item v-if="!token" class="text-left px-5" to="/login">
                로그인
            </v-list-item>
            <v-list-item v-else class="text-left px-5">
                안녕하세요 {{ userId }}님
            </v-list-item>
            <v-list-item v-if="token" class="text-left px-5" @click="logout">
                <!-- <p class="mx-0 my-1">안녕하세요 {{ userId }}님</p> -->
                로그아웃
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        userId: null,
        token: null,

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
            return path === '/aroundlaundry' || path === '/usagehistory' || path === '/mypage2';
        },
        isLogin() {
            return this.$route.path === '/login';
        },

    },
    mounted() {
        this.userId = localStorage.getItem("userId");
        this.token = localStorage.getItem('token');
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
                localStorage.removeItem("userId");
                location.reload()
                this.$router.push('/login');
                location.reload()
            } catch (error) {
                console.log(error);
                alert('로그아웃 실패');
            }
        },
    }
}
</script>

<style scoped>
.rounded-bottom1 {
    border-radius: 0 0 10px 10px;
}
</style>
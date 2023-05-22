<!-- 사용자 마이페이지 -->
<!-- 재제작했습니다 -->

<template>
    <div id="app" class="px-0">
        <v-card class="mx-auto" max-width="500" elevation="0">
            <v-container class="container">
                <MyProfile />

                <v-divider class="mx-0 my-2"></v-divider>

                <MyMenu />
            </v-container>
        </v-card>
    </div>
</template>

<script>
import MyProfile from '@/components/MyProfile.vue'  // 마이페이지 프로필 컴포넌트
import MyMenu from '@/components/MyMenu.vue'        // 마이페이지 메뉴 컴포넌트

import axios from "axios";
import jwt_decode from 'jwt-decode';

export default {
    name: 'App',
    components: {
        MyProfile,
        MyMenu
    },
    data: () => ({
        mypageData: {},
    }),

    // created() {
    //     const token = localStorage.getItem("token");

    //     if (token) {
    //         this.verifyToken(token)
    //             .then((isValidToken) => {
    //                 this.fetchMypageData();
    //                 console.log(isValidToken);
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //                 this.redirectToLogin();
    //             });
    //     } else {
    //         this.redirectToLogin();
    //     }
    // // },

    // methods: {
    //     async verifyToken(token) {
    //         try {
    //             const response = await axios.post(
    //                 "http://localhost:4000/verify-token",
    //                 { token }
    //             );
    //             const data = response.data;
    //             console.log("data:", data);
    //             return data.isValid;
    //         } catch (error) {
    //             throw new Error("토큰 검증 실패");
    //         }
    //     },

        // async fetchMypageData() {
        //     try {
        //         const res = await axios.get("http://localhost:4000/myPage");
        //         this.mypageData = res.data;
        //         const token = localStorage.getItem("token");
        //         const tokenPayload = jwt_decode(token);

        //         console.log("ID:", tokenPayload.id);
        //         console.log("Token Payload:", tokenPayload);


        //         // this.mypageData = this.mypageData.filter((mypageData) => mypageData.userName === tokenPayload.userName);
        //     } catch (error) {
        //         console.error(error);
        //         throw new Error("마이페이지 데이터 가져오기 실패");
        //     }
        // },

        // redirectToLogin() {
        //     this.$router.push("/login");
        // },
    }
// }
</script>

<style scoped>
#app {
    margin-top: 10px;

}
.container {
    padding-inline: 20px;
    padding-top: 35px;
}
</style>

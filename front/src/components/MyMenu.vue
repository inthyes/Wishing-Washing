<template>
    <div>
        <v-list>
            <v-list-item link class="ltem-list" to="mylaundry">
                <v-list-item-content class="item-icon">
                    <v-list-item-icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="item-title">내세탁소</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link class="ltem-list" to="completelist">
                    <v-list-item-content class="item-icon">
                        <v-list-item-icon>
                            <v-icon>mdi-receipt</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="item-title">완료된 주문</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            <!-- <v-list-item link class="ltem-list" to="checkreviewlist">
                <v-list-item-content class="item-icon">
                    <v-list-item-icon>
                        <v-icon>mdi-star</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="item-title">리뷰확인</v-list-item-title>
                </v-list-item-content>
            </v-list-item> -->
            
            <v-list-item link class="ltem-list" to="wwnotice">
                <v-list-item-content class="item-icon">
                    <v-list-item-icon>
                        <v-icon>mdi-bell-ring</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="item-title">공지사항</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-list-item link class="ltem-list" to="qna">
                <v-list-item-content class="item-icon">
                    <v-list-item-icon>
                        <v-icon>mdi-message-question</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="item-title">Q & A</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-card-actions class="mt-5 px-16">
                <v-btn variant="text" class="custom-btn flex-grow-1 mx-0" color="light-blue-darken-4" @click="logout">
                    로그아웃
                </v-btn>
                <v-btn variant="text" class="custom-btn flex-grow-1 mx-0" color="light-blue-darken-4" @click="redirectToRegister">
                    회원탈퇴
                </v-btn>
            </v-card-actions>
        </v-list>
    </div>
</template>

<script>
import axios from "axios";
import jwt_decode from 'jwt-decode';
export default {
    name: 'MyMenu',
    data: () => ({
        mypageData: {},
    }),
    created() {
        // const token = localStorage.getItem("token");

        // if (token) {
        //     this.verifyToken(token)
        //         .then((isValidToken) => {
        //             this.fetchMypageData();
        //             console.log(isValidToken);
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //             this.redirectToLogin();
        //         });
        // } else {
        //     this.redirectToLogin();
        // }
    },

    methods: {
        async verifyToken(token) {
            try {
                const response = await axios.post(
                    "http://localhost:4000/verify-token",
                    { token }
                );
                const data = response.data;
                console.log("data:", data);
                return data.isValid;
            } catch (error) {
                throw new Error("토큰 검증 실패");
            }
        },

        async fetchMypageData() {
            try {
                const res = await axios.get("http://localhost:4000/myPage");
                this.mypageData = res.data;
                const token = localStorage.getItem("token");
                const tokenPayload = jwt_decode(token);

                console.log("ID:", tokenPayload.id);
                console.log("Token Payload:", tokenPayload);


                // this.mypageData = this.mypageData.filter((mypageData) => mypageData.userName === tokenPayload.userName);
            } catch (error) {
                console.error(error);
                throw new Error("마이페이지 데이터 가져오기 실패");
            }
        },

        redirectToLogin() {
            this.$router.push("/login");
        },
        redirectToRegister() {
            if (confirm("회원 탈퇴를 진행하시겠습니까?")) {
                this.$router.push("/signup");
            }
        },

        async logout() {
            try {
                const response = await axios.post('http://localhost:4000/logout', null, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const data = response.data;
                console.log(data);
                alert(data.message);

                localStorage.removeItem("token");

                this.$router.push('/login');
            } catch (error) {
                console.log(error);
                alert('로그아웃 실패');
            }
        }
    }
}
</script>

<style scoped>
/* 큰 화면 적용 */
@media screen and (min-width: 900px) {
  .ltem-list {
    margin-block: 10px;
  }
}
/* 모바일 화면 */
.ltem-list {
    margin-block: 0px;
}
.item-icon {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    font-size: 14px;
}
.item-title {
    margin-left: 14px;
    font-size: 18px;
}
</style>
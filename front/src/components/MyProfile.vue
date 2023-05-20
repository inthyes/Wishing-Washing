<template>
    <div>
        <v-card elevation="0">
            <!-- 사진 아이콘 암거나 눌러도 프로필편집으로 이동 -->
            <router-link to="/editprofile"> 
                <v-img src="@/assets/프로필.jpg" height="160" width="160" class="round-profile-picture"></v-img>
                <v-icon class="icon-overlay">mdi-account-edit</v-icon>
            </router-link>
            
            <v-card-text>
                <v-row>
                    <v-col class="mt-7">
                        <p id="name">{{ mypageData.U_NAME }}님, 안녕하세요!</p>
                        <p id="email">{{ mypageData.U_MAIL }}</p>
                        <p id="phone">{{ mypageData.U_PHONE }}</p>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import axios from "axios";
import jwt_decode from 'jwt-decode';

export default {
    name: 'MyProfile',
    data: () => ({
        show: false,
        mypageData: {},
        userName: ""
    }),

    created() {
        const token = localStorage.getItem("token");

        if (token) {
            this.verifyToken(token)
                .then((isValidToken) => {
                    this.fetchMypageData();
                    console.log(isValidToken);
                })
                .catch((error) => {
                    console.error(error);
                    this.redirectToLogin();
                });
        } else {
            this.redirectToLogin();
        }
    },

    methods: {
        async verifyToken(token) {
            try {
                const response = await axios.post(
                    "http://localhost:3000/verify-token",
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
                const res = await axios.get("http://localhost:3000/myPage");
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
    }
}
</script>

<style scoped>

.round-profile-picture {
    border-radius: 50%;
    margin: auto;
}

p {
    margin: 0;
}

#email, #phone {
    padding-block: 6px;
    font-size: 18px;
}

#name {
    padding-block: 10px;
    font-size: 20px;
    font-weight: 800;
}

.icon-overlay {
    border-radius: 25%;
    position: absolute;
    top: 39%;
    left: 60%;
    /* transform: translate(110%, 110%); */
    background-color: rgba(0, 0, 0, 0.436);
    color: white;
    font-size: 30px;
}</style>
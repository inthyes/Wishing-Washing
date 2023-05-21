<template>
    <div>
        <v-card elevation="0">
            <router-link to="editmanagerprofile"> 
                <v-img src="@/assets/images/profile.png" height="160" width="160" class="round-profile-picture"></v-img>
                <v-icon class="icon-overlay">mdi-account-edit</v-icon>
            </router-link>
            
            <!-- <v-card-text v-for="manager in managers" :key="manager.id"> -->
            <v-card-text>
                <v-row>
                    <v-col class="mt-7">
                        <p id="name">{{ mypageData.C_NAME }} 사장님, 안녕하세요!</p>
                        <p id="email">{{ mypageData.S_MAIL }}</p>
                        <p id="phone">{{ mypageData.S_PHONE }}</p>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import axios from "axios";
import jwt_decode from 'jwt-decode';
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export default {
    name: 'MyProfile',
    data: () => ({
        show: false,
        mypageData: {},
        ceoName: "",
        imageUrl: "" // 이미지 URL을 저장할 변수 추가
    }),
    async created() {
        await this.getImageUrl(); // 이미지 URL 가져오기

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
                console.log(this.mypageData);


                // this.mypageData = this.mypageData.filter((mypageData) => mypageData.userName === tokenPayload.userName);
            } catch (error) {
                console.error(error);
                throw new Error("마이페이지 데이터 가져오기 실패");
            }
        },

        redirectToLogin() {
            this.$router.push("/login");
        },

        async getImageUrl() {
            try {
                const res = await axios.get(`http://localhost:4000/upload/profile`);
                console.log(res);
                const image = res.data[0];
                const base64 = arrayBufferToBase64(image.u_img.data);
                console.log(base64);
                this.imageUrl = `data:image/png;base64,${base64}`; // 이미지 URL 저장
                console.log(this.imageUrl);
            } catch (e) {
                console.error(e);
            }
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
}
</style>
<!--사용자 mypage-->

<template>
    <div class="mypage">
        <v-card class="mx-auto my-5" max-width="500" flat elevation="0">
            <div class="align-end text-black" height="150">
                <v-row>
                    <v-col style="margin-left: 30px; margin-right: -45%; margin-top: 24px;">
                        <v-icon icon="mdi-account-circle" size="55"></v-icon>
                    </v-col>
                    <v-col style="margin-top: 14px;">
                        <v-card-text id="userInfo">
                            <div id="userName" style="font-size: large;"><b>{{ mypageData.U_NAME }}</b></div>
                            <!-- <div id="userAddr" style="margin-top: 5px;">{{ mypageData.userAddr }}</div> -->
                            <div id="userAddr" style="margin-top: 5px;">{{ mypageData.U_PHONE }}</div>
                        </v-card-text>
                    </v-col>
                    <v-col style="margin-top: 30px; margin-right: -35%;">
                        <v-btn icon="mdi-wrench" color="white" size="40" to="editprofile"></v-btn>
                    </v-col> 
                </v-row>
                <v-divider class="mx-1 mb-1"></v-divider><br>
            </div>

            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-card color="#5E5A80" theme="dark">
                            <v-row style="margin-top: 1px ;">
                                <v-col xs3 style="margin-left: 20px;">
                                    <v-card-subtitle>이용내역</v-card-subtitle>
                                    <v-card-actions>
                                        <v-btn class="text-h5" id="countHistory" style="margin-left: 2px;" color="white"
                                            to="usagehistory">
                                            {{ mypageData.countHistory }}
                                        </v-btn>
                                    </v-card-actions>
                                </v-col>
                                <v-divider vertical
                                    style="margin-left: -1%; margin-bottom: 30px; margin-right: 1%;"></v-divider>

                                <v-col xs3 style="">
                                    <v-card-subtitle>작성리뷰</v-card-subtitle>
                                    <v-card-actions>
                                        <v-btn class="text-h5" id="countReview" style="margin-left: 2px;" color="white"
                                            to="reviewlist">
                                            {{ mypageData.countReview }}
                                        </v-btn>
                                    </v-card-actions>
                                </v-col>
                                <v-divider vertical
                                    style="margin-bottom: 30px; margin-left: -1%; margin-right: -2%;"></v-divider>

                                <v-col xs3 style="">
                                    <v-card-subtitle style="margin-left: 10px;">Q&A</v-card-subtitle>
                                    <v-card-actions>
                                        <v-btn class="text-h5" id="countQnA" color="white" to="qna">{{ mypageData.countQnA}}</v-btn>
                                    </v-card-actions>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>

                    <v-col cols="12">
                        <v-card class="card-hover" color="#5E5A80" theme="dark" to="favoritelaundry" style="color: white;">
                            <div class="d-flex flex-no-wrap justify-space-between">
                                <div style="margin-left: 15px;">
                                    <v-card-title class="text-h7" style="margin-top: 10px; margin-bottom: 5px;">단골
                                        세탁소</v-card-title>
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row style="margin-top: 1px;">
                    <v-col>
                        <v-card-actions style="margin-right: -22px;">
                            <v-btn style="width: 95%; background-color: #5E5A80; color: white; border-radius: 8px;"
                                to="wwnotice">
                                공지사항
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                    <v-col>
                        <v-card-actions style="margin-left: -22px;">
                            <v-btn variant="outlined" style="width: 95%; border-color: #5E5A80; border-radius: 8px;" @click="logout">
                                로그아웃 <!--연결 필요-->
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </v-container>
            <br>
        </v-card>
    </div>
</template>

<script>
import axios from "axios";
import jwt_decode from 'jwt-decode';

export default {
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
        console.log("data:",data);
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

    async logout() {
      try {
        const response = await axios.post('http://localhost:3000/logout', null, {
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
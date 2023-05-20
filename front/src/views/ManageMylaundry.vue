<!--내 세탁소 관리-->
<!--서혜린-->

<template>
    <v-card to="managelaundry"
      class="mx-auto my-10"
      width="300"
      prepend-icon="mdi-washing-machine"
    >
      <template v-slot:title>
        세탁소 관리
      </template>

      <v-card-text>
       세탁소 관리
      </v-card-text>
    </v-card>

    <v-card to="manageproduct"
      class="mx-auto my-10"
      width="300"
      prepend-icon="mdi-tshirt-crew"
    >
      <template v-slot:title>
        상품 관리
      </template>

      <v-card-text>
        상품 관리
      </v-card-text>
    </v-card>

    <v-card to="managereview"
      class="mx-auto my-10"
      width="300"
      prepend-icon="mdi-message-reply-text-outline"
    >
      <template v-slot:title>
        리뷰 관리
      </template>

      <v-card-text>
        리뷰 관리
      </v-card-text>
    </v-card>
</template>


<script>
import axios from "axios";
import jwt_decode from 'jwt-decode';

export default {
  data: () => ({
    show: false,
    // mypageData: {},
    // userName: ""
  }),

  created() {
    const token = localStorage.getItem("token");

    if (token) {
      this.verifyToken(token)
        .then((isValidToken) => {
            this.fetchMylaundryData();
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
        console.log("data:",data);
        return data.isValid;
      } catch (error) {
        throw new Error("토큰 검증 실패");
      }
    },

    async fetchMylaundryData() {
      try {
        const res = await axios.get("http://localhost:4000/laundry");
        this.mypageData = res.data;
        const token = localStorage.getItem("token");
        const tokenPayload = jwt_decode(token);

        console.log("ID:", tokenPayload.id);
        console.log("Token Payload:", tokenPayload);


        // this.mypageData = this.mypageData.filter((mypageData) => mypageData.userName === tokenPayload.userName);
      } catch (error) {
        console.error(error);
        throw new Error("세탁소관리 페이지 가져오기 실패");
      }
    },

    redirectToLogin() {
      this.$router.push("/login");
    },

}}

</script>
<!--요청된 세탁물 상세정보-->
<!--서혜린--> 

<template>
    <div class="orderdetails">
        <v-card class="mx-auto my-5" max-width="500" elevation="0" color="#5E5A80" style="color: white;">
            <div style="text-align: center; font-size: 18px; margin-top: 20px; margin-bottom: 15px;">
                <a>상세 정보</a>
                <v-divider class="mx-1 mb-1" style="margin-top: 4%;"></v-divider>
            </div>
                <v-card-text style="margin-left: 10px; margin-bottom: 10px;">
                    <p><b style="color: #adb5bd">세탁물이미지</b>
                        <v-avatar class="ma-3" rounded="0" style="width: 80%; height: 200px;">
                            <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover style="align-items: center;"></v-img>
                        </v-avatar></p><br>
                    <p><b style="color: #adb5bd">요청날짜</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        {{ request.date }}</p><br>
                    <p><b style="color: #adb5bd">고객아이디</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        {{ request.userId }}</p><br>
                    <p><b style="color: #adb5bd">세탁품목</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        {{ request.name }}</p><br>
                    <p><b style="color: #adb5bd">요청사항</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        {{ request.requirement }}</p><br>
                    <p><b style="color: #adb5bd">세탁가격</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        {{ request.price }}</p><br>
                    <p><b style="color: #adb5bd">배달주소</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        {{ request.userAddr }}</p>
                </v-card-text>
                <v-divider class="mx-1 mb-1"></v-divider>

                <v-row style="margin-bottom: 10px; margin-top: 5px;">
                    <v-col>
                        <v-card-actions>
                          <v-btn id="back" to="manageorder" style="border-radius: 10px;">&lt; 이전</v-btn>
                        </v-card-actions>
                    </v-col>
                    <v-col>
                        <v-card-actions style="margin-left: 120px;">
                          <v-btn id="accept" variant="outlined" style="border-radius: 10px;" @click="clickAccept()">수락</v-btn>
                        </v-card-actions>
                    </v-col>
                    <v-col>
                        <v-card-actions style="margin-left: -30px;">
                          <v-btn id="cancel" variant="outlined" style="border-radius: 10px;" @click="rejectRequest(index)">거절</v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
                
        </v-card>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      request: [],
      beforeShipping: [],
    }
  },
  created() {
    const requestId = this.$route.query.id;     // requestId를 사용하여 데이터를 가져옴
    axios.get(`http://localhost:3012/requests/${requestId}`)    // 요청 ID와 일치하는 데이터를 가져옴
      .then(response => {
        this.request = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
        async rejectRequest(index) {
            try {
                const requestId = this.request.id;
                await axios.delete(`http://localhost:3012/requests/${requestId}`);
                this.showAlert("세탁 요청이 거절되었습니다.");
                this.requests.splice(index, 1);
            } catch (e) {
                console.error(e);
            }
            this.$router.push("/manageorder"); // 관리 페이지로 이동
        },

        // 수락 버튼 -> 배송전으로 이동
        async clickAccept() {
            try {
                const requestId = this.request.id;
                const request = this.request;
                request.status = "배송전";    // JSON 데이터의 "status" 값을 "배송전"으로 수정
                await axios.put(`http://localhost:3012/requests/${requestId}`, request);
                this.showAlert("세탁 요청이 수락되었습니다.");
                this.$router.push("/manageorder"); // 관리 페이지로 이동
            } catch (e) {
                console.error(e);
            }
        },
        showAlert(message) {
            alert(message);
        },
    },
}
</script>
<!--판매내역 상세정보-->
<!--서혜린--> 

<template>
    <div class="historydetails">
        <v-card class="mx-auto my-5" max-width="500" color="#5E5A80" elevation="0" style="color: white;">
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
                          <v-btn id="back" to="managerhistory" style="border-radius: 10px;">&lt; 이전</v-btn>
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
}
</script>
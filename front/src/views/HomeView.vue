<!-- 사용자 홈 -->

<template>
  <v-carousel cycle height="250" hide-delimiter-background show-arrows="hover">
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet :color="colors[i]" height="100%">
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">
            {{ slide }}
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>


  <v-card class="mx-auto" color="white" max-width="400" elevation="0">
    <v-card-text>
      <v-text-field density="compact" variant="solo" append-inner-icon="mdi-magnify" single-line
        @click:append-inner="showApi" readonly>{{ addr1 }}</v-text-field>
    </v-card-text>
  </v-card>
  <div class="daummap">
    <div ref="embed"></div>
    <!-- <v-text-field v-model="query" label="주소"></v-text-field> -->
  </div>
  <!-- <div class="address">
    <input type="text" v-model="query" placeholder="Enter an address" />
    <button @click="showApi">Search</button>
  </div> -->

  <!--추천 세탁소-->
  <!-- <div class="recommend">
        <p style="font-size: 18px;"><b>이 세탁소는 어떠세요 ?</b></p>
        <p style="font-size: 9px; margin-top: -3%;">저희가 추천해드릴게요.</p>
        <div class="popularLaundry">
          <p style="font-size: 15px; padding: 8%; padding-top: 6%;"><b>우리 동네 인기 세탁소</b></p>
          <p style="font-size: 6px; padding-left: 10%; margin-top: -11%; margin-bottom: -1%;">주변에서 인기 있는 세탁소예요!</p>
        </div>
      </div> -->

  <!--세탁 Tip-->
  <!-- <div class="washingTip">
        <p style="font-size: 18px;"><b>생활 속 세탁 TIP !</b></p>
        <p style="font-size: 9px; margin-top: -3%;">집에서도 옷을 잘 관리할 수 있게 도와드릴게요.</p>
        <div class="dryCleaning">
          <p style="font-size: 15px; padding: 8%; padding-top: 6%;"><b>드라이클리닝</b></p>
          <p style="font-size: 3px; padding-left: 10%; margin-top: -11%;">
            손 많이 가는 드라이클리닝 의류, <br>&nbsp; 집에서 어떻게 관리해야 할까 ?</p>
        </div>
      </div> -->
</template>

<script>

import axios from 'axios';

export default {
  name: 'daumMap',
  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2'
      ],
      slides: [
        'First',
        'Second',
        'Third'
      ],
      addr1: ''
    }
  },

  async created() {
        try {
            await axios.get(`http://localhost:3000`, {
                withCredentials: true,
                headers: {
                 Cookie: document.cookie, // 쿠키를 요청에 추가
                 },
            });
        } catch (e) {
            console.error(e);
        }
    },

  methods: {
    showApi() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          let fullRoadAddr = data.roadAddress; // 도로명 주소 변수
          let extraRoadAddr = ''; // 도로명 조합형 주소 변수

          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraRoadAddr !== '') {
            extraRoadAddr = ' (' + extraRoadAddr + ')';
          }
          // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
          if (fullRoadAddr !== '') {
            fullRoadAddr += extraRoadAddr;
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          //this.zip = data.zonecode; //5자리 새우편번호 사용
          this.addr1 = fullRoadAddr;


          const date = new Date();
          date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000); // 30일 후의 시간을 설정합니다.
          const jsonValue = JSON.stringify(data.zonecode); // 데이터를 JSON 형식으로 변환합니다.
          const encodedValue = encodeURIComponent(jsonValue); // 데이터를 인코딩합니다.
          console.log(encodedValue);
          document.cookie = `deliveryAddress1=${encodedValue}; expires=${date.toUTCString()}; path=/;`;

          const addr = this.addr1; // this.addr1에 주소 값이 있다고 가정합니다.
          const jsonValue2 = JSON.stringify(addr); // 데이터를 JSON 형식으로 변환합니다.
          const encodedValue2 = encodeURIComponent(jsonValue2); // 데이터를 인코딩합니다.
          console.log(encodedValue2);
          document.cookie = `deliveryAddress2=${encodedValue2}; expires=${date.toUTCString()}; path=/;`;
        }
        // }).embed(this.$refs.embed)
      }).open();
    },

}

}
</script>

<style>
/* .address {
  height: 30px;
  background-color: rgba(228, 227, 227, 0.728);
  border-radius: 20px;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-left: 4%;
  margin-right: 4%;
  margin-top: 7%;
  margin-bottom: 7%;
  font-size: 10px;
  padding-bottom: 3%;
}

.recommend {
  margin: 5.2%;
}

.popularLaundry {
  height: 170px;
  background-color: rgba(228, 227, 227, 0.728);
  border-radius: 20px;
}

.washingTip {
  margin: 5.2%;
  margin-top: 7%;
}

.dryCleaning {
  height: 170px;
  background-color: rgba(228, 227, 227, 0.728);
  border-radius: 20px;
} */
</style>


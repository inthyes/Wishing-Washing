<template>
    <div class="wrapper">
      <div class="content">
        <v-carousel cycle height="250" hide-delimiter-background show-arrows="hover">
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
              <div class="d-flex fill-height justify-center align-center">
                <div class="text-h2">
                  {{ slide }} Slide
                </div>
              </div>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>

        <!--주소-->
        <div class="address">
          <span>경기 성남시 분당구 불정로 6 그린팩토리</span>
        </div>

        <!--추천 세탁소-->
        <div class="recommend">
          <p style="font-size: 18px;"><b>이 세탁소는 어떠세요 ?</b></p>
          <p style="font-size: 9px; margin-top: -3%;">저희가 추천해드릴게요.</p>
          <div class="popularLaundry">
            <p style="font-size: 15px; padding: 8%; padding-top: 6%;"><b>우리 동네 인기 세탁소</b></p>
            <p style="font-size: 6px; padding-left: 10%; margin-top: -11%; margin-bottom: -1%;">주변에서 인기 있는 세탁소예요!</p>
          </div>
        </div>

        <!--세탁 Tip-->
        <div class="washingTip">
          <p style="font-size: 18px;"><b>생활 속 세탁 TIP !</b></p>
          <p style="font-size: 9px; margin-top: -3%;">집에서도 옷을 잘 관리할 수 있게 도와드릴게요.</p>
          <div class="dryCleaning">
            <p style="font-size: 15px; padding: 8%; padding-top: 6%;"><b>드라이클리닝</b></p>
            <p style="font-size: 3px; padding-left: 10%; margin-top: -11%;">
              손 많이 가는 드라이클리닝 의류, <br>&nbsp; 집에서 어떻게 관리해야 할까 ?</p>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    }
  },
}
</script>

<style>



.address {
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
}


</style>


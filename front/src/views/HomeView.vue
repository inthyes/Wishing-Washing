<!-- 사용자 홈 -->
<!--서혜린-->

<template>
  <v-carousel cycle height="250" hide-delimiter-background show-arrows="hover">
    <v-carousel-item v-for="slide in slides" :key="slide.id">
      <v-sheet height="100%">
        <v-img :src="slide.imageSrc" :alt="slide.altText" height="100%" contain></v-img>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>

  <div class="wrapper">
    <div class="content">
      <!--추천 세탁소-->
      <div class="recommend">
        <p style="font-size: 18px;"><b>이 세탁소는 어떠세요 ?</b></p>
        <p style="font-size: 9px; margin-top: -3%;">저희가 추천해드릴게요.</p>
        <div class="popularLaundry">
          <p style="font-size: 15px; padding: 8%; padding-top: 6%;"><b>우리 동네 인기 세탁소</b></p>
          <p style="font-size: 6px; padding-left: 10%; margin-top: -11%; margin-bottom: -1%;">주변에서 인기 있는 세탁소예요!</p>
          <v-img src="@/assets/images/map.png" style="width: 260px; margin-left: 44px; margin-bottom: 25px; border-radius: 5px;"></v-img>
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
            <v-img src="@/assets/images/drycleaning.png" style="width: 180px; margin-left: 170px; margin-bottom: 100px; margin-top: -20px;"></v-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          imageSrc: require('@/assets/images/001.jpg'),
          altText: 'First Slide',
        },
        {
          imageSrc: require('@/assets/images/002.jpg'),
          altText: 'Second Slide',
        },
        {
          imageSrc: require('@/assets/images/003.jpg'),
          altText: 'Third Slide',
        },
        {
          imageSrc: require('@/assets/images/004.jpg'),
          altText: 'Fourth Slide',
        },
        {
          imageSrc: require('@/assets/images/005.jpg'),
          altText: 'Fifth Slide',
        },
      ],
    }
  },
}
</script>

<style>
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
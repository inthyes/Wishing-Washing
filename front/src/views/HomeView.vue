<!--홈-->
<!--서혜린-->

<template>
  <v-carousel cycle height="250" hide-delimiter-background show-arrows="hover">
    <v-carousel-item v-for="slide in slides" :key="slide.id">
      <v-sheet height="100%">
        <v-img :src="slide.imageSrc" :alt="slide.altText" height="100%" contain></v-img>
      </v-sheet>
    </v-carousel-item>
  </v-carousel><br>

  <div style="font-size: 18px; margin-left: 20px; margin-bottom: 5px; margin-top: 5px;"><b>최신 세탁소 트렌드</b></div>
  <div style="font-size: 12px; margin-left: 25px;">세탁소의 최신 동향을 알려드려요.</div>
  <v-card style="background-color: gainsboro; border-radius: 15px; margin: 20px; margin-bottom: 30px; box-shadow: none;">
    <v-card-text style="font-size: 15px; margin-left: 10px; margin-top: 5px;"><b>인기 세탁 품목</b></v-card-text>
    <v-card-text style="font-size: 11px; margin-top: -28px; margin-left: 20px;">요즘 인기 있는 세탁 품목을 알아보세요.</v-card-text>
    <v-img src="@/assets/images/itemRank.jpg" style="width: 260px; margin-left: 44px; margin-bottom: 25px; border-radius: 5px;"></v-img>
  </v-card>

  <div style="font-size: 18px; margin-left: 20px; margin-bottom: 5px;"><b>세탁소 운영 TIP !</b></div>
  <div style="font-size: 12px; margin-left: 25px;">다양한 세탁소 운영 팁을 알려드려요.</div>
  <v-card style="background-color: gainsboro; border-radius: 15px; margin: 20px; margin-bottom: 30px; box-shadow: none;">
    <v-card-text style="font-size: 15px; margin-left: 10px; margin-top: 5px;"><b>세탁소 인기 올리기</b></v-card-text>
    <v-card-text style="font-size: 11px; margin-top: -28px; margin-left: 20px;">SNS를 활용하여 나의 세탁소를 홍보해보세요.</v-card-text>
    <v-row>
      <v-cols>
        <v-img src="@/assets/images/instaLaundry.png" style="width: 100px; margin-left: 60px; margin-top: 10px; margin-bottom: 30px; border-radius: 5px;"></v-img>
      </v-cols>
      <v-cols>
        <v-img src="@/assets/images/snsLogo.png" style=" width: 100px; margin-left: 40px; margin-top: 35px; margin-bottom: 25px; border-radius: 5px;"></v-img>
      </v-cols>
    </v-row>
  </v-card>
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
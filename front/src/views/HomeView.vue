<!--사장님 홈-->
<!--서혜린-->

<template>
  <v-carousel cycle height="auto" hide-delimiter-background show-arrows="hover" class="carousel">
    <v-carousel-item v-for="slide in slides" :key="slide.id">
      <v-img class="carousel_img" :src="slide.imageSrc" :alt="slide.altText" aspect-ratio="4/3" cover></v-img>
    </v-carousel-item>
  </v-carousel>

  <div class="container">
    <div class="cards">
      <div class="trend">
        <div class="top">
          <p class="title">최신 세탁소 트렌드</p>
          <p class="subtitle">세탁소의 최신 동향을 알려드려요.</p>
        </div>
        <div class="contents">
          <p class="label">인기 세탁 품목</p>
          <p class="description">요즘 인기 있는 세탁 품목을 알아보세요.</p>
          <v-img src="@/assets/images/itemRank.jpg" class="itemRank"></v-img>
        </div>
      </div>
      
      <div class="washingTip">
        <div class="top">
          <p class="title">세탁소 운영 TIP !</p>
          <p class="subtitle">다양한 세탁소 운영 팁을 알려드려요.</p>
        </div>
        <div class="contents">
          <p class="label">세탁소 인기 올리기</p>
          <p class="description">SNS를 활용하여 나의 세탁소를 홍보해보세요.</p>
          <v-row>
            <v-col>
              <v-img src="@/assets/images/instaLaundry.png" style="width: 60%; margin-left: 50px; margin-top: 20px; margin-bottom: 20px; border-radius: 5px;"></v-img>
            </v-col>
            <v-col>
              <v-img src="@/assets/images/snsLogo.png" style=" width: 60%; margin-left: 10px; margin-top: 40px; margin-bottom: 25px; border-radius: 5px;"></v-img>
            </v-col>
          </v-row>
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

<style scoped>
.carousel {
  margin-bottom: 10px;
  padding-inline: 0px;
}
@media only screen and (min-width: 1200px) {
  .carousel_img {
    height: 660px
  }
}
@media only screen and (max-width: 477px) {
  .carousel_img {
    height: 250px
  }
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-inline: 15px;
}
.cards {
  display: flex;
  justify-content: space-between;
}
.top {
  margin-bottom: 5px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
}
.subtitle {
  font-size: 15px;
  margin-bottom: 10px;
}
.contents {
  background-color: rgba(237, 237, 237, 0.728);
  border-radius: 10px;
  padding-inline: 20px;
  padding-top: 20px;
  padding-bottom: 5px;
}
.itemRank {
  width: 80%;
  margin-left: 25px;
  margin-top: 20px;
  margin-bottom: 15px;
  border-radius: 5px;
}
.label {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
}
.description {
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 5px;
}
.trend,
.washingTip {
  margin-top: 15px;
  margin-bottom: 20px;
  flex-basis: 47%;
}

@media screen and (max-width: 599px) {
  .cards {
    flex-direction: column;
  }
}
.drycleaning-image {
  width: 65%;
}
</style>
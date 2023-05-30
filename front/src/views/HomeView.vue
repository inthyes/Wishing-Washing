<!-- 사용자 홈 -->

<template>
  <!-- 캐러셀 -->
  <v-carousel cycle height="auto" hide-delimiter-background show-arrows="hover" class="carousel">
    <v-carousel-item v-for="slide in slides2" :key="slide.id">
      <!-- <v-carousel-item v-for="slide in slides2" :key="slide.id"> -->
      <v-img class="carousel_img" :src="slide.imageSrc" :alt="slide.altText" aspect-ratio="4/3" cover></v-img>
    </v-carousel-item>
  </v-carousel>

  <div class="container">
    <!-- 다음 우편주소API -->
    <v-card class="mx-auto mt-4 px-4 py-2" max-width="700px" color="white" style="display: flex; align-items: center;"
      @click="showApi">
      <p class="text-body-2 font-weight-light m-0 pl-0 pr-5" style="flex: 1; color:gray-darken-1">{{ address2 }}</p>
      <v-icon icon="mdi-map-marker" style="color:gray"></v-icon>
    </v-card>

    <div class="cards">
      <!-- 추천 세탁소 -->
      <div class="recommend">
        <div class="top">
          <p class="title">이 세탁소는 어떠세요?</p>
          <p class="subtitle">{{ userId }}님을 위해 저희가 추천해드릴게요.</p>
        </div>
        <div class="contents">
          <p class="label">우리 동네 인기 세탁소</p>
          <p class="description">주변에서 인기 있는 세탁소예요!</p>
          <v-img src="@/assets/images/map.png" class="map-image"></v-img>
        </div>
      </div>

      <!-- 세탁 Tip -->
      <div class="washingTip">
        <div class="top">
          <p class="title">생활 속 세탁 TIP!</p>
          <p class="subtitle">집에서도 옷을 잘 관리할 수 있게 도와드릴게요.</p>
        </div>
        <div class="contents">
          <p class="label">드라이클리닝</p>
          <p class="description">손 많이 가는 드라이클리닝 의류, 집에서 어떻게 관리해야 할까?</p>
          <v-img src="@/assets/images/drycleaning.png" class="drycleaning-image"></v-img>
        </div>
      </div>
    </div>
  </div>
  <!-- <v-img class="mt-15" :width="auto" aspect-ratio="16/9" src="..\assets\물결-removebg-preview.png" contain></v-img> -->
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: null,
      address2: '',
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
          imageSrc: require('@/assets/images/005.jpg'),
          altText: 'Third Slide',
        },
        {
          imageSrc: require('@/assets/images/004.jpg'),
          altText: 'Fourth Slide',
        },
        {
          imageSrc: require('@/assets/images/007.jpg'),
          altText: 'Fifth Slide',
        },
      ],

      slides2: [
        {
          imageSrc: require('@/assets/images/001.jpg'),
          altText: 'First Slide',
        },
        {
          imageSrc: require('@/assets/images/002.jpg'),
          altText: 'Second Slide',
        },
        {
          imageSrc: require('@/assets/images/005.jpg'),
          altText: 'Third Slide',
        },
        {
          imageSrc: require('@/assets/images/004.jpg'),
          altText: 'Fourth Slide',
        },
        {
          imageSrc: require('@/assets/images/007.jpg'),
          altText: 'Fifth Slide',
        },
      ],
    }
  },
  mounted() {
    this.userId = localStorage.getItem("userId");
    // this.addr1 = localStorage.getItem('addr1');

    // 'deliveryAddress2' 쿠키 가져오기
    const deliveryAddress2Cookie = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('deliveryAddress2='));

    if (deliveryAddress2Cookie) {
      const encodedValue2 = deliveryAddress2Cookie.split('=')[1];
      const decodedValue2 = decodeURIComponent(encodedValue2);
      this.address2 = JSON.parse(decodedValue2);
      console.log(this.address2);

      // Perform any necessary operations with 'address2'
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
          let fullRoadAddr = data.roadAddress;
          let extraRoadAddr = '';
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          if (extraRoadAddr !== '') {
            extraRoadAddr = ' (' + extraRoadAddr + ')';
          }
          if (fullRoadAddr !== '') {
            fullRoadAddr += extraRoadAddr;
          }

          this.addr1 = fullRoadAddr;

          const date = new Date();
          date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);

          const jsonValue = JSON.stringify(data.zonecode);
          const encodedValue = encodeURIComponent(jsonValue);
          console.log(encodedValue);
          document.cookie = `deliveryAddress1=${encodedValue}; expires=${date.toUTCString()}; path=/;`;

          const addr = this.addr1;
          const jsonValue2 = JSON.stringify(addr);
          const encodedValue2 = encodeURIComponent(jsonValue2);
          console.log(encodedValue2);
          document.cookie = `deliveryAddress2=${encodedValue2}; expires=${date.toUTCString()}; path=/;`;
          location.reload()
        }
        // }).embed(this.$refs.embed)
      }).open();
    },
  },
}
</script>

<style scoped>
/* 캐러셀 */
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

/* 나머지 컨텐츠 */
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
  /* margin-top: -5px; */
}

.contents {
  background-color: rgba(237, 237, 237, 0.728);
  border-radius: 10px;
  padding-inline: 20px;
  padding-top: 20px;
  padding-bottom: 5px;
  /* margin-bottom: 20px; */
}

.map-image {
  width: 80%;
  border-radius: 5px;
  margin-left: 50px;
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

.recommend,
.washingTip {
  margin-bottom: 20px;
  flex-basis: 47%;
}

@media screen and (max-width: 599px) {
  .cards {
    flex-direction: column;
  }
}

/* .dryCleaning {
  background-color: rgba(228, 227, 227, 0.728);
  border-radius: 10px;
  padding: 20px;
} */

.drycleaning-image {
  width: 65%;
  /* margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 40px; */
}
</style>

<!-- 사용자 홈 -->
<!--서혜린-->

<template>
  <!-- 캐러쉘 -->
  <v-carousel cycle height="auto" hide-delimiter-background show-arrows="hover" class="carousel">
    <v-carousel-item v-for="slide in slides" :key="slide.id">
      <v-img :src="slide.imageSrc" :alt="slide.altText" height="100%" contain></v-img>
    </v-carousel-item>
  </v-carousel>

  <div class="container">
    <v-text-field class="mx-auto mt-8 mb-5 px-5" max-width="300" density="compact" variant="solo"
      append-inner-icon="mdi-magnify" single-line elevation="0" @click:append-inner="showApi" readonly>
    <p>{{ addr1 }}</p>
    </v-text-field>
    <p append-inner-icon="mdi-magnify" @click:append-inner="showApi">{{ addr1 }}</p>

    <!-- 다음 우편주소API -->
    <div class="daummap">
      <v-card color="white" class="card-with-icon mx-auto my-5" max-width="400" @click="showApi">
        <div class="d-flex align-center">
          <p>{{ addr1 }}</p>
          <v-icon>mdi-magnify</v-icon>
        </div>
      </v-card>
      <!-- <div ref="embed"></div> -->
    </div>

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
      <v-img
      :width="auto"
      aspect-ratio="16/9"
      cover
      src="..\assets\물결-removebg-preview.png"
    ></v-img>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: null,
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
      // slides: [
      //   {
      //     imageSrc: require('@/assets/images/001A.jpg'),
      //     altText: 'First Slide',
      //   },
      //   {
      //     imageSrc: require('@/assets/images/002A.jpg'),
      //     altText: 'Second Slide',
      //   },
      //   {
      //     imageSrc: require('@/assets/images/003A.jpg'),
      //     altText: 'Third Slide',
      //   },
      //   {
      //     imageSrc: require('@/assets/images/004A.jpg'),
      //     altText: 'Fourth Slide',
      //   },
      //   {
      //     imageSrc: require('@/assets/images/005A.jpg'),
      //     altText: 'Fifth Slide',
      //   },
      // ],
      addr1: ''
    }
  },
  mounted() {
    this.userId = localStorage.getItem("userId");
    this.addr1 = localStorage.getItem('addr1');
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
        }
        // }).embed(this.$refs.embed)
      }).open();
    },
  }
}
</script>

<style>
/* 캐러쉘 */
.carousel {
  margin-bottom: 10px;
  padding-inline: 0px;
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
  margin-bottom: 10px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.subtitle {
  font-size: 12px;
  /* margin-top: -5px; */
}

.contents {
  background-color: rgba(237, 237, 237, 0.728);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
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

<template>
  <v-card class="mx-auto my-5 px-5" max-width="400" elevation="0"><br>
    <!-- <div style="margin-top: -28px;"></div> -->
    <v-card v-for="(review, index) in review" :key="index" elevation="0">
      <p class="card-text mb-0">{{ review.U_ID }}</p>
      <p id="reviewDate" style="color: gray">{{ review.REGI_DATE }}</p>
      <v-img class="align-end text-white" id="reviewImg" width="100%" height="auto" :src="review.imageUrl" cover></v-img>
      <v-rating :model-value="review.REVIEW_STAR" color="amber" density="compact" half-increments readonly
        size="small"></v-rating>
      <p id="reviewContent">{{ review.REVIEW_TEXT }}</p>

      <!-- 추가된 부분 --> <!-- 답글 없을 경우 답글 달기 -->
      <div v-if="!review.CEO_COMMENT" class="horizontal-container"> 
        <!-- <p>⮡ </p> -->
        <v-icon size="large" icon="mdi-arrow-right" class="mb-5"></v-icon>
        <v-textarea class="ml-4" v-model="review.replyValue" 
        placeholder="답글을 남겨주세요" variant="outlined" auto-grow rows="1" row-height="15"></v-textarea>
        <v-btn icon="mdi-check" variant="text" color="info" class="mb-5" @click="sendReply(review.O_NUM)"></v-btn>
      </div>
      <!-- 추가된 부분 --> <!-- 답글이 있을 경우 -->
      <div v-else> 
        <span class="px-0"><v-icon class="mr-2" size="small" icon="mdi-arrow-right"></v-icon>{{ review.CEO_COMMENT }}</span>
      </div>
      <v-divider class="mx-1 mb-1"></v-divider>
    </v-card>
  </v-card>
</template>

<script>
import axios from "axios";

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export default {
  data: () => ({
    show: false,
    review: [],
    reply: [],
    replyValue: "",
    imageUrl: "",

  }),
  async created() {
    try {
      const res = await axios.get("http://localhost:4000/myPage/reviewAdmin");
      this.review = res.data.RV;
      await this.getImageUrl();

    } catch (e) {
      console.error(e);
    }
    this.review.forEach((review, index) => {
      review.imageUrl = this.reviewImages[index];

    });
  },
  methods: {

    async getImageUrl() {
      try {
        const res = await axios.get(`http://localhost:4000/upload/laundryReview`);
        console.log(res);

        this.reviewImages = res.data.map(item => {
          if (item.review_img) {

            const base64 = arrayBufferToBase64(item.review_img.data);

            return `data:image/png;base64,${base64}`;
          }
          return null;
        });


      } catch (error) {
        console.error(error);
      }
    },

    async sendReply(O_NUM) {
      try {
        const review = this.review.find((r) => r.O_NUM === O_NUM);

        // 이미 답글이 있는 경우 답글을 달지 않음
        if (review.CEO_COMMENT) {
          this.showAlert("이미 답글이 존재합니다.");
          return;
        }

        review.CEO_COMMENT = review.replyValue;
        console.log(review.CEO_COMMENT);
        await axios.post(`http://localhost:4000/addReviewReply/${O_NUM}`, { CEO_COMMENT: review.CEO_COMMENT });
        this.showAlert("답글이 등록되었습니다.");
        review.replyValue = '';
      } catch (e) {
        console.error(e);
      }
    },
    showAlert(message) {
      alert(message);
    },
  },
};
</script>

<style scoped>
.horizontal-container {
  display: flex;
  align-items: center;
  /* justify-content: center;  */
  /* height: 100vh;  */
}
</style>
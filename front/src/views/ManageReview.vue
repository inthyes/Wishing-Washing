<template>
  <v-card class="mx-auto my-5" max-width="400" elevation="0"><br>
    <div style="margin-top: -28px;"></div>
    <v-card v-for="(review, index) in review" :key="index" elevation="0" style="margin-bottom: 10px;">
      <v-card-text style="margin-bottom: -5px;">
        <span id="userID" style="font-weight: bold; font-size: 15px;">
          {{ review.U_ID }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span id="reviewDate" style="color: gray">{{ review.REGI_DATE }}</span>
      </v-card-text>
      <v-img class="align-end text-white" id="reviewImg" height="150" :src="review.imageUrl" cover></v-img>
      <v-row>
        <v-rating :model-value="review.REVIEW_STAR" color="amber" density="compact" half-increments readonly size="small" style="margin-left: 23px; margin-top: 20px;"></v-rating>
        <v-card-text id="reviewContent" style="margin-top: 8px;">{{ review.REVIEW_TEXT }}</v-card-text>
      </v-row>
      <v-row v-if="!review.CEO_COMMENT"> <!-- 추가된 부분 -->
        <v-col cols="1">
          <v-card-text style="font-size: larger;">⮡ </v-card-text>
        </v-col>
        <v-col cols="9" style="margin-left: 6px; margin-right: -25px;">
          <v-text-field v-model="review.replyValue" placeholder="답글을 남겨주세요" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="3" style="margin-right: -30px;">
          <v-card-actions>
            <v-btn icon="mdi-check" style="color: #0C70FE;" @click="sendReply(review.O_NUM)"></v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
      <v-row v-else> <!-- 추가된 부분 -->
        <v-col cols="1"></v-col>
        <v-col cols="11">
          <v-card-text style="font-size: larger;">⮡ {{ review.CEO_COMMENT }}</v-card-text>
        </v-col>
      </v-row>
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
        await axios.post(`http://localhost:4000/addReviewReply/${O_NUM}`, { CEO_COMMENT: review.CEO_COMMENT } );
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

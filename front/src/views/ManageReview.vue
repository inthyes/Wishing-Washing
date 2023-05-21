<!--리뷰 관리-->
<!--서혜린-->

<template>
  <v-card class="mx-auto my-5" max-width="400" elevation="0"><br>
    <div style="margin-top: -28px;"></div>
      <v-card v-for="r in getMatchingReviews" :key="r.id" elevation="0" style="margin-bottom: 10px;">
          <v-card-text style="margin-bottom: -5px;">
              <span id="userID" style="font-weight: bold; font-size: 15px;">
                  {{ r.userId }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span id="reviewDate" style="color: gray">{{ r.reviewDate }}</span>
          </v-card-text>
          <v-img class="align-end text-white" id="reviewImg" height="150"
              :src="r.reviewImg" cover>
          </v-img>
          <v-row>
              <v-rating :model-value=r.stars color="amber" density="compact" 
                      half-increments readonly size="small" style="margin-left: 23px; margin-top: 20px;"> 
              </v-rating>
              <v-card-text id="reviewContent" style="margin-top: 8px;">{{ r.reviewContent }}</v-card-text>
          </v-row>
          <v-row>
            <v-col cols="1">
              <v-card-text style="font-size: larger;">⮡ </v-card-text>
            </v-col>
            <v-col cols="9" style="margin-left: 6px; margin-right: -25px;">
              <v-text-field v-model="r.replyValue" placeholder="답글을 남겨주세요" variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="3" style="margin-right: -30px;">
              <v-card-actions>
                  <v-btn icon="mdi-check" style="color: #0C70FE;" @click="sendReply(r.id)"></v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
          <v-divider class="mx-1 mb-1"></v-divider>
      </v-card>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
data: () => ({
  show: false,
  managelaundrys: [],
  reviews: [],
  reply: [],
  replyValue: "",
}),
async created() {
  try {
    const res1 = await axios.get("http://localhost:5001/managelaundrys");
    const res2 = await axios.get("http://localhost:5001/reviews");
    this.managelaundrys = res1.data;
    this.reviews = res2.data;
  } catch (e) {
    console.error(e);
  }
},
  computed: {
    getMatchingReviews() {  // 세탁소 관리의 세탁소 아이디 = 리뷰 관리의 세탁소 아이디
      return this.reviews.filter(review => {
      const matchingLaundry = this.managelaundrys.find(laundry => laundry.id === 1); // 세탁소 아이디 = 1
      return matchingLaundry && matchingLaundry.id === review.laundryId;
      });
    }
  },
methods: { 
  async sendReply(reviewId) {
    try {
      const review = this.reviews.find((r) => r.id === reviewId);
      review.reply = this.replyValue;   // 텍스트 필드에서 입력받은 값
      await axios.put(`http://localhost:5001/reviews/${reviewId}`, review);
      this.showAlert("답글이 등록되었습니다.");
      review.replyValue = '';   // 텍스트 필드 비우기
    } catch (e) {
      console.error(e);
    }
  },
  showAlert(message) {
            alert(message);
        },
},
headers: {
  'Access-Control-Allow-Origin': '*'
}
};
</script>
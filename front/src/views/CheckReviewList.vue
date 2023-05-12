<!--리뷰 확인-->
<!--서혜린-->

<template>
    <v-card class="mx-auto my-5" max-width="400" elevation="0">
        <v-card  v-for="r in reviews" :key="r.id" elevation="0"  style="margin-bottom: 10px;">
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
            <v-row style="margin-top: -20px;">
              <v-col cols="1">
                <v-card-text style="font-size: larger; margin-left: 15px;">⮡ </v-card-text>
              </v-col>
              <v-col cols="10" style="margin-left: 20px; margin-right: -25px; margin-top: 10px;">
                <v-card style="box-shadow: none; background-color: gainsboro;" >
                    <v-card-text><a style="color: darkgrey;">답글</a>&nbsp;&nbsp;&nbsp;{{ r.replyValue }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-divider class="mx-1 mb-1" style="margin-top: 15px;"></v-divider>
        </v-card>
    </v-card>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    show: false,
    reviews: [],
  }),
  async created() {
    try {
      const res = await axios.get("http://localhost:3006/reviews");
      this.reviews = res.data;
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
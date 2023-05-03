<!-- 리뷰리스트 --> <!--내가 쓴 리뷰들-->
<!-- 전체적으로 복사하면서 history를 reviews로 변경 안함, axios 404 오류났어요 -->
<template>
    <div class="my_reviews">
        <b>내가 쓴 리뷰</b>
    </div>
    <hr id="division">
    <v-card class="mx-auto my-5" max-width="500" flat v-for="mp in mypage" :key="mp.id" elevation="0">
        <!-- 리뷰 내용 -->
    </v-card>

    <div v-for="(h, index) in reviews" v-bind:key="h.id">
        <div v-if="index === 0 || h.date !== reviews[index - 1].date">
            <div class="laun_date" id="date">
                <b>{{ h.laun_date }}</b>
            </div>
        </div>
        <v-card v-bind:key="h.id" elevation="0">
            <div class="washingStatus">
                <v-img id="washingImage" src="https://source.unsplash.com/185x230/?clothes" cover></v-img>
                <v-card-text>
                    <div id="laun_name">
                        품&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;목&nbsp;&nbsp;|&nbsp;&nbsp;{{ h.name }}
                    </div>
                    <v-divider id="divisionLine2"></v-divider>
                    <a id="whatlaundry">{{ h.whatlaundry }}</a>&nbsp;
                    <div>
                        배송이 빠르고 친절하세요
                    </div>
                </v-card-text>
            </div>
        </v-card>
    </div>
</template>

<style scoped>
.washings {
    margin-top: 20px;
    font-size: 18px;
    text-align: center;
}

#divisionLine {
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 20px;
    margin-bottom: 10px;
}

#divisionLine2 {
    width: 70%;
    margin-left: 95px;
    margin-top: 10px;
    margin-bottom: 5px;
}

.wan_date {
    display: flex;
    align-items: center;
    margin-top: 40px;
    margin-left: 585px;
    font-size: 15px;
}

#cus_name {
    margin-bottom: 3px;
}

#requirement_ {
    margin-bottom: 3px;
}

#laundry_Name {
    margin-left: 4px;
}

#reviewButn {
    width: 10px;
    height: 24px;
    background-color: gainsboro;
    border-radius: 10px;
    margin-top: 1px;
    box-shadow: none;
}

.my_reviews {
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
}

#division {
    margin-top: 10px;
    margin-bottom: 10px;
}

#washingImage {
    width: 185px;
    height: 230px;
    float: left;
    margin-left: 15px;
    margin-top: 19px;
    margin-right: 17px;
    border-radius: 5px;
    object-fit: cover;
    /* 추가 */
}
</style>

<script>
import axios from "axios";

export default {
    data: () => ({
        show: false,
        reviews: []    //historys가 아니라 reviews 로 수정
    }),
    async created() {
        try {
            const res = await axios.get('http://localhost:3004/reviews');
            this.reviews = res.data;    // 마찬가지로 this.history가 아니라 this.reviews로 수정
        } catch (e) {
            console.error(e);
        }
    }
}
</script>
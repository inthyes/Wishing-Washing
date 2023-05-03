<!--리뷰 작성-->

<template>
    <div class="add-review-container">
        <h2 class="add-review-title">
            리뷰 작성
            <hr id="divisionLine">

            <form class="add-review-form" @submit.prevent="submitReview">
                    <div class="add-review-input-container">
                        <label class="add-review-label" for="title">
                            제목
                        </label>
                        <input class="add-review-input" type="text" id="title" v-model="review.title" required>
                    </div>
                    <div class="add-review-input-container">
                        <label class="add-review-label" for="content">
                            내용
                        </label>
                        <textarea class="add-review-input add-review-textarea" id="content" v-model="review.content"
                            required></textarea>
                    </div>
                    <div class="add-review-input-container">
                        <label class="add-review-label" for="rating">
                            별점
                        </label>
                        <select class="add-review-input" id="rating" v-model.number="review.rating" required>
                            <option value="" disabled>
                                별점 선택
                            </option>
                            <option v-for="i in 5" :key="i" :value="i">{{ i }}점</option>
                        </select>
                </div>
                <v-btn id="reviewBtn" to="reviewlist">
                작성 완료    
                </v-btn>
                
            </form>

        </h2>
    </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      show: false,
      historys: [],
      review: {
        title: '',
        content: '',
        rating: 0 // rating 속성을 0으로 초기화
      }
    };
  },
  async created() {
    try {
      const res = await axios.get('http://localhost:3002/historys');
      this.historys = res.data;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    submitReview() {
      console.log(this.review);
      // 리뷰 작성 후 폼 초기화
      this.review.title = '';
      this.review.content = '';
      this.review.rating = 0;
    }
  }
};
</script>



<style scoped>
.add-review-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
}

.add-review-title {
    margin-bottom: 20px;
    text-align: center;
    font-size: 24px;
}

.add-review-form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.add-review-input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 100%;
}

.add-review-label {
    margin-bottom: 10px;
    font-size: 18px;
}

.add-review-input,
.add-review-textarea,
.add-review-select {
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
}

.add-review-input:focus,
.add-review-textarea:focus,
.add-review-select:focus {
    box-shadow: 0px 0px 5px 2px #ddd;
}

.add-review-submit-btn {
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.add-review-submit-btn:hover {
    background-color: #222;
}
</style>  
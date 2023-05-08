<!--리뷰 작성-->

<template>
    <div class="add-review-container">
        <div class="add-review-title">
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
                    <div class="add-review-input" id="rating" required>
                        <!-- <option value="" disabled>
                            별점 선택
                        </option>
                        <option v-for="i in 5" :key="i" :value="i">{{ i }}점</option> -->
                        <v-rating v-model="rating" color="yellow-accent-4" active-color="yellow-accent-4" size="x-large"
                            half-increments></v-rating>
                        <pre>{{ rating }}</pre>
                    </div>

                </div>
                <div class="add-review-btn-container">
                    <button class="add-review-submit-btn" type="submit">작성 완료</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            review: {
                title: '',
                content: '',
                //rating: 0
            },
            rating: 0,
        };
    },
    methods: {
        submitReview() {
            // 현재 날짜 및 시간 가져오기
            const date = new Date();
            const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            // 새로운 리뷰 데이터 생성
            const newReview = {
                title: this.review.title,
                content: this.review.content,
                rating: this.review.rating,
                date: dateString
            };
            // reviews.json 파일에 새로운 리뷰 데이터 추가
            axios.post('http://localhost:3004/reviews', newReview)
                .then(() => {
                    // 리뷰 작성 후 폼 초기화
                    this.review.title = '';
                    this.review.content = '';
                    this.review.rating = 0;
                    // reviewlist.vue로 이동
                    this.$router.push('/reviewlist');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
};
</script>

<style scoped>
.add-review-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
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
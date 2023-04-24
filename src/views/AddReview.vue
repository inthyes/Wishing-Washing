<!--리뷰 작성-->

<template>
    <div class="add-review-container">
        <h2 class="add-review-title">리뷰 작성</h2>
        <form class="add-review-form" @submit.prevent="submitReview">
            <div class="add-review-input-container">
                <label class="add-review-label" for="title">제목:</label>
                <input class="add-review-input" type="text" id="title" v-model="review.title" required>
            </div>
            <div class="add-review-input-container">
                <label class="add-review-label" for="content">내용:</label>
                <textarea class="add-review-input add-review-textarea" id="content" v-model="review.content"
                    required></textarea>
            </div>
            <div class="add-review-input-container">
                <label class="add-review-label" for="rating">별점:</label>
                <select class="add-review-input" id="rating" v-model.number="review.rating" required>
                    <option value="" disabled>별점 선택</option>
                    <option v-for="i in 5" :key="i" :value="i">{{ i }}점</option>
                </select>
            </div>
            <button class="add-review-submit-btn" type="submit">작성 완료</button>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            review: {
                title: '',
                content: '',
                rating: null
            }
        }
    },
    methods: {
        submitReview() {
            // 리뷰 데이터를 서버로 전송하는 로직
            console.log(this.review);
            // 리뷰 작성 후 폼 초기화
            this.review.title = '';
            this.review.content = '';
            this.review.rating = null;
        }
    }
}
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
<!--리뷰 작성-->

<template>
    <div class="add-review-container">
        <v-form @submit.prevent="submitReview">
            <!-- 여기에 이용내역에 대한 정보 들어갔으면 좋겠어요
            예를들어 세탁소이름, 선택한 메뉴, 배송완료날짜 -->
            <div class="mb-3">
                <h4 class="mb-3">세탁소 이름</h4>
                <p class="mb-2" id="deli_date">배송완료날짜</p>
                <!-- 이용내역은 for문으로 가져옵시다 -->
                <div class="mb-3">
                    <P class="my-1" id="order_list">이용내역 test1</P>
                    <P class="my-1" id="order_list">이용내역 test2</P>
                </div>
            </div>
            <v-divider></v-divider>
            <div class="mb-5">
                <label for="formFile" class="form-label">사진을 올려주세요</label>
                <input class="form-control mb-2" type="file" id="image" @change="handleImageUpload" accept="image/*" />
                <div class="photo-container" :class="{ 'no-image': !selectedPhoto }" >
                    <v-img :src="selectedPhoto" alt="Selected Photo"
                        v-if="selectedPhoto" />
                    <div v-else>No Image</div>
                </div>
                <!-- <div class="add-review-input-container">
                <label class="add-review-label" for="image">이미지</label>
                <input type="file" id="image" @change="handleImageUpload" accept="image/*" />
        
                </div> -->
                
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-0">별점을 선택해주세요</label>
                <div>
                    <v-rating color="yellow-accent-4" active-color="yellow-accent-4" size="x-large" half-increments
                        clearable density="compact" v-model="review.rating"></v-rating>
                </div>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">세탁은 어땠나요?</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                    v-model="review.content"></textarea>
            </div>
            <v-divider></v-divider>
            <div class="add-review-btn-container">
                <v-btn type="submit" color="light-blue-darken-4" block class="text-none mb-0" size="x-large" variant="tonal">
                    작성완료 </v-btn>
                <!-- <button class="add-review-submit-btn" type="submit">작성 완료</button> -->
            </div>
        </v-form>
        <!-- </div> -->
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            review: {
                content: '',
                //rating: 0
                image: null
            },
            rating: 0,
            selectedPhoto: null
        };
    },
    async created() {

        try {
            const res = await axios.get(`http://localhost:3000/review`)
            console.log("res", res);
        } catch (e) {
            console.error(e);
        }
    },
    methods: {
            // 이미지 띄우기
        handleImageUpload(event) {
            const file = event.target.files[0];
            this.review.image = file;
            const reader = new FileReader();

            reader.onload = (e) => {
                this.selectedPhoto = e.target.result;
            };

            reader.readAsDataURL(file);
        },
async submitReview() {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const newReview = {
        storeId: this.$route.params.storeId,
        orderNum: this.$route.params.orderNum,
        title: this.review.title,
        content: this.review.content,
        rating: this.review.rating,
        date: dateString,
        image: await this.review.image,
    };

    // 이미지를 제외한 리뷰 데이터를 전송하는 POST 요청
    axios
        .post('http://localhost:3000/review', {
            storeId: newReview.storeId,
            orderNum: newReview.orderNum,
            //title: newReview.title,
            content: newReview.content,
            rating: newReview.rating,
            date: dateString
        })
        .then(() => {
            // 리뷰 작성 후 폼 초기화
            // this.review.title = '';
            this.review.content = '';
            this.review.rating = 0;
            this.review.image = null;
            // 이미지가 있는 경우 이미지를 전송하는 POST 요청
            if (newReview.image) {
                const formData = new FormData();
                formData.append('image', newReview.image);
                formData.append('o_id', newReview.orderNum);
                axios
                    .post('http://localhost:3000/upload/review', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then(() => {
                        console.log('이미지 업로드 완료');
                    })
                    .catch((error) => {
                        console.error('이미지 업로드 실패:', error);
                    });
            }
            // reviewlist.vue로 이동
            this.$router.push('/reviewlist');
        })
        .catch((error) => {
            console.error('리뷰 작성 실패:', error);
        });
},

    }
};
</script>

<style scoped>
.add-review-container {
    max-width: 400px;
    margin: 0 auto;
    margin-block: 10px;
    padding-inline: 30px;
    padding-block: 10px;
    /* border-radius: 10px; */
}

#deli_date, #order_list {
    color: gray;
}
.photo-container {
  max-width: 100%;
  max-height: 300px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  resize: both;
}

.no-image {
  height: 150px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #777;
  
}

/* 
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
} */</style>
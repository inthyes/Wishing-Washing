<!-- 리뷰리스트 --> <!--내가 쓴 리뷰들-->

<template>
    <div id="review-list" class="mt-10 px-5">
        <h5>{{ userId }}님이 작성한 리뷰 </h5>
        <v-divider></v-divider>

        <v-card v-for="r in reviews" :key="r.O_NUM" class="mx-auto mt-4" max-width="400" elevation="0">
            <!-- 세탁소정보 / 별점 / 날짜 -->
            <v-card-body>
                <p class="text text-grey m-0">주문번호 {{ r.O_NUM }}</p>
                <v-btn class="p-0" variant="text" v-bind:to="`/laundrydetail/${r.S_ID}`" >{{ r.S_NAME }} ></v-btn>
                <v-row class="mx-0 my-0">
                    <v-rating :model-value=r.REVIEW_STAR color="amber" density="compact" half-increments readonly
                        size="small">{{ r.REVIEW_STAR }}</v-rating>
                    <p class="text-grey ms-2">{{ r.REGI_DATE.slice(0, 10) }} ({{ getTimeAgo(r.REGI_DATE) }})</p>
                </v-row>
            </v-card-body>
            <!-- 리뷰 사진 -->
            <img src="https://t3.ftcdn.net/jpg/03/86/68/44/240_F_386684471_AdlSqWEYArE3ekokUWeFKWb4yPrfw4Rw.jpg"
                class="card-img-top" alt="Review Image" style="object-fit: cover; height: 200px;">
            <!-- 리뷰제목 / 리뷰내용 -->
            <v-card-body>
                <p class="card-text mt-2">{{ r.REVIEW_TEXT }}</p>
            </v-card-body>
            <v-card-actions class="mx-0 px-0 pt-5">
                <!-- 작성한 사용자만 수정 삭제 가능 -->
                <v-btn variant="flat" class="custom-btn flex-grow-1" color="light-blue-darken-4" v-if="isEditable(r)">
                    수정
                </v-btn>
                <v-btn variant="outlined" class="custom-btn flex-grow-1" color="light-blue-darken-4" v-if="isEditable(r)">
                    삭제
                </v-btn>
            </v-card-actions>
            <v-divider class="py-0"></v-divider>
        </v-card>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data: () => ({
        show: false,
        reviews: []
    }),
    async created() {

        try {
            const res = await axios.get('http://localhost:3000/myPage/review');
            this.reviews = res.data;
        } catch (e) {
            console.error(e);
        }
    },
    methods: {
        getTimeAgo(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const diffInMilliseconds = now - date;

            // Calculate the difference in minutes, hours, and days
            const minutesAgo = Math.floor(diffInMilliseconds / (1000 * 60));
            const hoursAgo = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
            const daysAgo = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

            // Check if the date is after a week
            const nextWeek = new Date(date.getTime() + (7 * 24 * 60 * 60 * 1000));

            if (diffInMilliseconds < 0) {
                // Date is in the future
                return nextWeek.toLocaleDateString();
            } else if (minutesAgo < 60) {
                // Less than an hour ago
                return `${minutesAgo}분 전`;
            } else if (hoursAgo < 24) {
                // Less than a day ago
                return `${hoursAgo}시간 전`;
            } else if (daysAgo < 7) {
                // Less than a week ago
                return `${daysAgo}일 전`;
            } else {
                // After a week
                return nextWeek.toLocaleDateString();
            }
        }
    },
    mounted() {
        this.userId = localStorage.getItem("userId");
    },
    computed: {
        isEditable() {
            return (r) => {
                if (!this.userId) {
                    return false; // User is not logged in
                }
                return r.U_ID === this.userId; // Compare user IDs
            };
        }
    }
}
</script>

<style scoped>
.text {
    font-size: 13px;
}
</style>
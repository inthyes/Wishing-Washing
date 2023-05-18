<template>
    <div id="laund-susbmit" class="mt-10 px-3">
        <v-card class="pa-5 mx-auto" max-width="400" elevation="0">
            <v-form @submit.prevent="submitData">
                <v-row>
                    <v-col cols="12">
                        <h4 class="mb-5">{{ laundry.name }}</h4>
                        <input class="form-control mb-3" placeholder="상세주소" v-model="requestAddr3"> <!-- 상세주소 값 넘기는거 기능 추가해야합니다 -->
                    </v-col>
                </v-row>
                <v-divider></v-divider>

                <v-row>
                    <v-col cols="12">
                        <p class="mb-4">주문상품</p>
                        <!-- <a>{{ submit.id }}</a> -->
                        <a>{{ totalPrice.O_PRICE }}원</a>
                        <!-- <a> {{ submit.quantity }}개</a>  -->
                    </v-col>
                </v-row>
                <v-divider></v-divider>

                <v-row>
                    <v-col cols="12">
                        <p class="mb-4">날짜 선택</p>
                        <v-slide-group> <!-- show-arrows -->
                            <v-slide-group-item v-for="(date, index) in getDateRange(14)" :key="index"
                                v-slot="{ isSelected }">
                                <v-btn class="ma-0" :color="isSelected ? 'primary' : undefined" rounded
                                    @click="toggle(index)" elevation="0" >
                                    <div v-html="formatDate(date)"></div>
                                </v-btn>
                            </v-slide-group-item>
                        </v-slide-group>
                    </v-col>
                </v-row>
                <v-divider></v-divider>

                <v-row>
                    <v-col cols="12">
                        <p class="mb-4">시간 선택</p>
                        <v-chip-group v-model="selection" selected-class="text-light-blue-darken-4" mandatory>
                            <v-chip>5:30</v-chip>
                            <v-chip>7:30</v-chip>
                            <v-chip>8:00</v-chip>
                            <v-chip>9:00</v-chip>
                            <v-chip>10:00</v-chip>
                        </v-chip-group>
                    </v-col>
                </v-row>
                <v-divider></v-divider>

                <v-row>
                    <v-col cols="12">
                        <v-textarea label="요청사항" variant="outlined" v-model="requestText"></v-textarea>
                    </v-col>
                </v-row>
                <v-divider></v-divider>

                <v-btn type="submit" color="light-blue-darken-4" block class="text-none mb-4" size="large" variant="tonal">
                    세탁 예약하기 </v-btn>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        const options = { weekday: 'long', day: 'numeric' };
        return {
            selection: null,        // 시간선택 - 그냥 다자인 요소에요..
            options,
            selectedDate: null,
            laundry: {},
            cart: [],
            addr: {},
            totalPrice: {},
            selectDate: null,
            selectTime: null,
            requestText: null,
            // requestAddr3: null,     // 상세주소 - 받아올때 필요합니다 (수정중)
        };
    },
    async created() {
        const token = await localStorage.getItem("token");

        if (token) {
         this.verifyToken(token)
        .then(async (isValidToken) => {
            try {
                const id = this.$route.params.id;
                console.log(id);
                const res = await axios.get(`http://localhost:3000/laundry/detail/${id}/order`, {
                    withCredentials: true,
                    headers: { Cookie: document.cookie }
                });
                this.cart = res.data.cartRes;
                this.addr = res.data.deliveryAddress;
                this.laundry = res.data.laundryDetailRes;
                this.totalPrice = res.data.totalPriceRes;

                console.log("isValidToken",isValidToken);
            } catch (e) {
                console.error(e);
            }
        });
    }   else {
              this.redirectToLogin();
            // this.fetchNotLogin();
    }
    },
    methods: {
        async submitData() {
            const date = new Date();
            const dateYearMonth = date.toISOString().substring(0, 8)

            if (this.selection == 0) {
                this.selectTime = '5:30'
            }
            else if (this.selection == 1) {
                this.selectTime = '7:30'
            }
            else if (this.selection == 2) {
                this.selectTime = '8:00'
            }
            else if (this.selection == 3) {
                this.selectTime = '9:00'
            }
            else if (this.selection == 4) {
                this.selectTime = '10:00'
            }
            else {
                this.selectTime = '아무때나'
            }
            const data = {
                date: dateYearMonth + this.selectDate.substring(0, 2),
                time: this.selectTime,
                request: this.requestText,
                // requestAddr: this.requestAddr3     // 상세주소 - 받아올때 필요합니다 (수정중)
            }
            const id = this.$route.params.id;
            await axios.post(`http://localhost:3000/laundry/detail/${id}/complete`, data, {
                withCredentials: true,
                headers: {
                    Cookie: document.cookie
                }
            })
                .then((response) => {
                    this.$router.push('/usagehistory');
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        formatDate(date) {
            const parts = date.toLocaleDateString(undefined, this.options).split(' ');
            return `${parts[1].slice(0, 1)}<br>${parts[0].replace(/\D/g, '')}`;    // parts[1]: 요일, parts[0]: 날짜
        },
        getDateRange(numDays) {
            const dates = [];
            for (let i = 0; i < numDays; i++) {
                const date = new Date();
                date.setDate(date.getDate() + i);
                dates.push(date);
            }
            return dates;
        },
        toggle(index) {
            this.selectedDate = index;
            if (this.selectedDate !== null) {
                const selectedDate = this.getDateRange(14)[this.selectedDate];
                this.selectDate = selectedDate.toLocaleDateString(undefined, this.options);
            }
        },
        redirectToLogin() {
        this.$router.push("/login");
        },
        async verifyToken(token) {
            try {
                const response = await axios.post(
                "http://localhost:3000/verify-token",
                { token }
                );
                const data = response.data;
                console.log(data);
                console.log(token);
                return data.isValid;
            } catch (error) {
                throw new Error("토큰 검증 실패");
            }
        },
    },
    // computed: {
    //     selectedDateString() {
    //         if (this.selectedDate !== null) {
    //             const selectedDate = this.getDateRange(14)[this.selectedDate];
    //             return selectedDate.toLocaleDateString(undefined, this.options);
    //         }
    //         return '';
    //     },
    // },
};
</script>

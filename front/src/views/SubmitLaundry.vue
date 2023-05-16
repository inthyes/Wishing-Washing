<template>
    <v-container>
        <v-card class="pa-4 mx-auto" max-width="400">
            <v-form @submit.prevent="submitData">
                <v-row>
                    <v-col cols="12">
                        <h2>{{ laundry.name }}</h2>
                    </v-col>
                </v-row>
                <v-divider></v-divider>

                <v-row>
                    <v-col cols="12">
                        <p class="mb-4">주문상품</p>
                        <!-- <a>{{ submit.id }}</a> -->
                        <a>{{totalPrice.O_PRICE}}원</a>
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
                                    @click="toggle(index)" elevation="0">
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
                        <v-chip-group v-model="selection">
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
                        <!-- <p class="mb-4">요청사항</p> -->
                        <v-textarea label="요청사항" variant="outlined" v-model="requestText"></v-textarea>
                    </v-col>
                </v-row>
                <v-divider></v-divider>

                <v-btn type="submit" color="primary" class="mt-4"> 신청하기</v-btn>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        const options = { weekday: 'long', day: 'numeric' };
        return {
            options,
            selectedDate: null,
            laundry: {},
            cart: [],
            addr: {},
            totalPrice : {},
            selectDate : null,
            selectTime : null,
            requestText : null
        };
    },
    async created() {
        try {
            const id = this.$route.params.id;
            const res = await axios.get(`http://localhost:3000/laundry/detail/${id}/order`, {
                withCredentials: true,
                headers: {Cookie: document.cookie}
            });
            this.cart = res.data.cartRes;
            this.addr = res.data.deliveryAddress;
            this.laundry = res.data.laundryDetailRes;
            this.totalPrice = res.data.totalPriceRes;
        } catch (e) {
            console.error(e);
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
            else  {
                this.selectTime = '아무떄나'
            }
            const data = {
                date : dateYearMonth + this.selectDate.substring(0,2),
                time : this.selectTime,
                request: this.requestText,
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
                this.selectDate =  selectedDate.toLocaleDateString(undefined, this.options);
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

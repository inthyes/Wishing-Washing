<!--사용자 이용내역-->

<template>
    <div class="wrapper">

        <v-card class="mx-auto" max-width="500" elevation="0">
            <v-tabs v-model="tab" stacked grow>
                <v-tab value="one">세탁 진행중</v-tab>
                <v-tab value="two">지난 이용내역</v-tab>
            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">
                    <!-- tab 1 : 진행중인 세탁 -->
                    <v-window-item value="one">
                        <!-- 이용내역 리스트 -->
                        <div v-for="(h, index) in InProgress" v-bind:key="h.O_NUM">
                            <!-- 배송날짜 출력 -->
                            <div v-if="index === 0 || h.ORD_DAY !== order_complete[index - 1].ORD_DAY">
                                <div class="date" id="date">
                                    <b>{{ h.ORD_DAY }}</b>
                                </div>
                            </div>
                            <!-- 이용내역 리스트 출력 -->
                            <v-card v-bind:key="h.id" elevation="0">
                                <div class="washingStatus">
                                    <v-card-text>
                                        <!--  배송상태  -2(수락 대기중) -1(세탁 진행중) 1(배송중) | 2(배송완료) -->
                                        <div id="state">
                                            배송상태&nbsp;|&nbsp;
                                            <span v-if="h.DELEVERY_STATE === -2" style="color: red">수락 대기중</span>
                                            <span v-else-if="h.DELEVERY_STATE === -1">세탁 진행중</span>
                                            <span v-else-if="h.DELEVERY_STATE === 1">배송중</span>
                                        </div>
                                        <!-- 세탁비용 -->
                                        <div id="price">세탁비용&nbsp;|&nbsp;&nbsp;{{ h.O_PRICE }}</div>
                                        <!-- 요청사항 -->
                                        <div id="requirement">요청사항&nbsp;|&nbsp;&nbsp;{{ h.O_REQUEST }}</div>
                                        <v-divider></v-divider>
                                        <!-- 세탁소 이름 -->
                                        <a id="laundryName">{{ h.S_NAME }}</a>&nbsp;
                                        
                                    </v-card-text>
                                </div>
                            </v-card>
                        </div>
                    </v-window-item>

                    <!-- tap 2 : 지난 이용내역 -->
                    <v-window-item value="two">
                        <!-- 최근순 / 오래된순 선택 -->
                        <v-chip-group filter>
                            <v-chip @click="sortDescending">최근순</v-chip>
                            <v-chip @click="sortAscending">오래된순</v-chip>
                        </v-chip-group>

                        <!-- 이용내역 리스트 -->
                        <div v-for="(h, index) in completeDelivery" v-bind:key="h.O_NUM">
                            <!-- 배송날짜 출력 -->
                            <div v-if="index === 0 || h.ORD_DAY !== order_complete[index - 1].ORD_DAY">
                                <div class="date" id="date">
                                    <b>{{ h.ORD_DAY }}</b>
                                </div>
                            </div>
                            <!-- 이용내역 리스트 출력 -->
                            <v-card v-bind:key="h.id" elevation="0">
                                <div class="washingStatus">
                                    <v-card-text>
                                        <!--  배송상태  -2(수락 대기중) -1(진행중) 1(배송중) | 2(배송완료) -->
                                        <div id="state">
                                            배송상태&nbsp;|&nbsp;
                                            <span v-if="h.DELEVERY_STATE === 2">배송완료 ({{ h.COMPLETE_DATE }})</span>
                                        </div>
                                        <!-- 세탁비용 -->
                                        <div id="price">세탁비용&nbsp;|&nbsp;&nbsp;{{ h.O_PRICE }}</div>
                                        <!-- 요청사항 -->
                                        <div id="requirement">요청사항&nbsp;|&nbsp;&nbsp;{{ h.O_REQUEST }}</div>
                                        <v-divider></v-divider>
                                        <!-- 세탁소 이름 -->
                                        <a id="laundryName">{{ h.S_NAME }}</a>&nbsp;
                                        <!-- 리뷰버튼 -->
                                        <v-btn id="reviewBtn" v-bind:to="`/addreview/${h.O_NUM}`">리뷰</v-btn>
                                    </v-card-text>
                                </div>
                            </v-card>
                        </div>
                    </v-window-item>
                </v-window>
            </v-card-text>

        </v-card>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data: () => ({
        // 진행중인 세탁 | 지난 이용내역 TAP
        tab: null,
        show: false,

        order_complete: [],
    }),

    async created() {
        try {
            this.order_complete = await this.fetchOrderComplete('desc');    // 기본값은 최근순으로 설정
            // this.order_complete = res.data;
        } catch (e) {
            console.error(e);
        }
    },

    methods: {
        async fetchOrderComplete(order) {
            try {
                const res = await axios.get('http://localhost:3000/history', {
                    params: {
                        _sort: 'ORD_DAY',
                        _order: order
                    },
                    
                });
                console.log(res.data);
                return res.data;
            } catch (e) {
                throw new Error(e);
            }
        },
        // 오래된순
        async sortAscending() {
            try {
                this.order_complete = await this.fetchOrderComplete('asc');
            } catch (e) {
                console.error(e);
            }
        },
        // 최근순
        async sortDescending() {
            try {
                this.order_complete = await this.fetchOrderComplete('desc');
            } catch (e) {
                console.error(e);
            }
        },
    },
    computed: {
        // tap1
        InProgress() {
            return this.order_complete.filter((h) => h.DELEVERY_STATE !== 2);
        },
        // tap2 - 배송완료
        completeDelivery() {
            return this.order_complete.filter((h) => h.DELEVERY_STATE === 2);
        }
    }
}
</script>

<style>
.myWashing {
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

.date {
    margin-top: 25px;
    margin-left: 4%;
    font-size: 15px;
}

.washingStatus {
    /* height: 141px; */
    border-radius: 13px;
    font-size: smaller;
    background-color: white;
    border: 1px solid gainsboro;
    font-display: center;
    margin-bottom: 10px;
    margin-top: 10px;
    /* white-space: nowrap;  */ /* 텍스트 한줄 유지 기능 삭제 */
    text-overflow: ellipsis;
    /* overflow: auto; */    /* 스크롤바 기능 삭제 */
}

#name, #state, #price, #requirement {
    margin-bottom: 3px;
}

#laundryName {
    margin-left: 4px;
}

#reviewBtn {
    width: 10px;
    height: 24px;
    background-color: #5E5A80;
    color: white;
    border-radius: 10px;
    margin-top: 1px;
    box-shadow: none;
}

.delivery {
    color: red;
    text-decoration-line: none;
}

#washingImg {
    width: 85px;
    height: 100px;
    float: left;
    margin-left: 15px;
    margin-top: 19px;
    margin-right: 17px;
    border-radius: 5px;
}
</style>
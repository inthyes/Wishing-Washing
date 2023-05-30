<!--주문관리-->
<!--서혜린-->

<template>
    <div class="mx-auto pt-6 px-2">
        <div class="mx-auto" style="margin-top: 15px; max-width: 380px;">
            <div id="requestDelivery" style="margin-bottom: 10px;"><b>세탁물 요청</b></div>
        </div>
        <v-card class="mx-auto mb-5" max-width="380" v-for="requests in one" v-bind:key="requests.O_NUM" elevation="0"
            v-bind:to="{ path: '/orderlist/details', query: { id: requests.O_NUM } }">
            <!-- <b>세탁물 요청</b> -->
            <!-- <div v-if="index === 0 || request.date !== requests[index - 1].date" style="margin-bottom: 5px;"> -->
            <div id="O_DAY">
                <p class="mb-2">{{ requests.O_DAY }}</p>
            </div>
            <div class="order-box1">
                <div class="order-info" style="text-align: left;">
                    <p>주문번호 {{ requests.O_NUM }}</p>
                    <!-- <p>{{ requests.DELIVERY_ADDRESS }}</p> -->
                    <P class="my-1">{{ requests.DELIVERY_ADDRESS }}</P>
                    <P class="my-1">{{ requests.DELIVERY_DAY }} {{ requests.DELIVERY_TIME }} 까지</P>
                    <p class="mb-0">요청사항 | {{ requests.O_REQUEST }}</p>

                </div>
                <div class="order-btn" style="text-align: right;">
                    <v-card-actions style="display: flex; align-items: center;">
                        <v-btn id="accept" icon="mdi-check" variant="outlined" size="40px" style="border-radius: 15%;"
                            @click="clickAccept1(requests.O_NUM)"></v-btn>
                        <v-btn id="cancel" icon="mdi-close" variant="outlined" size="40px" style="border-radius: 15%;"
                            @click="rejectRequest(requests.O_NUM)"></v-btn>
                        <!-- <v-btn id="moreInfo" icon="mdi-plus" variant="outlined" size="32px" style="border-radius: 15%;"
                            v-bind:to="{ path: '/orderlist/details', query: { id: requests.O_NUM } }"></v-btn> -->
                    </v-card-actions>
                </div>
            </div>
        </v-card>

        <div class="mx-auto mt-10" style="margin-top: 15px; max-width: 380px;">
            <v-divider></v-divider>
            <div id="requestDelivery" style="margin-bottom: 10px;"><b>세탁물 요청</b></div>
        </div>
        <v-card class="mx-auto mb-5" max-width="380" v-for="requests in two" v-bind:key="requests.O_NUM" elevation="0"
            v-bind:to="{ path: '/orderlist/details', query: { id: requests.O_NUM } }">
            <!-- <b>세탁 준비중</b> -->
            <!-- <div v-if="index === 0 || request.date !== requests[index - 1].date" style="margin-bottom: 5px;"> -->
            <div id="O_DAY">
                <p class="mb-2">{{ requests.O_DAY }}</p>
            </div>
            <div class="order-box2">
                <div class="order-info" style="text-align: left;">
                    <p>주문번호 {{ requests.O_NUM }}</p>
                    <P class="my-1">{{ requests.DELIVERY_ADDRESS }}</P>
                    <P class="my-1">{{ requests.DELIVERY_DAY }} {{ requests.DELIVERY_TIME }} 까지</P>
                    <p class="mb-0">요청사항 | {{ requests.O_REQUEST }}</p>

                </div>
                <div class="order-btn" style="text-align: right;">
                    <v-card-actions style="display: flex; align-items: center;">
                        <v-btn id="accept" variant="outlined" @click="clickAccept2(requests.O_NUM)">배송시작</v-btn>
                        <!-- <v-btn id="cancel" icon="mdi-close" variant="outlined" size="32px" style="border-radius: 15%;"
                            @click="rejectRequest(requests.O_NUM)"></v-btn> -->
                        <!-- <v-btn id="moreInfo" icon="mdi-plus" variant="outlined" size="32px" style="border-radius: 15%;"
                            v-bind:to="{ path: '/orderlist/details', query: { id: requests.O_NUM } }"></v-btn> -->
                    </v-card-actions>
                </div>
            </div>
        </v-card>

        <div class="mx-auto mt-10" style="margin-top: 15px; max-width: 380px;">
            <v-divider></v-divider>
            <div id="requestDelivery" style="margin-bottom: 10px;"><b>배송중</b></div>
        </div>
        <v-card class="mx-auto mb-5" max-width="380" v-for="requests in thr" v-bind:key="requests.O_NUM" elevation="0"
            v-bind:to="{ path: '/orderlist/details', query: { id: requests.O_NUM } }">
            <!-- <b>배송중</b> -->
            <!-- <div v-if="index === 0 || request.date !== requests[index - 1].date" style="margin-bottom: 5px;"> -->
            <div id="O_DAY">
                <p class="mb-2">{{ requests.O_DAY }}</p>
            </div>
            <div class="order-box3">
                <div class="order-info" style="text-align: left;">
                    <p>주문번호 {{ requests.O_NUM }}</p>
                    <P class="my-1">{{ requests.DELIVERY_ADDRESS }}</P>
                    <P class="my-1">{{ requests.DELIVERY_DAY }} {{ requests.DELIVERY_TIME }} 까지</P>
                    <p class="mb-0">요청사항 | {{ requests.O_REQUEST }}</p>

                </div>
                <div class="order-btn" style="text-align: right;">
                    <v-card-actions style="display: flex; align-items: center;">
                        <v-btn id="accept" variant="outlined" @click="clickAccept3(requests.O_NUM)">배송완료</v-btn>
                        <!-- <v-btn id="cancel" icon="mdi-close" variant="outlined" size="32px" style="border-radius: 15%;"
                            @click="rejectRequest(requests.O_NUM)"></v-btn> -->
                        <!-- <v-btn id="moreInfo" icon="mdi-plus" variant="outlined" size="32px" style="border-radius: 15%;"
                            v-bind:to="{ path: '/orderlist/details', query: { id: requests.O_NUM } }"></v-btn> -->
                    </v-card-actions>
                </div>
            </div>

        </v-card>

    </div>
</template>
<script>
import axios from "axios";

export default {
    data: () => ({
        // show: false,
        managelaundrys: [],
        requests: [],
        beforeShipping: [],
        one: [],
        two: [],
        thr: [],
        fou: [],
        DELIVERY_STATE: null
    }),

    async created() {
        try {
            const res = await axios.get(`http://localhost:4000/history`);
            console.log(res.data);

            // 데이터를 this.requests에 할당
            this.requests = res.data;

            //   console.log(this.request.DELIVERY_STATE);

            const one = [];
            const two = [];
            const thr = [];
            const fou = [];

            this.requests.forEach(requests => {
                if (requests.DELIVERY_STATE === -2) {
                    one.push(requests);
                } else if (requests.DELIVERY_STATE === -1) {
                    two.push(requests);
                } else if (requests.DELIVERY_STATE === 1) {
                    thr.push(requests);
                } else if (requests.DELIVERY_STATE === 2) {
                    fou.push(requests);
                }
            });

            //   console.log(this.requests.U_ID);

            console.log("-2", one);
            console.log("-1", two);
            console.log("1", thr);
            console.log("2", fou);

            this.one = one;
            this.two = two;
            this.thr = thr;
            this.fou = fou;
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        async clickAccept1(id) {
            try {
                //console.log(id);
                const res = await axios.post(`http://localhost:4000/orderUpdate1/${id}`);
                console.log(res.data);
                location.reload();
            } catch (error) {
                console.error(error);
            }

        },
        async rejectRequest(id) {
            try {
                //console.log(id);
                const res = await axios.post(`http://localhost:4000/orderDelete/${id}`);
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }

        },

        async clickAccept2(id) {
            try {
                //console.log(id);
                const res = await axios.post(`http://localhost:4000/orderUpdate2/${id}`);
                console.log(res.data);
                location.reload();
            } catch (error) {
                console.error(error);
            }
        },

        async clickAccept3(id) {
            try {
                //console.log(id);
                const res = await axios.post(`http://localhost:4000/orderUpdate3/${id}`);
                console.log(res.data);
                location.reload();
            } catch (error) {
                console.error(error);
            }

        },

        // 다른 메소드들도 정의할 수 있습니다.

        // clickStartDelivery(id) { ... },
        // rejectRequest(id) { ... },
        // clickCompleteDelivery(id) { ... },
    },
};
</script>

<style scoped>
.order-box1 {
    background-color: rgba(39, 106, 169, 0.752);
    color: rgb(255, 255, 255);
    border-radius: 10px;
    /* box-shadow: none;  */
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding-left: 10px;
    padding-top: 10px; */
    padding: 10px;
}

.order-box2 {
    background-color: rgba(39, 106, 169, 0.352);
    color: rgb(77, 77, 77);
    border-radius: 10px;
    /* box-shadow: none;  */
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding-left: 10px;
    padding-top: 10px; */
    padding: 10px;
}

.order-box3 {
    background-color: rgba(39, 106, 169, 0.111);
    color: rgb(0, 0, 0);
    border-radius: 10px;
    /* box-shadow: none;  */
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* padding-left: 10px;
    padding-top: 10px; */
    padding: 10px;
}
</style>
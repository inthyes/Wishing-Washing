<!--주문관리-->
<!--서혜린-->

<template>
    <div class="order">
        <div class="mx-auto my-5" style="margin-top: 15px; max-width: 380px;">
            <div id="requestDelivery" style="margin-bottom: 10px;"><b>세탁물 요청</b></div> <!--&nbsp;&nbsp;좀 남발하지마세요 제발 ㅠ-->
        </div>
        <v-card class="mx-auto my-5" max-width="380" v-for="requests in requests" v-bind:key="requests.O_NUM" elevation="0">
            <!-- <div v-if="index === 0 || request.date !== requests[index - 1].date" style="margin-bottom: 5px;"> -->
            <div id="O_DAY">
                <p class="mb-2">{{ requests.O_DAY }}</p>
            </div>
            <div class="order-box">
                <div class="order-info" style="text-align: left;">
                    <p>주문번호 {{ requests.O_NUM }}</p>
                    <!-- <p>{{ requests.DELIVERY_ADDRESS }}</p> -->
                    <P class="my-1">{{ requests.DELIVERY_DAY }} {{ requests.DELIVERY_TIME }} 까지</P>
                    <p>요청사항 : {{ requests.O_REQUEST }}</p>

                </div>
                <div class="order-btn" style="text-align: right;">
                    <v-card-actions style="display: flex; align-items: center;">
                        <v-btn id="accept" icon="mdi-check" variant="outlined" size="32px" style="border-radius: 15%;"
                            @click="clickAccept(requests.id)"></v-btn>
                        <v-btn id="cancel" icon="mdi-close" variant="outlined" size="32px" style="border-radius: 15%;"
                            @click="rejectRequest(requests.id)"></v-btn>
                        <v-btn id="moreInfo" icon="mdi-plus" variant="outlined" size="32px" style="border-radius: 15%;"
                            v-bind:to="{ path: '/orderlist/details', query: { id: requests.id } }"></v-btn>
                    </v-card-actions>
                </div>
            </div>

        </v-card>
        <v-divider class="mx-1 mb-1" style="margin-top: 30px;"></v-divider>

        <div class="mx-auto my-5" style="margin-top: 15px; max-width: 380px;">
            <div id="beforeDelivery" style="margin-bottom: 10px;"><b>&nbsp;&nbsp;배송전</b></div>
            <!-- <v-card v-for="request in filteredRequests(-1)" :key="request.id" elevation="0"> -->
            <v-card style="background-color: whitesmoke; border-radius: 10px; box-shadow: none; margin-bottom: 7px;">
                <!--#5E5A80-->
                <v-row style="margin-top: -19px; margin-bottom: -18px;">
                    <v-col><v-card-text id="userId" style="margin-top: 4px; font-size: 14px;">
                            <!-- <b>{{ request.userId }}&nbsp;&nbsp;|</b> -->
                        </v-card-text></v-col>
                    <v-col><v-card-text id="name" style="font-size: 14px; margin-left: -60px; margin-top: 4px;">
                            <!-- <b>&nbsp;&nbsp;&nbsp;{{ request.name }}</b> -->
                        </v-card-text></v-col>
                    <v-col style="margin-top: 3px;"><v-card-text id="requirement"
                            style="margin-top: 5px; margin-left: -205px;">
                            <!-- &nbsp;<p>{{ request.requirement }}</p> -->
                        </v-card-text></v-col>
                    <v-card-actions style="margin-right: 20px;">
                        <v-btn id="start" variant="outlined" style="border-radius: 20px; font-size: 12px;"
                            @click="clickStartDelivery(request.id)">배송시작</v-btn>
                    </v-card-actions>
                </v-row>
            </v-card>
            <!-- </v-card> -->
        </div><v-divider class="mx-1 mb-1" style="margin-top: 30px;"></v-divider>

        <div class="mx-auto my-5" style="margin-top: 15px; max-width: 380px;">
            <div id="onDelivery" style="margin-bottom: 10px;"><b>&nbsp;&nbsp;배송중</b></div>
            <!-- <v-card v-for="request in filteredRequests(1)" :key="request.id" elevation="0"> -->
            <v-card style="background-color: whitesmoke; border-radius: 10px; box-shadow: none; margin-bottom: 7px;">
                <v-row style="margin-top: -19px; margin-bottom: -18px;">
                    <v-col><v-card-text id="userId" style="margin-top: 4px; font-size: 14px;">
                            <!-- <b>{{ request.userId }}&nbsp;&nbsp;|</b> -->
                        </v-card-text></v-col>
                    <v-col><v-card-text id="name" style="font-size: 14px; margin-left: -60px; margin-top: 4px;">
                            <!-- <b>&nbsp;&nbsp;&nbsp;{{ request.name }}</b> -->
                        </v-card-text></v-col>
                    <v-col style="margin-top: 3px;"><v-card-text id="requirement"
                            style="margin-top: 5px; margin-left: -200px;">
                            <!-- &nbsp;<p>{{ request.requirement }}</p> -->
                        </v-card-text></v-col>
                    <v-card-actions style="margin-right: 20px;">
                        <v-btn id="complete" variant="outlined" style="border-radius: 20px; font-size: 12px;"
                            @click="clickCompleteDelivery(request.id)">배송완료</v-btn>
                    </v-card-actions>
                </v-row>
            </v-card>
            <!-- </v-card> -->
        </div><v-divider class="mx-1 mb-1" style="margin-top: 30px;"></v-divider>

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
    //   methods: {
    //     filteredRequests(deliveryState) {
    //       return this.requests.filter(request => request.DELIVERY_STATE === deliveryState);
    //     }
    //   },
};
</script>

<style scoped>
.order-box {
    background-color: rgba(39, 106, 169, 0.207);
    color: rgb(0, 0, 0);
    border-radius: 10px;
    /* box-shadow: none;  */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-top: 10px;
}
</style>
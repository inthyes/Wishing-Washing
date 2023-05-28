<!--판매내역-->
<!--서혜린-->

<template>
    <div class="wrapper">
        <v-card class="mx-auto pt-10 px-3" max-width="400" elevation="0">
            <div v-for="request in one" v-bind:key="request.O_NUM" elevation="0" query="request.O_NUM">

                <div class="date mb-2" id="date">
                    <b>{{ request.O_DAY }}</b>
                </div>

                <v-card class="mb-7" v-bind:key="request.O_NUM" elevation="0"
                    v-bind:to="{ path: '/orderlist/details', query: { id: request.O_NUM } }">
                    <div class="washingHistory">

                        <v-card-text>
                            <div id="name" style="margin-bottom: 3px; margin-top: 5px;">
                                <a style="color: darkgray;">주문번호</a>&nbsp;&nbsp;{{ request.O_NUM }}
                            </div>
                            <div id="name" style="margin-bottom: 3px; margin-top: 5px;">
                                <a style="color: darkgray;">사용자ID</a>&nbsp;&nbsp;{{ request.U_ID }}
                            </div>
                            <div id="price" style="margin-bottom: 3px;">
                                <a style="color: darkgray;">비용</a>&nbsp;&nbsp;{{ request.O_PRICE }}
                            </div>
                            <div id="requirement" style="margin-bottom: 3px;">
                                <a style="color: darkgray;">요청</a>&nbsp;&nbsp;{{ request.O_REQUEST }}
                            </div>
                        </v-card-text>
                    </div>
                </v-card>
            </div>
        </v-card>
    </div>
</template>

<style scoped>
.washingHistory {
    /* height: 110px; */
    border-radius: 13px;
    font-size: smaller;
    background-color: white;
    border: 1px solid gainsboro;
    font-display: center;
    margin-bottom: 5px;
    margin-top: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: auto;
}
/* 
#washingImg {
    width: 85px;
    height: 80px;
    float: left;
    margin-left: 15px;
    margin-top: 15px;
    margin-right: 17px;
    border-radius: 5px;
} */
</style>

<script>
import axios from "axios";

export default {
    data: () => ({
        show: false,
        managelaundrys: [],
        requests: [],
        one: []
    }),
    async created() {
        try {
            const res = await axios.get("http://localhost:4000/history");
            console.log(res.data);
            this.requests = res.data;
            const one = [];
            this.requests.forEach(requests => {
                if (requests.DELIVERY_STATE === 2) {
                    one.push(requests);
                    console.log("2", one);

                }
            });
            this.one = await one;
        } catch (error) {
            console.error(error);
        }
    },
    methods: {

    },
}

</script>
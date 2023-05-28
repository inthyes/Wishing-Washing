<!--판매내역-->
<!--서혜린-->

<template>
    <div class="wrapper">
        <v-card class="mx-auto my-5" max-width="500" elevation="0">
            <div style="margin-top: -7%;"></div>
            <div v-for="request in one" v-bind:key="request.O_NUM" elevation="0" query="request.O_NUM">
                
                    <div class="date" id="date" style="margin-top: 40px; margin-left: 4%; font-size: 15px;">
                        <b>{{ request.O_DAY }}</b>
                    </div>
                
                <v-card v-bind:key="request.O_NUM" elevation="0" v-bind:to="{ path: '/orderlist/details', query: { id: request.O_NUM } }">
                    <div class="washingHistory">
                        
                        <v-card-text>
                            <div id="name" style="margin-bottom: 3px; margin-top: 5px;">
                                <a style="color: darkgray;">사용자ID</a>&nbsp;&nbsp;&nbsp;&nbsp;{{ request.U_ID }}
                            </div>
                            <div id="price" style="margin-bottom: 3px;">
                                <a style="color: darkgray;">비용</a>&nbsp;&nbsp;&nbsp;&nbsp;{{ request.O_PRICE }}</div>
                            <div id="requirement" style="margin-bottom: 3px;">
                                <a style="color: darkgray;">요청</a>&nbsp;&nbsp;&nbsp;&nbsp;{{ request.O_REQUEST }}</div>
                        </v-card-text>
                    </div>
                </v-card>
            </div>
            <br>
        </v-card>
    </div>
</template>

<style scoped>
.washingHistory {
    height: 110px;
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
#washingImg {
    width: 85px;
    height: 80px;
    float: left;
    margin-left: 15px;
    margin-top: 15px;
    margin-right: 17px;
    border-radius: 5px;
}
</style>

<script>
import axios from "axios";

export default {
    data: () => ({
        show: false,
        managelaundrys: [],
        requests: [],
        one : []
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
                    console.log("2",one);
                    
                } 
         });
        this.one = await one;
      }catch (error) {
            console.error(error);
        }
    },
    methods: {
        
        },
    }

</script>
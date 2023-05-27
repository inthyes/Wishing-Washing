<!--판매내역-->
<!--서혜린-->

<template>
    <div class="wrapper">
        <v-card class="mx-auto my-5" max-width="500" elevation="0">
            <div style="margin-top: -7%;"></div>
            <div v-for="(request, index) in filteredRequests(2)" v-bind:key="request.id" elevation="0" query="request.id">
                <div v-if="index === 0 || request.date !== requests[index - 1].date">
                    <div class="date" id="date" style="margin-top: 40px; margin-left: 4%; font-size: 15px;">
                        <b>{{ request.date }}</b>
                    </div>
                </div>
                <v-card v-bind:key="request.id" elevation="0" v-bind:to="{ path: '/completelist/details', query: { id: request.id } }">
                    <div class="washingHistory">
                        <v-img id="washingImg" src="https://images.unsplash.com/photo-1603400521630-9f2de124b33b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" cover></v-img>
                        <v-card-text>
                            <div id="name" style="margin-bottom: 3px; margin-top: 5px;">
                                <a style="color: darkgray;">품목</a>&nbsp;&nbsp;&nbsp;&nbsp;{{ request.name }}
                            </div>
                            <div id="price" style="margin-bottom: 3px;">
                                <a style="color: darkgray;">비용</a>&nbsp;&nbsp;&nbsp;&nbsp;{{ request.price }}</div>
                            <div id="requirement" style="margin-bottom: 3px;">
                                <a style="color: darkgray;">요청</a>&nbsp;&nbsp;&nbsp;&nbsp;{{ request.requirement }}</div>
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
            
            this.requests = res.data;
          const one = [];
         this.requests.forEach(requests => {
        if (requests.O_NUM === parseInt(this.$route.query.id)) {
                    one.push(requests);
                    console.log("-2",one);
                    
                } 
         });
        this.one = await one;
      }catch (error) {
            console.error(error);
        }
    },
    methods: {
        filteredRequests(status) {  //배송 상태별로 구분
            return this.requests.filter(request => {
            const matchingLaundry = this.managelaundrys.find(laundry => laundry.id === 1);
            return matchingLaundry && matchingLaundry.id === request.laundryId && request.status === status;
            });
        },
    }
}
</script>
<!--요청된 세탁물 상세정보-->
<!--서혜린--> 

<template>
    <div class="orderdetails">
        <v-card class="mx-auto my-5" max-width="500" elevation="0" color="white">
            <!--<div style="text-align: center; font-size: 18px; margin-top: 20px; margin-bottom: 15px;">
                <a>상세 정보</a>
                <v-divider class="mx-1 mb-1" style="margin-top: 4%;"></v-divider>
            </div>-->
            <v-card-text style="margin-left: 10px; margin-bottom: 10px;" v-if="one.length > 0">
                <div v-for="item in product" :key="item.product_id">
                    <p>상품 이름 :{{ item.product_name }}</p>
                    <p>상품 개수 : {{ item.product_quantity }}</p>
                    <hr />
                </div>
                <p><b style="color: #adb5bd">요청날짜&nbsp; </b>
                    {{ one[0].O_DAY }}</p>
                <p><b style="color: #adb5bd">고객아이디&nbsp; </b>
                    {{ one[0].U_ID }}</p>
                <!-- <p><b style="color: #adb5bd">세탁품목</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        {{ one.name }}</p><br> -->
                <p><b style="color: #adb5bd">요청사항&nbsp; </b>
                    {{ one[0].O_REQUEST }}</p>
                <p><b style="color: #adb5bd">세탁가격&nbsp; </b> 
                    {{ one[0].O_PRICE }}</p>
                <p><b style="color: #adb5bd">배달주소&nbsp; </b> 
                    {{ one[0].DELIVERY_ADDRESS }}</p>
            </v-card-text>
            <v-divider class="mx-1 mb-1"></v-divider>



        </v-card>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            requests: [],
            beforeShipping: [],
            one: [],
            product: []
        }
    },
    async created() {
        //const requestId = this.$route.query.id;     // requestId를 사용하여 데이터를 가져옴
        try {
            const response = await axios.get(`http://localhost:4000/showProduct/${this.$route.query.id}`);
            console.log(response);
            this.product = response.data;
            console.log(this.$route.query.id);
            const res = await axios.get(`http://localhost:4000/history`); // 요청 ID와 일치하는 데이터를 가져옴
            console.log(res.data);
            this.requests = res.data;
            const one = [];
            this.requests.forEach(requests => {
                if (requests.O_NUM === parseInt(this.$route.query.id)) {
                    one.push(requests);
                    console.log("-2", one);

                }
            });
            this.one = await one;
        } catch (error) {
            console.error(error);
        }

    },
    methods: {
        async rejectRequest(id) {
            try {
                //console.log(id);
                const res = await axios.post(`http://localhost:4000/orderDelete/${id}`);
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        },

        // 수락 버튼 -> 배송전으로 이동
        async clickAccept(id) {
            try {
                await axios.post(`http://localhost:4000/orderUpdate1/${id}`);
                this.showAlert("세탁 요청이 수락되었습니다.");
                this.$router.push("/order"); // 관리 페이지로 이동
            } catch (e) {
                console.error(e);
            }
        },
        showAlert(message) {
            alert(message);
        },
    },
}
</script>
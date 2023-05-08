<!-- 주변 세탁소 -->

<template>
    <div id="laund-list" class="px-2">
        
        <v-card class="mx-auto mt-4" max-width="400" v-for="laundry in laundrys" :key="laundry.S_ID" elevation="0">

            <v-img class="align-end text-white" id="laund-img" height="150"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
                <v-card-title id="laund-title">{{ laundry.S_NAME }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-3" id="laund-sub-title">{{ laundry.subtitle }}</v-card-subtitle>

            <v-card-text>
                <div id="laund-address">{{ laundry.S_ADDR2 }}</div>
                <div id="laund-info">{{ laundry.info }}</div>
            </v-card-text>

            <v-card-actions>
                <v-btn color="orange">찜하기</v-btn>
                <v-btn color="orange" v-bind:to="`/laundrydetail/${laundry.S_ID}`" >상세정보</v-btn>
            </v-card-actions>

            <v-divider></v-divider>

        </v-card>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data: () => ({
        show: false,
        laundrys: [] // Add this line to initialize the laundry array
    }),
    async created() {
        try {
            const res = await axios.get('http://localhost:3000/laundry', {
                withCredentials: true, //axios에서 서버에 요청할때 쿠키를 추가하기 위한 작업.

                headers: {
                 Cookie: document.cookie, // 쿠키를 요청에 추가
                 },
            });
            // const res = await axios.get('https://8701-118-217-221-198.jp.ngrok.io/laundrys');    // 실제서버주소로 테스트할때
            this.laundrys = res.data;
            console.log(this.laundrys);
            
        } catch (e) {
            console.error(e);
        }
    }
}
</script>
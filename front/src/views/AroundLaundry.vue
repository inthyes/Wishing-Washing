<!-- 주변 세탁소 -->

<template>
    <div id="laund-list" class="px-2">

        <v-card class="mx-auto mt-4" max-width="400" v-for="laundry in laundrys" :key="laundry.id" elevation="0">

            <v-img class="align-end text-white" id="laund-img" height="150"
                src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8JUVDJTg0JUI4JUVEJTgzJTgxfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                cover>
                <v-card-title id="laund-title">{{ laundry.S_NAME }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-3" id="laund-PHONE">
                <!-- 도로명 주소 --> <!-- 상세주소 -->
                <div id="laund-address">{{ laundry.S_ADD2 }}</div>
                <div id="laund-address">{{ laundry.S_ADD3 }}</div>
            </v-card-subtitle>

            <v-card-text class="py-2">
                <!-- 소개글 -->
                <div id="laund-comment">{{ laundry.S_COMMNET }}</div>
            </v-card-text>

            <v-card-actions class="py-0">
                <v-btn icon @click="toggleWish(laundry)">
                    <v-icon :color="laundry.wish ? 'red' : ''">
                        {{ laundry.wish ? 'mdi-heart' : 'mdi-heart-outline' }}
                    </v-icon>
                </v-btn>
                <v-btn color="orange" v-bind:to="`/laundrydetail/${laundry.id}`">상세정보</v-btn>
            </v-card-actions>

            <v-divider class="py-0"></v-divider>

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
            const res = await axios.get('http://localhost:5000/laundrys');

            this.laundrys = res.data;
        } catch (e) {
            console.error(e);
        }
    },
    methods: {
        // 위시리스트-토글버튼
        toggleWish(laundry) {
            //const laundry = this.laundrys.find(l => l.id === laundryId);
            laundry.wish = laundry.wish ? 0 : 1;
            axios.patch(`http://localhost:5000/laundrys/${laundry.id}`, laundry)
                .then(response => {
                    // handle successful response
                    console.log(response);
                })
                .catch(error => {
                    // handle error
                    console.log(error);
                });
        },
    }
}
</script>
<!-- 관심 세탁소 -->

<template>
    <v-col cols="12">
        <v-card class="mx-auto mt-4" max-width="400" color="#ffffff" theme="light" elevation="1"
            v-for="laundry in laundrys" :key="laundry.S_ID" v-bind:to="`/laundrydetail/${laundry.S_ID}`">
            <div class="d-flex">
                <v-avatar class="ma-3" size="100" rounded="0">
                    <div class="square-container">
                        <v-img
                            src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8JUVDJTg0JUI4JUVEJTgzJTgxfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                            width="200" :aspect-ratio="1"></v-img>
                    </div>
                </v-avatar>

                <div class="mt-1">
                    <v-card-title class="px-1"> {{ laundry.S_NAME }} </v-card-title>
                    <v-card-text class="px-1 text-medium-emphasis"> {{ laundry.S_ADDR2 }} </v-card-text>
                </div>
            </div>
        </v-card>
    </v-col>
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
            const res = await axios.get('http://localhost:3000/myPage/favoriteList');
            this.laundrys = res.data;
        } catch (e) {
            console.error(e);
        }
    },
    // computed: {
    //     favoriteLaundrys() {
    //         return this.laundrys.filter((laundry) => laundry.wish === 1);
    //     },
    // },
};
</script>

<style></style>
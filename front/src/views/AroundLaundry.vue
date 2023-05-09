<!-- 주변 세탁소 -->

<template>
    <div id="laund-list" class="px-2">

        <v-card class="mx-auto mt-4" max-width="400" v-for="laundry in laundrys" :key="laundry.id" elevation="0">

            <v-img class="align-end text-white" id="laund-img" height="150"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
                <v-card-title id="laund-title">{{ laundry.title }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-3" id="laund-sub-title">{{ laundry.subtitle }}</v-card-subtitle>

            <v-card-text>
                <div id="laund-address">{{ laundry.address }}</div>
                <div id="laund-info">{{ laundry.info }}</div>
            </v-card-text>

            <v-card-actions>
                <v-btn icon @click="toggleWish(laundry)">
                    <v-icon :color="laundry.wish ? 'red' : ''">
                        {{ laundry.wish ? 'mdi-heart' : 'mdi-heart-outline' }}
                    </v-icon>
                </v-btn>
                <v-btn color="orange" v-bind:to="`/laundrydetail/${laundry.id}`">상세정보</v-btn>
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
        //isWished: 0,    // 찜버튼

        laundrys: [] // Add this line to initialize the laundry array
    }),
    async created() {
        try {
            const res = await axios.get('http://localhost:3000/laundrys');

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
            //const id = this.$route.params.id;
            axios.patch(`http://localhost:3000/laundrys/${laundry.id}`, laundry)
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
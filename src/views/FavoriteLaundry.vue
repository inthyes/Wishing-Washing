<!-- 관심 세탁소 -->

<template>
    <div id="laund-list">
        <v-card class="mx-auto my-5" max-width="500" v-for="laundry in laundrys" :key="laundry.id" elevation="0">
            <v-img class="align-end text-white" id="laund-img" height="150"
                src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA5MjRfMTQ3%2FMDAxNjY0MDA4MTk4MzAz.BwhTgWGfyhuJY0X5BwkEBx-MCnAp1AiontZ8lctUZcog.p1YZYnoJbu2O6wimUoYzP6ZSLj8UdUW6POKhIBcJtTMg.JPEG.sol_ji1%2FIMG_2992.jpg&type=sc960_832"
                cover>
                <v-card-title id="laund-title">{{ laundry.title }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-3" id="laund-sub-title">{{ laundry.subtitle }}</v-card-subtitle>

            <v-card-text>
                <div id="laund-address">{{ laundry.address }}</div>
                <div id="laund-info">{{ laundry.info }}</div>
            </v-card-text>

            <v-card-actions>
                <router-link :to="{ name: 'laundrydetail', params: { id: laundry.id } }">
                    <v-btn color="orange">상세정보</v-btn>
                </router-link>
            </v-card-actions>

            <v-divider class="mx-1 mb-1"></v-divider>

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
            const res = await axios.get('http://localhost:3000/laundrys');
            this.laundrys = res.data;
        } catch (e) {
            console.error(e);
        }
    }
}
</script>
<!-- 리뷰리스트 --> <!--내가 쓴 리뷰들-->

<template>
    <div>
        <br>
        <h2 class="text-center">내가 쓴 리뷰</h2>
        <hr id="div_line" />

        <v-container fluid>
            <v-row>
                <v-col v-for="r in reviews" :key="r.id" cols="12" md="6" lg="4">
                    <v-card>
                        <v-card-actions>{{ r.rating }}점</v-card-actions>
                        <v-card-title>{{ r.title }}</v-card-title>
                        <v-card-text>{{ r.content }}</v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>



<script>
import axios from "axios";

export default {
    data: () => ({
        show: false,
        reviews: []
    }),
    async created() {
        try {
            const res = await axios.get('http://localhost:3000/reviews');
            this.reviews = res.data;
        } catch (e) {
            console.error(e);
        }
    }
}
</script>
<!--개별 세탁소-->
<template>
    <v-card :loading="loading" class="mx-auto my-0" max-width="400" elevation="0">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
        </template>

        <v-img cover height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

        <v-card-item>
            <v-card-title>{{ laundry.title }}</v-card-title>

            <v-card-subtitle>
                <span class="me-1">{{ laundry.subtitle }}</span>

                <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
            </v-card-subtitle>
        </v-card-item>

        <v-card-text>
            <!--별점(리뷰수)-->
            <v-row align="center" class="mx-0">
                <v-rating :model-value=laundry.stars color="amber" density="compact" half-increments readonly
                    size="normal"></v-rating>

                <div class="text-grey ms-2">
                    {{ laundry.stars }} (413)
                </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
                {{ laundry.address }}
            </div>

            <div>{{ laundry.info }}</div>
        </v-card-text>

        <v-divider class="mx-4 mb-1"></v-divider>

        <v-tabs class="mx-4" v-model="tab" align-tabs="center" stacked grow>
            <v-tab value="tab-1">세탁/수선</v-tab>
            <v-tab value="tab-2">리뷰</v-tab>
        </v-tabs>

        <v-window v-model="tab">
            <v-window-item value="tab-1">
                <v-card>
                    <v-card-text>{{ laundry.menu }}</v-card-text>
                </v-card>
            </v-window-item>
            <v-window-item value="tab-2">
                <v-card>
                    <v-card-text>{{ laundry.reviews }}</v-card-text>
                </v-card>
            </v-window-item>
        </v-window>

        <v-divider class="mx-4 mb-1"></v-divider>


        <v-card-actions>
            <v-btn icon @click="toggleWish">
                <v-icon :color="isWished ? 'red' : ''">{{ isWished ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
            <v-btn to="/submitlaundry" color="deep-purple-lighten-2" variant="text" @click="reserve">
                세탁신청
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        loading: false,
        selection: 1,

        laundry: {},        // laundrys.json

        tab: 'Appetizers',  // 세탁/수선 & 리뷰 탭
        isWished: false,    // 찜버튼



    }),
    async created() {
        try {
            const id = this.$route.params.id;
            const res = await axios.get(`http://localhost:3000/laundrys/${id}`);
            this.laundry = res.data;
        } catch (e) {
            console.error(e);
        }
    },
    methods: {
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
        toggleWish() {
            this.isWished = !this.isWished;
        },
    },
}
</script>


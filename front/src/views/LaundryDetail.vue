<!--개별 세탁소-->

<template>
    <div id="laund-list" class="px-0">
        <v-card :loading="loading" class="mx-auto my-0" max-width="500" elevation="0">
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
                <v-tab value="tab-2">&nbsp;&nbsp;&nbsp;리뷰&nbsp;&nbsp;&nbsp;</v-tab>
            </v-tabs>

            <v-window v-model="tab">
                <v-window-item value="tab-1">
                    <v-list class="mx-1">
                        <v-list-item v-for="(item, index) in laundry.items" :key="index">
                            <v-list-item-content class="d-flex justify-space-between">
                                <div>{{ item.name }}</div>
                                <div>{{ item.price }}원&nbsp;&nbsp;&nbsp;
                                        <v-icon color="deep-purple-lighten-2" @click="decrement(item)">mdi-minus</v-icon>
                                        <span>{{ item.quantity }}</span>
                                        <v-icon color="deep-purple-lighten-2" @click="increment(item)">mdi-plus</v-icon>
                                </div>
                            </v-list-item-content>

                        </v-list-item>
                    </v-list>
                </v-window-item>
                <v-window-item value="tab-2">
                    <div class="text-black mx-6 mt-2">
                        {{ laundry.reviews }}
                    </div>
                </v-window-item>
            </v-window>

            <v-divider class="mx-1 mb-1"></v-divider>


            <v-card-actions>
                <v-btn icon @click="toggleWish">
                    <v-icon :color="isWished ? 'red' : ''">{{ isWished ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                </v-btn>
                <v-btn v-bind:to="`/submitlaundry/${laundry.id}`" 
                color="deep-purple-lighten-2" variant="text" @click="submitData">
                    세탁신청
                </v-btn>
                <!-- <router-link :to="{ name: 'submitlaundry', params: { id: laundry.id } }">
                <v-btn color="deep-purple-lighten-2">신청하기</v-btn>
                </router-link> -->
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        loading: false,
        selection: 1,

        quantity: 0,

        laundry: {},        // laundrys.json
        submits: [],        // submits.json

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
        // reserve() {
        //     this.loading = true

        //     setTimeout(() => (this.loading = false), 2000)
        // },
        toggleWish() {
            this.isWished = !this.isWished;
        },
        increment(item) {
            item.quantity++
        },
        decrement(item) {
            if (item.quantity > 0) {
                item.quantity--
            }
        },
        async submitData() {
            try {
                const selectedItems = this.laundry.items.filter(item => item.quantity > 0);

                for (const item of selectedItems) {
                    const now = new Date();
                    const res = await axios.post("http://localhost:3005/submits", {
                        title: this.laundry.title,
                        itemName: item.name,
                        quantity: item.quantity,
                        // time: new Date(), // 현재 시간을 저장하는 time 프로퍼티를 추가
                        date: now.toISOString().substring(0, 10), // 현재 날짜를 저장하는 date 프로퍼티
                        time: now.toISOString().substring(11, 19), // 현재 시간을 저장하는 time 프로퍼티
                    });

                    this.submits = [...this.submits, res.data];
                }
            } catch (e) {
                console.error(e);
            }
        }
    },

};
</script>


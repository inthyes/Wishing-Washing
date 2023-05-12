<!--개별 세탁소-->

<template>
    <div id="laund-list" class="px-0">
        <v-card :loading="loading" class="mx-auto my-0" max-width="500" elevation="0">
            <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
            </template>

            <v-img cover height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

            <v-card-item>
                <v-card-title>{{ laundry.name }}</v-card-title>

                <v-card-subtitle>
                    <span class="me-1">{{ laundry.opening }} ~ {{ laundry.closing }}</span>

                    <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                </v-card-subtitle>
            </v-card-item>

            <v-card-text>
                <!--별점(리뷰수)-->
                <v-row align="center" class="mx-0">
                    <v-rating :model-value=laundry.stars color="amber" density="compact" half-increments readonly
                        size="normal"></v-rating>

                    <div class="text-grey ms-2">
                        {{ laundry.stars }}
                    </div>
                </v-row>

                <div class="my-4 text-subtitle-1">
                    {{ laundry.doroAddress }}
                </div>
                <div class="my-4 text-subtitle-1">
                    {{ laundry.detailAddress }}
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
                        <v-list-item v-for="pro in product" :key="pro.PRODUCT_ID">
                            <v-list-item-content class="d-flex justify-space-between">
                                <div>{{ pro.PRODUCT_NAME }}</div>
                                <div>{{ pro.PRODUCT_PRICE }}원&nbsp;&nbsp;&nbsp;
                                    <v-icon color="deep-purple-lighten-2" @click="decrement(pro)">mdi-minus</v-icon>
                                    <span>{{ pro.PRODUCT_QUANTITIY }}</span>
                                    <v-icon color="deep-purple-lighten-2" @click="increment(pro)">mdi-plus</v-icon>
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
                <v-btn icon @click="toggleWish(laundry)">
                    <v-icon :color="laundry.wish ? 'red' : ''">
                        {{ laundry.wish ? 'mdi-heart' : 'mdi-heart-outline' }}
                    </v-icon>
                </v-btn>
                <v-btn v-bind:to="`/submitlaundry/${laundry.id}`" color="deep-purple-lighten-2" variant="text"
                    @click="submitData">
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
        product: [],

        tab: 'Appetizers',  // 세탁/수선 & 리뷰 탭
        //isWished: 0,    // 찜버튼

    }),

 

    async created() {
        try {
            const id = this.$route.params.id;
            const res = await axios.get(`http://localhost:3000/laundry/detail/${id}`, {
                withCredentials: true,
                headers: {
                 Cookie: document.cookie, // 쿠키를 요청에 추가
                 },
            });
                this.laundry = res.data.laundryDetail;
                this.product = res.data.productDetail
        } catch (e) {
            console.error(e);
        }
    },
    methods: {
        // reserve() {
        //     this.loading = true

        //     setTimeout(() => (this.loading = false), 2000)
        // },

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
        // 상품수량증가
        increment(pro) {
            pro.PRODUCT_QUANTITIY++;
            pro.PRODUCT_PRICE_TOTAL = pro.PRODUCT_PRICE_TOTAL + pro.PRODUCT_PRICE;
        },
        // 상품수량감소
        decrement(pro) {
            if (pro.PRODUCT_QUANTITIY > 0) {
                pro.PRODUCT_QUANTITIY--;
                pro.PRODUCT_PRICE_TOTAL = pro.PRODUCT_PRICE_TOTAL - pro.PRODUCT_PRICE;
            }
        },
        async submitData() {
            try {
                    const selectedItems = this.product;
                    const id = this.$route.params.id;

                    const data = { laundryId: this.$route.params.id};
                    selectedItems.forEach(pro => {data[pro.PRODUCT_ID] = pro.PRODUCT_QUANTITIY});
                    const res = await axios.post(`http://localhost:3000/laundry/detail/${id}/order`, data);
                    //res.data의 orderNum 쿠키처리
                    this.$cookies.set('response', res.data)
                    this.$cookies.get('response')
            } catch (e) {
                console.error(e);
            }
        }
    },

};
</script>

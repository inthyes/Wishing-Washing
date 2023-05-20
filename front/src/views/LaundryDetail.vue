<!--개별 세탁소-->

<template>
    <div id="laund-list" class="px-0">
        <v-card :loading="loading" class="mx-auto my-0" max-width="500" elevation="0">
            <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
            </template>

            <v-img cover height="250"
                src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8JUVDJTg0JUI4JUVEJTgzJTgxfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"></v-img>

            <v-card-item>

                <v-card-title class="mb-1">{{ laundry.name }}</v-card-title>

                <v-card-subtitle>
                    <span class="mb-1">영업시간&nbsp;{{ laundry.opening }} ~ {{ laundry.closing }}</span>
                </v-card-subtitle>
            </v-card-item>

            <v-card-text>
                <!--별점(리뷰수)-->
                <v-row align="center" class="mx-0 mb-1">

                    <v-rating :model-value=reviewStar color="amber" density="compact" half-increments readonly
                        size="normal"></v-rating>

                    <div class="text-grey ms-2">
                        {{ reviewStar }} ({{countReview}})
                    </div>
                </v-row>

                <div class="mt-3">

                    {{ laundry.doroAddress }}
                </div>
                <div class="mt-0">
                    {{ laundry.postAddress }}

                </div>

                <!-- 이건 수정할수도 -->
                <div class="my-4 text-subtitle-1">
                    {{ laundry.S_ADDR2 }}
                </div>

                <div class="mt-1 text-subtitle-1">{{ laundry.info }}</div>

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

                                    <span>{{ pro.PRODUCT_QUANTITY }}</span>

                                    <v-icon color="deep-purple-lighten-2" @click="increment(pro)">mdi-plus</v-icon>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-window-item>
                <v-window-item value="tab-2">
                    <div class="text-black mx-6 mt-2">
                     <v-container fluid>
            <v-row>
                <v-col v-for="r in review" :key="r.O_NUM" cols="12" md="6" lg="4">
  <v-card>
    <v-img v-if="r.imageUrl" :src="r.imageUrl" width="100%" height="auto"></v-img>
    <v-card-actions>{{ r.REVIEW_STAR }}점</v-card-actions>
    <v-card-title>{{ r.REVIEW_TITLE }}</v-card-title>
    <v-card-text>{{ r.REVIEW_TEXT }}</v-card-text>
  </v-card>

                </v-col>
            </v-row>
        </v-container>
                      
                    </div>
                </v-window-item>
            </v-window>

            <v-divider class="mx-1 mb-1"></v-divider>


            <v-card-actions class="mb-2">
                <v-btn icon @click="toggleWish(likeStatus)">
                    <v-icon :color="likeStatus ? 'red' : ''">{{ likeStatus ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                </v-btn>
                <v-btn class="flex-grow-1 mr-3" color="light-blue-darken-4" size="large" variant="tonal" @click="submitData">
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

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export default {
    data: () => ({
        loading: false,
        selection: 1,

        laundry: {},        // laundrys.json
        submits: [],        // submits.json      
        product: [],
        review: [],

        reviewStar: {},
        likeStatus: {},
        countReview : {},
         imageUrl: "",

        tab: 'Appetizers',  // 세탁/수선 & 리뷰 탭
        isWished: false,    // 찜버튼

    }),
    async created() {
        
        try {
            await this.getImageUrl(); // 이미지 URL 가져오기
            
            const id = this.$route.params.id;
            const res = await axios.get(`http://localhost:3000/laundry/detail/${id}`, {
                withCredentials: true,
                headers: {
                    Cookie: document.cookie, // 쿠키를 요청에 추가
                },
            });
            this.laundry = res.data.laundryDetail;
            this.product = res.data.productDetail;
            this.review = res.data.review;
            this.reviewStar = res.data.reviewStar;
            this.likeStatus = res.data.userLike;
            this.countReview = res.data.countReview;

            this.review.forEach((r, index) => {
            r.imageUrl = this.reviewImages[index];
            
        });

        } catch (e) {
            console.error(e);
        }
    },
    methods: {

           async getImageUrl() {
  try {
    const res = await axios.get(`http://localhost:3000/upload/laundryReview/${this.$route.params.id}`);
    console.log(res);

    this.reviewImages = res.data.map(item => {
      if (item.review_img) {
        
        const base64 = arrayBufferToBase64(item.review_img.data);
        
        return `data:image/png;base64,${base64}`;
      }
      return null;
    });

   
  } catch (error) {
    console.error(error);
  }
   },
        // reserve() {
        //     this.loading = true

        //     setTimeout(() => (this.loading = false), 2000)
        // },


        toggleWish(likeStatus) {
            //const laundry = this.laundrys.find(l => l.id === laundryId);

            this.likeStatus = likeStatus ? 0 : 1;

            axios.post(`http://localhost:3000/like`, { laundryId: this.$route.params.id, like: this.likeStatus })
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
            pro.PRODUCT_QUANTITY++;
            pro.PRODUCT_PRICE_TOTAL = pro.PRODUCT_PRICE_TOTAL + pro.PRODUCT_PRICE;
        },
        // 상품수량감소
        decrement(pro) {
            if (pro.PRODUCT_QUANTITY > 0) {
                pro.PRODUCT_QUANTITY--;
                pro.PRODUCT_PRICE_TOTAL = pro.PRODUCT_PRICE_TOTAL - pro.PRODUCT_PRICE;
            }
        },
        async submitData() {
            try {
                const now = new Date();
                const selectedItems = this.product;
                // const getReviews = this.review;
                const id = this.$route.params.id;

                const data = { laundryId: id, date: now.toISOString().substring(0, 10), time: now.toISOString().substring(11, 19) };
                selectedItems.forEach(pro => { data[pro.PRODUCT_ID] = pro.PRODUCT_QUANTITY });
                const res = await axios.post(`http://localhost:3000/laundry/detail/${id}/order`, data);
                //res.data의 orderNum 쿠키처리
                this.$cookies.set('response', res.data)
                this.$cookies.get('response')
                this.$router.push(`/submitlaundry/${id}`);
                // const selectedItems = this.laundry.items.filter(item => item.quantity > 0);

            } catch (e) {
                console.error(e);
            }
        }
    },

};
</script>

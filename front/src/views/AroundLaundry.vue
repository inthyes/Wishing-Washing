<!-- 주변 세탁소 -->

<template>
    <div id="laund-list" class="mt-10 px-2">

        <v-card class="mx-auto mt-4" max-width="400" v-for="laundry in laundrys" :key="laundry.S_ID" elevation="0">

            <v-img class="align-end text-white" id="laund-img" height="150"
                src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8JUVDJTg0JUI4JUVEJTgzJTgxfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                cover>
                <v-card-title id="laund-title">{{ laundry.S_NAME }}</v-card-title>
            </v-img>

            <v-row align="center" class="mx-3 my-3">
                <v-rating :model-value=laundry.stars color="amber" density="compact"  half-increments readonly 
                    size="small"></v-rating>
                <div class="text-grey ms-2">{{ laundry.stars }}</div>
            </v-row>

            <v-card-subtitle class="pt-0" id="laund-PHONE">
                <!-- 도로명 주소 --> <!-- 상세주소 -->
                <div id="laund-address">{{ laundry.S_ADDR2 }}</div>
                <div id="laund-address">{{ laundry.S_ADDR3 }}</div>
            </v-card-subtitle>

            <v-card-text class="py-2">
                <!-- 소개글 -->
                <div id="laund-comment">{{ laundry.S_COMMENT }}</div>
            </v-card-text>

            <v-card-actions class="py-0">
                <v-btn icon @click="toggleWish(laundry)" class="mx-0 px-0">
                    <v-icon :color="laundry.userLike ? 'red' : ''">
                        {{ laundry.userLike ? 'mdi-heart' : 'mdi-heart-outline' }}
                    </v-icon>
                </v-btn>
                <v-btn class="mx-0 px-0" color="indigo-darken-2" size="x-large" v-bind:to="`/laundrydetail/${laundry.S_ID}`">상세정보</v-btn>
            </v-card-actions>

            <v-divider class="py-0"></v-divider>

        </v-card>
    </div>
</template>

<script>
import axios from "axios";
import jwt_decode from 'jwt-decode';

export default {
    data: () => ({
        show: false,
        laundrys: [] // Add this line to initialize the laundry array
    }),
    async created() {
     const token = await localStorage.getItem("token");
    if (token) {
         this.verifyToken(token)
        .then((isValidToken) => {
        //   if (isValid) {
        //     // 토큰이 유효한 경우에만 쿠키 작업 수행
            this.handleCookies();

            this.fetcharoundlaundryData();
            console.log("is",isValidToken);
        //   } else {
        //     this.handleCookies();
        //     this.fetcharoundlaundryData();
        //     console.log(isValid);
        //   }
        })
        .catch((error) => {
          console.error(error);
          this.redirectToLogin();
        });
    } else {
      this.redirectToLogin();
    }
  },
// async created() {
//     const token = localStorage.getItem("token");
//     console.log("created:", token);
//     if (token) {
//         try {
//             const isValid = await this.verifyToken(token);
//             if (isValid) {
//                 console.log("Token is not valid");
//                 this.redirectToLogin();
//             } else {
                
//                 this.handleCookies();
//                 this.fetcharoundlaundryData();
//                 console.log("isValid:", isValid);
//             }
//         } catch (error) {
//             console.error(error);
//             this.redirectToLogin();
//         }
//     } else {
//         this.redirectToLogin();
//     }
// },


    methods: {
        // 위시리스트-토글버튼
        toggleWish(laundry) {
            //const laundry = this.laundrys.find(l => l.id === laundryId);
            laundry.userLike = laundry.userLike ? 0 : 1;
            axios.post(`http://localhost:3000/like`, { laundryId: laundry.S_ID, like: laundry.userLike })
                .then(response => {
                    // handle successful response
                    console.log(response);
                })
                .catch(error => {
                    // handle error
                    console.log(error);
                });
        },
        async verifyToken(token) {
            try {
                const response = await axios.post(
                "http://localhost:3000/verify-token",
                { token }
                );
                const data = response.data;
                console.log(data);
                console.log(token);
                return data.isValid;
            } catch (error) {
                throw new Error("토큰 검증 실패");
            }
        },
        async handleCookies() {
        try {
                const res = await axios.get('http://localhost:3000/laundry', {
                withCredentials: true, // axios에서 서버에 요청할 때 쿠키를 추가하기 위한 작업.
                headers: {
                    Cookie: document.cookie, // 쿠키를 요청에 추가
                },
            });
                this.laundrys = res.data;
                console.log("쿠키 확인");
            } catch (e) {
                console.error(e);
            }
        },
         fetcharoundlaundryData() {
            try {
               
                const res =  axios.get("http://localhost:3000/laundry", {
                withCredentials: true, // axios에서 서버에 요청할 때 쿠키를 추가하기 위한 작업.
                    headers: {
                        Cookie: document.cookie, // 쿠키를 요청에 추가
                    },
                })
                this.aroundlaundryData = res.data;
                const token = localStorage.getItem("token");
                const tokenPayload = jwt_decode(token);

                console.log("ID:", tokenPayload.id);
                console.log("Token Payload:", tokenPayload);

            
                // this.mypageData = this.mypageData.filter((mypageData) => mypageData.userName === tokenPayload.userName);
            } catch (error) {
                console.error(error);
                throw new Error("마이페이지 데이터 가져오기 실패");
            }
        },

        redirectToLogin() {
        this.$router.push("/login");
        },
        
    }
}
</script>
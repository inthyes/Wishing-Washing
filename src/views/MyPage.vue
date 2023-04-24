<!--사용자 mypage-->

<template>
    <div class="mypage">
        <v-card class="mx-auto my-5" max-width="500" flat v-for="mp in mypage" :key="mp.id" elevation="0">
            <div class="align-end text-black" height="150">
                <v-row>
                    <v-col style="margin-left: 30px; margin-right: -280px; margin-top: 24px;">
                        <v-icon icon="mdi-account-circle" size="55"></v-icon>
                    </v-col>
                    <v-col style="margin-top: 14px;">
                        <v-card-text id="userInfo">
                            <div id="userName" style="font-size: large;"><b>{{ mp.userName }}</b></div>
                            <div id="userAddr" style="margin-top: 5px;">{{ mp.userAddr }}</div>
                        </v-card-text>
                    </v-col>
                    <v-col style="margin-top: 30px; margin-right: -230px;">
                        <v-btn icon="mdi-wrench" color="white" size="40" to="editprofile"></v-btn>
                    </v-col>
                </v-row>
                <v-divider class="mx-1 mb-1"></v-divider><br>
            </div>
            
            <v-container>
              <v-row>
                  <v-col cols="12">
                    <v-card color="#5E5A80" theme="dark">
                      <v-row style="margin-top: 1px ;">
                        <v-col xs3 style="margin-left: 35px;">
                            <v-card-subtitle>이용내역</v-card-subtitle>
                            <v-card-actions>
                              <v-btn class="text-h5" id="countHistory" style="margin-left: 2px;" color="white" to="usagehistory">
                                {{ mp.countHistory }}
                              </v-btn>
                            </v-card-actions>
                        </v-col>
                        <v-divider vertical style="margin-left: -20px; margin-bottom: 30px; margin-right: 15px;"></v-divider>
                    
                        <v-col xs3 style="margin-left: 8px;">
                            <v-card-subtitle>작성리뷰</v-card-subtitle>
                            <v-card-actions>
                              <v-btn class="text-h5" id="countReview" style="margin-left: 2px;" color="white" to="reviewlist">
                                {{ mp.countReview }}
                              </v-btn>
                            </v-card-actions>
                        </v-col>
                        <v-divider vertical style="margin-left: -15px; margin-bottom: 30px; margin-right: 10px;"></v-divider>
                    
                        <v-col xs3 style="margin-left: 12px;">
                            <v-card-subtitle style="margin-left: 10px;">Q&A</v-card-subtitle>
                            <v-card-actions>
                              <v-btn class="text-h5" id="countQnA" color="white" to="qna">{{ mp.countQnA }}</v-btn>
                            </v-card-actions>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
        
                  <v-col cols="12">
                    <v-card class="card-hover" color="#5E5A80" theme="dark" to="favoritelaundry" style="color: white;">
                        <div class="d-flex flex-no-wrap justify-space-between"><div style="margin-left: 15px;">
                        <v-card-title class="text-h7" style="margin-top: 10px; margin-bottom: 5px;">단골 세탁소</v-card-title>

                        <v-card-subtitle>
                            <div id="laundryName">{{ mp.laundryName }}</div>
                            <div id="laundryAddr">{{ mp.laundryAddr }}</div>
                        </v-card-subtitle>
                        
                        <v-row class="mx-0">
                            <v-rating :model-value=mp.stars color="amber" density="compact" 
                                half-increments readonly size="small" style="margin-left: 15px; margin-top: 20px;"></v-rating>
                            <div class="text-grey ms-2" style="font-size: 15px; margin-top: 23px;">{{ mp.stars }}</div>
                        </v-row>
                       </div>

                        <v-avatar class="ma-3" rounded="0" style="width: 230px; height: 140px;">
                            <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover
                                    style="margin-left: -10px;"></v-img>
                        </v-avatar>
                     </div>
                    </v-card>
                  </v-col>
                </v-row>

                    <v-card color="white" style="border-radius: 0%; margin-top: -10px; box-shadow: none;">
                        <v-divider class="mx-1 mb-1"></v-divider>
                        <v-card-title style="margin-bottom: 5px; font-size: 16px;">단골 세탁소 정보</v-card-title>
                        <v-card-subtitle>
                            <div id="operatingHour">운영시간 : {{ mp.operatingHour }}</div>
                            <div id="dayOff">휴무일 : {{ mp.dayOff }}</div>
                            <div id="laundryNumber" style="margin-bottom: 4px;">전화 : {{ mp.laundryNumber }}</div>
                        </v-card-subtitle>
                        <v-divider class="mx-1 mb-1"></v-divider>
                    </v-card>

                    <v-row style="margin-top: 1px;">
                      <v-col>
                        <v-card-actions style="margin-right: -30px;">
                            <v-btn style="width: 210px; background-color: #5E5A80; color: white; border-radius: 8px;" to="wwnotice">
                                공지사항
                            </v-btn>
                        </v-card-actions>
                      </v-col>
                      <v-col>
                        <v-card-actions style="margin-left: -10px;">
                            <v-btn variant="outlined" style="width: 210px; border-color: #5E5A80; border-radius: 8px;">
                                로그아웃 <!--연결 필요-->
                            </v-btn>
                        </v-card-actions>
                      </v-col>
                    </v-row>
            </v-container>
            <br>
        </v-card>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data: () => ({
        show: false,
        mypage: []
    }),
    async created() {
        try {
            const res = await axios.get('http://localhost:3003/mypage');
            this.mypage = res.data;
        } catch (e) {
            console.error(e);
        }
    }
}
</script>
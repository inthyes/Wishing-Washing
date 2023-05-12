<!--사장님 mypage-->
<!--서혜린-->

<template>
    <div class="managermypage">
        <v-card class="mx-auto my-5" max-width="500" flat v-for="managelaundry in managelaundrys" :key="managelaundry.id" elevation="0">
            <div class="align-end text-black" height="150">
                <v-row style="margin-bottom: 5px;">
                    <v-col style="margin-left: 30px; margin-right: -45%; margin-top: 24px;">
                        <v-icon icon="mdi-account-circle" size="55"></v-icon>
                    </v-col>
                    <v-col style="margin-top: 14px;">
                        <v-card-text id="managerInfo">
                            <div id="managerName" style="font-size: large;"><b>XXX 사장님</b></div>
                            <div id="laundryInfo" style="margin-top: 5px;">{{ managelaundry.laundryName }} / {{ managelaundry.laundryAddr }}</div>
                        </v-card-text>
                    </v-col>
                    <v-col style="margin-top: 30px; margin-right: -35%;">
                        <v-btn icon="mdi-wrench" color="white" size="40" to="editmanagerprofile"></v-btn>
                    </v-col>
                </v-row>
                <v-divider class="mx-1 mb-1"></v-divider><br>
            </div>
            
            <v-container>
              <v-row>
                  <v-col cols="12">
                    <v-card color="#5E5A80" theme="dark">
                      <v-row style="margin-top: 1px ;">
                        <v-col xs3 style="margin-left: 20px;">
                            <v-card-subtitle>판매내역</v-card-subtitle>
                            <v-card-actions>
                              <v-btn class="text-h5" id="countHistory" style="margin-left: 2px;" color="white" to="managerhistory">
                                {{ historyCount }}
                              </v-btn>
                            </v-card-actions>
                        </v-col>
                        <v-divider vertical style="margin-left: -1%; margin-bottom: 30px; margin-right: 1%;"></v-divider>
                    
                        <v-col xs3>
                            <v-card-subtitle>리뷰확인</v-card-subtitle>
                            <v-card-actions>
                              <v-btn class="text-h5" id="countReview" style="margin-left: 2px;" color="white" to="checkreviewlist">
                                {{ reviewCount }}
                              </v-btn>
                            </v-card-actions>
                        </v-col>
                        <v-divider vertical style="margin-bottom: 30px; margin-left: -1%; margin-right: -2%;"></v-divider>
                    
                        <v-col xs3>
                            <v-card-subtitle style="margin-left: 10px;">Q&A</v-card-subtitle>
                            <v-card-actions>
                              <v-btn class="text-h5" id="countQnA" color="white" to="qna">2</v-btn>
                            </v-card-actions>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
        
                  <v-col cols="12">
                    <v-card class="card-hover" color="#5E5A80" theme="dark" to="mylaundry" style="color: white;">
                        <div class="d-flex flex-no-wrap justify-space-between"><div style="margin-left: 15px;">
                        <v-card-title class="text-h7" style="margin-top: 10px; margin-bottom: 5px;">내 세탁소</v-card-title>

                        <v-card-subtitle>
                            <div id="laundryName">{{ managelaundry.laundryName }}</div>
                            <div id="laundryAddr">{{ managelaundry.laundryAddr }}</div>
                        </v-card-subtitle>
                        
                        <v-row class="mx-0">
                            <v-rating :model-value=4.5 color="amber" density="compact" 
                                half-increments readonly size="small" style="margin-left: 15px; margin-top: 20px;"></v-rating>
                        </v-row>
                       </div>

                        <v-avatar class="ma-3" rounded="0" style="width: 50%; height: 140px;">
                            <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover
                                    style="margin-left: -10px;"></v-img>
                        </v-avatar>
                     </div>
                    </v-card>
                  </v-col>
                </v-row>

                    <v-card color="white" style="border-radius: 0%; margin-top: 15px; box-shadow: none;">
                        <v-divider class="mx-1 mb-1"></v-divider>
                        <v-card-title style="margin-bottom: 5px; font-size: 16px;">내 세탁소 정보</v-card-title>
                        <v-card-subtitle>
                            <div id="operatingHour">운영시간 : {{ managelaundry.openTime }} - {{ managelaundry.closeTime }}</div>
                            <div id="dayOff">공지사항 : {{ managelaundry.notice }}</div>
                            <div id="laundryNumber" style="margin-bottom: 15px;">전화번호 : {{ managelaundry.tel }}</div>
                        </v-card-subtitle>
                        <v-divider class="mx-1 mb-1"></v-divider>
                    </v-card>

                    <v-row style="margin-top: 1px;">
                      <v-col>
                        <v-card-actions style="margin-right: -22px;">
                            <v-btn style="width: 95%; background-color: #5E5A80; color: white; border-radius: 8px;" to="wwnotice">
                                공지사항
                            </v-btn>
                        </v-card-actions>
                      </v-col>
                      <v-col>
                        <v-card-actions style="margin-left: -22px;">
                            <v-btn variant="outlined" style="width: 95%; border-color: #5E5A80; border-radius: 8px;">
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
        managelaundrys: [],
        reviewCount: 0,
        historyCount: 0,
    }),
    async created() {
        try {
            const res = await axios.get('http://localhost:3005/managelaundrys');
            this.managelaundrys = res.data;
        } catch (e) {
            console.error(e);
        }
        //판매내역 수
        axios.get(`http://localhost:3012/requests`)
            .then(response => {
                const historyData = response.data;
                const filteredHistoryData = historyData.filter(item => item.status === '배송완료');
                const historyNum = filteredHistoryData.length;
                this.historyCount = historyNum;
        })
        //리뷰 수
        axios.get(`http://localhost:3006/reviews`)
            .then(response => {
                const reviewData = response.data;
                const reviewNum = reviewData.length;
                this.reviewCount = reviewNum;
        })
    }
}
</script>
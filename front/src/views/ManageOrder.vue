<!--주문관리-->
<!--서혜린-->

<template>
    <div class="manageorder">
        <div class="mx-auto my-5" style="margin-top: 15px; max-width: 500px;">
            <b>&nbsp;&nbsp;&nbsp;세탁물 요청</b>
        </div>
        <v-card class="mx-auto my-5" max-width="380" v-for="(request, index) in filteredRequests(-2)" v-bind:key="request.id" elevation="0" query="request.id">
            <div v-if="index === 0 || request.date !== requests[index - 1].date" style="margin-bottom: 5px;">
                <div id="date" style="margin-left: 10px; font-size: 14px;">
                    <b>{{ request.date }}</b>
                </div>
            </div>
            <v-card style="background-color: rgba(97, 151, 202, 0.874); color: white; border-radius: 10px; box-shadow: none;">
                <v-row style="margin-top: -19px; margin-bottom: -18px;">
                    <v-col><v-card-text id="userId" style="margin-top: 4px; font-size: 14px;">
                        <b>{{ request.userId }}&nbsp;&nbsp;|</b>
                    </v-card-text></v-col>
                    <v-col><v-card-text id="name" style="font-size: 14px; margin-left: -60px; margin-top: 4px;">
                        <b>&nbsp;&nbsp;&nbsp;{{ request.name }}</b>
                    </v-card-text></v-col>
                    <v-col style="margin-top: 3px;"><v-card-text id="requirement" style="margin-top: 5px; margin-left: -190px;">
                        &nbsp;<p>{{ request.requirement }}</p>
                    </v-card-text></v-col>
                    <v-card-actions style="margin-right: -10px;">
                      <v-btn id="accept" icon="mdi-check" variant="outlined" size="32px" style="border-radius: 15%;" @click="clickAccept(request.id)"></v-btn>
                    </v-card-actions>
                    <v-card-actions style="margin-right: -10px;">
                      <v-btn id="cancel" icon="mdi-close" variant="outlined" size="32px" style="border-radius: 15%;" @click="rejectRequest(request.id)"></v-btn>
                    </v-card-actions>
                    <v-card-actions style="margin-right: 17px;">
                      <v-btn id="moreInfo" icon="mdi-plus" variant="outlined" size="32px" style="border-radius: 15%;"></v-btn>
                    </v-card-actions>
                </v-row>
            </v-card>
        </v-card>
        <v-divider class="mx-1 mb-1" style="margin-top: 30px;"></v-divider>

        <div class="mx-auto my-5" style="margin-top: 15px; max-width: 380px;">
            <div id="beforeDelivery" style="margin-bottom: 10px;"><b>&nbsp;&nbsp;배송전</b></div>
            <v-card v-for="request in filteredRequests(-1)" :key="request.id" elevation="0">
                <v-card style="background-color: whitesmoke; border-radius: 10px; box-shadow: none; margin-bottom: 7px;"> <!--#5E5A80-->
                    <v-row style="margin-top: -19px; margin-bottom: -18px;">
                        <v-col><v-card-text id="userId" style="margin-top: 4px; font-size: 14px;">
                            <b>{{ request.userId }}&nbsp;&nbsp;|</b>
                        </v-card-text></v-col>
                        <v-col><v-card-text id="name" style="font-size: 14px; margin-left: -60px; margin-top: 4px;">
                            <b>&nbsp;&nbsp;&nbsp;{{ request.name }}</b>
                        </v-card-text></v-col>
                        <v-col style="margin-top: 3px;"><v-card-text id="requirement" style="margin-top: 5px; margin-left: -205px;">
                            &nbsp;<p>{{ request.requirement }}</p>
                        </v-card-text></v-col>
                        <v-card-actions style="margin-right: 20px;">
                          <v-btn id="start" variant="outlined" style="border-radius: 20px; font-size: 12px;" @click="clickStartDelivery(request.id)">배송시작</v-btn>
                        </v-card-actions>
                    </v-row>
                </v-card>
            </v-card>
        </div><v-divider class="mx-1 mb-1" style="margin-top: 30px;"></v-divider>

        <div class="mx-auto my-5" style="margin-top: 15px; max-width: 380px;">
            <div id="onDelivery" style="margin-bottom: 10px;"><b>&nbsp;&nbsp;배송중</b></div>
            <v-card v-for="request in filteredRequests(1)" :key="request.id" elevation="0">
                <v-card style="background-color: whitesmoke; border-radius: 10px; box-shadow: none; margin-bottom: 7px;">
                    <v-row style="margin-top: -19px; margin-bottom: -18px;">
                        <v-col><v-card-text id="userId" style="margin-top: 4px; font-size: 14px;">
                            <b>{{ request.userId }}&nbsp;&nbsp;|</b>
                        </v-card-text></v-col>
                        <v-col><v-card-text id="name" style="font-size: 14px; margin-left: -60px; margin-top: 4px;">
                            <b>&nbsp;&nbsp;&nbsp;{{ request.name }}</b>
                        </v-card-text></v-col>
                        <v-col style="margin-top: 3px;"><v-card-text id="requirement" style="margin-top: 5px; margin-left: -200px;">
                            &nbsp;<p>{{ request.requirement }}</p>
                        </v-card-text></v-col>
                        <v-card-actions style="margin-right: 20px;">
                          <v-btn id="complete" variant="outlined" style="border-radius: 20px; font-size: 12px;" @click="clickCompleteDelivery(request.id)">배송완료</v-btn>
                        </v-card-actions>
                    </v-row>
                </v-card>
            </v-card>
        </div><v-divider class="mx-1 mb-1" style="margin-top: 30px;"></v-divider>

        <div class="mx-auto my-5" style="margin-top: 15px; max-width: 380px;">
            <div id="completeDelivery" style="margin-bottom: 10px;"><b>&nbsp;&nbsp;배송완료</b></div>
            <v-card v-for="request in filteredRequests(2)" :key="request.id" elevation="0">
                <v-card style="background-color: whitesmoke; border-radius: 10px; box-shadow: none; margin-bottom: 7px;">
                    <v-row style="margin-top: -19px; margin-bottom: -18px;">
                        <v-col><v-card-text id="userId" style="margin-top: 4px; font-size: 14px;">
                            <b>{{ request.userId }}&nbsp;&nbsp;|</b>
                        </v-card-text></v-col>
                        <v-col><v-card-text id="name" style="font-size: 14px; margin-left: -60px; margin-top: 4px;">
                            <b>&nbsp;&nbsp;&nbsp;{{ request.name }}</b>
                        </v-card-text></v-col>
                        <v-col style="margin-top: 3px;"><v-card-text id="requirement" style="margin-top: 5px; margin-left: -207px;">
                            &nbsp;<p>{{ request.requirement }}</p>
                        </v-card-text></v-col>
                        <v-card-actions style="margin-right: 20px;">
                            <v-btn id="delete" variant="outlined" style="border-radius: 20px; font-size: 12px;" @click="clickDelete(request.id)">삭제</v-btn>
                        </v-card-actions>
                    </v-row>
                </v-card>
            </v-card>
        </div>
    </div>
</template>

<script>
import axios from "axios";
// import { Script } from "vm";

export default {
    data: () => ({
        show: false,
        managelaundrys: [],
        requests: [],
        beforeShipping: [],
        one: [],
        two: [],
        thr: [],
        fou: [],
    }),
    async created() {

  try {
    // const laundryId = 1; // 세탁소 아이디

    // 주문 완료 내역 가져오기
    const res = await axios.get(`http://localhost:4000/history`);

    console.log(res);

    // delivery_state 값에 따라 배열로 분류
    const one = [];
    const two = [];
    const thr = [];
    const fou = [];

    res.data.forEach(order => {
      if (order.delivery_state === -2) {
        one.push(order);
      } else if (order.delivery_state === -1) {
        two.push(order);
      } else if (order.delivery_state === 1) {
        thr.push(order);
      } else if (order.delivery_state === 2) {
        fou.push(order);
      }
    });

    // 분류된 배열 사용 예시
    console.log(one);
    console.log(two);
    console.log(thr);
    console.log(fou);

    // 분류된 배열을 컴포넌트의 데이터로 할당하거나 처리할 수 있습니다.
    this.one = one;
    this.two = two;
    this.thr = thr;
    this.fou = fou;
  } catch (error) {
    console.error(error);

}
},

};
  </script>
<!--사용자 이용내역-->

<template>
    <div class="wrapper px-3">

        <v-card class="mx-auto my-5" max-width="500" elevation="0">
            <v-card>
                <v-tabs v-model="tab" stacked grow>
                    <v-tab value="one">현재 진행사항</v-tab>
                    <v-tab value="two">지난 이용내역</v-tab>
                </v-tabs>

                <v-card-text>
                    <v-window v-model="tab">
                        <v-window-item value="one">
                            One
                        </v-window-item>

                        <v-window-item value="two">
                            <div v-for="(h, index) in historys" v-bind:key="h.id">
                                <div v-if="index === 0 || h.date !== historys[index - 1].date">
                                    <div class="date" id="date">
                                        <b>{{ h.date }}</b>
                                    </div>
                                </div>
                                <v-card v-bind:key="h.id" elevation="0">
                                    <div class="washingStatus">
                                        <!-- <v-img id="washingImg" :src="h.washingImg" cover></v-img> -->
                                        <v-card-text>
                                            <div id="name">
                                                품&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;목&nbsp;&nbsp;|&nbsp;&nbsp;{{ h.name }}
                                                &nbsp;&nbsp;∙&nbsp;<a class="delivery">{{ h.delivery }}</a>
                                            </div>
                                            <div id="cost">세탁비용&nbsp;|&nbsp;&nbsp;{{ h.cost }}</div>
                                            <div id="requirement">요청사항&nbsp;|&nbsp;&nbsp;{{ h.requirement }}</div>
                                            <v-divider id="divisionLine2"></v-divider>
                                            <a id="laundryName">{{ h.laundryName }}</a>&nbsp;
                                            <v-btn id="reviewBtn" v-bind:to="`/addreview/${h.id}`">리뷰</v-btn>
                                        </v-card-text>
                                    </div>
                                </v-card>
                            </div>
                        </v-window-item>
                    </v-window>
                </v-card-text>
            </v-card>


            <br>
        </v-card>
    </div>
</template>

<style>
.myWashing {
    margin-top: 20px;
    font-size: 18px;
    text-align: center;
}

#divisionLine {
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 20px;
    margin-bottom: 10px;
}

#divisionLine2 {
    width: 70%;
    margin-left: 95px;
    margin-top: 10px;
    margin-bottom: 5px;
}

.date {
    margin-top: 40px;
    margin-left: 4%;
    font-size: 15px;
}

.washingStatus {
    height: 141px;
    border-radius: 13px;
    font-size: smaller;
    background-color: white;
    border: 1px solid gainsboro;
    font-display: center;
    margin-bottom: 5px;
    margin-top: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: auto;
}

#name {
    margin-bottom: 3px;
}

#cost {
    margin-bottom: 3px;
}

#requirement {
    margin-bottom: 3px;
}

#laundryName {
    margin-left: 4px;
}

#reviewBtn {
    width: 10px;
    height: 24px;
    background-color: #5E5A80;
    color: white;
    border-radius: 10px;
    margin-top: 1px;
    box-shadow: none;
}

.delivery {
    color: red;
    text-decoration-line: none;
}

#washingImg {
    width: 85px;
    height: 100px;
    float: left;
    margin-left: 15px;
    margin-top: 19px;
    margin-right: 17px;
    border-radius: 5px;
}
</style>

<script>
import axios from "axios";
export default {
    data: () => ({
        tab: null,
        show: false,
        historys: [],
    }),
    async created() {
        try {
            const res = await axios.get('http://localhost:5000/historys');
            this.historys = res.data;
        } catch (e) {
            console.error(e);
        }
    }
}
</script>
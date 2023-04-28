<!-- 리뷰리스트 --> <!--내가 쓴 리뷰들-->

<template>
    <div class="wrapper">
        <div class="content">
            <!-- <v-carousel cycle height="10" hide-delimiter-background show-arrows="hover"></v-carousel> -->
            <div class="myWashing">
                <b>내가 쓴 리뷰</b>
            </div>
            <hr id="divisionLine">

            <div v-for="(h, index) in historys" v-bind:key="h.id">
                <div v-if="index === 0 || h.date !== historys[index - 1].date">
                    <div class="date" id="date">
                        <b>{{ h.date }}</b>
                    </div>
                </div>
                <v-card v-bind:key="h.id" elevation="0">
                    <div class="washingStatus">
                        <v-img id="washingImg" :src="h.washingImg" cover></v-img>
                        <v-card-text>
                            <div id="name">
                                품&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;목&nbsp;&nbsp;|&nbsp;&nbsp;{{ h.name }}
                            </div>
                            <v-divider id="divisionLine2"></v-divider>
                            <a id="laundryName">{{ h.laundryName }}</a>&nbsp;
                            <div>
                                배송이 빠르고 친절하세요
                            </div>
                        </v-card-text>
                    </div>
                </v-card>
            </div>
            <br>
        </div>
    </div>
</template>

<style scoped>
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
    display: flex;
    align-items: center;
    margin-top: 40px;
    margin-left: 585px;
    font-size: 15px;
}

.washingStatus {
    height: 300px;
    border-radius: 13px;
    font-size: smaller;
    background-color: white;
    border: 1px solid gainsboro;
    font-display: center;
    margin-left: 5%;
    margin-right: 5%;
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
    background-color: gainsboro;
    border-radius: 10px;
    margin-top: 1px;
    box-shadow: none;
}

#washingImg {
    width: 185px;
    height: 230px;
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
        show: false,
        historys: []
    }),
    async created() {
        try {
            const res = await axios.get('http://localhost:3002/historys');
            this.historys = res.data;
        } catch (e) {
            console.error(e);
        }
    }
}
</script>
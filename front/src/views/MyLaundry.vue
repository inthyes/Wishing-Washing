<!--내 세탁소 (마이페이지 하위)-->
<!--서혜린-->

<template>
    <div id="laund-list">
        <v-card class="mx-auto my-5" max-width="500" v-for="managelaundry in managelaundrys" :key="managelaundry.id" elevation="0">
            <v-img class="align-end text-white" id="laund-img" :src= "require(`@/plugins/${managelaundry.image}`)">
                <v-card-title id="laund-title">{{ managelaundry.laundryName }}</v-card-title>
            </v-img>
            <v-card-subtitle class="pt-3" id="laund-sub-title">tel. {{ managelaundry.tel }}</v-card-subtitle>
            <v-card-text>
                <div id="laund-address"><a style="color: darkgray;">주소</a>&nbsp;&nbsp;&nbsp;{{ managelaundry.laundryAddr }}</div>
                <div id="laund-info"><a style="color: darkgray;">소개</a>&nbsp;&nbsp;&nbsp;{{ managelaundry.intro }}</div>
                <div id="laund-info"><a style="color: darkgray;">운영</a>&nbsp;&nbsp;&nbsp;{{ managelaundry.openTime }} - {{ managelaundry.closeTime }}</div>
                <div id="laund-notice"><a style="color: darkgray;">공지</a>&nbsp;&nbsp;&nbsp;{{ managelaundry.notice }}</div>
            </v-card-text>

            <!--<v-row class="mx-0" style="margin-top: -35px;">
                <v-rating :model-value=mylaundry.stars color="amber" density="compact" 
                    half-increments readonly size="small" style="margin-left: 15px; margin-top: 20px;"></v-rating>
            </v-row>-->

            <v-divider class="mx-1 mb-1" style="margin-top: 5px;"></v-divider>
        </v-card>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data: () => ({
        show: false,
        managelaundrys: []
    }),
    async created() {
        try {
            const res = await axios.get('http://localhost:5001/managelaundrys');
            this.managelaundrys = res.data.filter((laundry) => laundry.id === 1);
            //this.managelaundrys = res.data;
        } catch (e) {
            console.error(e);
        }
    }
}
</script>
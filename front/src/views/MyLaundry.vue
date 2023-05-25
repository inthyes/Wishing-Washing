<!--내 세탁소 (마이페이지 하위)-->
<!--서혜린-->

<template>
    <div id="laund-list" class="px-5">
        <v-card class="mx-auto my-5" max-width="400" v-for="managelaundry in managelaundrys" :key="managelaundry.id" elevation="0">
            <v-img class="align-end text-white" id="laundryImg" :src="imageUrl" cover></v-img>

                <v-card-title id="laund-title">{{ managelaundry.laundryName }}</v-card-title>
            
            <v-card-subtitle class="pt-3" id="laund-sub-title">tel. {{ managelaundry.tel }}</v-card-subtitle>
            <v-card-text>

                <div id="laund-address"><a style="color: darkgray;">우편번호</a>&nbsp;&nbsp;&nbsp;{{ managelaundry.laundryAddr1 }} </div>
                <div id="laund-address"><a style="color: darkgray;">주소</a>&nbsp;&nbsp;&nbsp;{{ managelaundry.laundryAddr2 }} {{ managelaundry.laundryAddr3 }}</div>
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
        show: false,
        managelaundrys: [],
        imageUrl: null,
    }),
    async created() {
        try {
            
            const res = await axios.get('http://localhost:4000/laundry/laundryAdmin');
            const resData = res.data[0];
            const managelaundry = {
            id: resData.S_ID,
            laundryName: resData.S_NAME,
            laundryAddr1: resData.S_ADDR1,
            laundryAddr2: resData.S_ADDR2,
            laundryAddr3: resData.S_ADDR3,
            intro: resData.S_COMMENT,
            openTime: resData.S_OPENING,
            closeTime: resData.S_CLOSING,
            notice: resData.S_ANNOUNCE,
            };

      this.managelaundrys.push(managelaundry);

            await this.getImageUrl();

        } catch (e) {
            console.error(e);
        }
    },

    methods: { 

       async getImageUrl() {
  try {
    const res = await axios.get(`http://localhost:4000/upload/laundryImg`);
    console.log(res);

    const image = res.data[0];
        const base64 = arrayBufferToBase64(image.s_image.data);
        console.log(base64);
        this.imageUrl = `data:image/png;base64,${base64}`; // 이미지 URL 저장
        console.log(this.imageUrl);

   
  } catch (error) {
    console.error(error);
  }
   },
}
};
</script>
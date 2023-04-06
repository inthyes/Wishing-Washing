<!--세탁 신청-->
<template>
    <div id="lund-list">
        <v-card class="mx-5 my-5">
            <v-img class="align-end text-white" height="150" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
                <v-card-title>@@ 세탁소</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-3">세탁소 서브 타이틀</v-card-subtitle>

            <v-card-text>
                <div>경기 성남시 분당구 불정로 6 그린팩토리</div>
                <div>간단한 세탁소 정보</div>
            </v-card-text>

            <v-card-actions>
                <v-btn color="orange">찜하기</v-btn>
                <v-btn color="orange">세탁신청</v-btn>
            </v-card-actions>
        </v-card>
    </div>

    <div id="lund-list">
        <v-card class="mx-5 my-5" color="white" theme="dark">
            <div class="d-flex flex-no-wrap align-items-center">
                <div class="ms-3">
                    <v-avatar class="ma-3" size="120" rounded="0">
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img>
                    </v-avatar>
                </div>

                <div class="ms-3">
                    <v-card-title class="text">@@ 세탁소</v-card-title>

                    <v-card-subtitle>세탁소 서브 타이틀</v-card-subtitle>

                    <v-card-text>
                        <div>경기 성남시 분당구 불정로 6 그린팩토리</div>
                        <div>간단한 세탁소 정보</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn class="ms-2" variant="outlined" size="small">세탁 신청</v-btn>
                    </v-card-actions>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
        show: false,

    }),
}
</script>
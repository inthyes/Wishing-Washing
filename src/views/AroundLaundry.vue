<!-- 주변 세탁소 -->

<template>
    <div id="laund-list">
        <v-card class="mx-auto my-5" max-width="500">
            <v-img class="align-end text-white" id="laund-img" height="150"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
                <v-card-title id="laund-title">@@ 세탁소</v-card-title>
            </v-img>

            <v-card-subtitle class="pt-3" id="laund-sub-title">세탁소 서브 타이틀</v-card-subtitle>

            <v-card-text>
                <div id="laund-address">경기 성남시 분당구 불정로 6 그린팩토리</div>
                <div id="laund-info">간단한 세탁소 정보</div>
            </v-card-text>

            <v-card-actions>
                <v-btn color="orange">찜하기</v-btn>
                <v-btn color="orange" to="/laundrydetail">상세정보</v-btn>

            </v-card-actions>
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
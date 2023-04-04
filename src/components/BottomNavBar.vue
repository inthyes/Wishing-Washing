<template>
    <v-layout class="overflow-visible" style="height: 56px;">
        <v-bottom-navigation v-model="value" color="teal" mode="shift">
            <v-btn>
                <v-icon>mdi-heart</v-icon>

                홈
            </v-btn>

            <v-btn>
                <v-icon>mdi-heart</v-icon>

                세탁신청
            </v-btn>

            <v-btn>
                <v-icon>mdi-heart</v-icon>

                이용내역
            </v-btn>

            <v-btn>
                <v-icon>mdi-heart</v-icon>

                MyPage
            </v-btn>
        </v-bottom-navigation>
    </v-layout>
</template>

<script>
export default {
    data: () => ({ value: 1 }),
}
</script>
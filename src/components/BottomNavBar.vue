<template>
    <v-layout class="overflow-visible" style="height: 60px;">
        <v-bottom-navigation v-model="value" color="teal" mode="shift">
            <v-btn>
                <v-icon>mdi-home</v-icon>
                <router-link to="/">
                    <span>홈</span>
                </router-link>
            </v-btn>

            <v-btn>
                <v-icon>mdi-washing-machine</v-icon>
                <router-link to="/laundarylist">
                    <span>세탁신청</span>
                </router-link>
            </v-btn>

            <v-btn>
                <v-icon>mdi-format-list-bulleted</v-icon>
                <router-link to="/usagehistory">
                    <span>이용내역</span>
                </router-link>
            </v-btn>

            <v-btn>
                <v-icon>mdi-account-outline</v-icon>
                <router-link to="/mypage">
                    <span>마이페이지</span>
                </router-link>
            </v-btn>
        </v-bottom-navigation>
    </v-layout>
</template>

<script>
export default {
    data: () => ({ value: null }),
}
</script>

<style scoped>
a {text-decoration:none; color:black}
</style>
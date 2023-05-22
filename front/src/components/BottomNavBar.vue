<template>
        <v-bottom-navigation class="bt-navbar" v-model="value" height="70" color="light-blue-darken-4" mode="shift" grow>
            <v-btn router-link to="/" class="nav-btn">
                <v-icon>mdi-home</v-icon>
                    <span>&nbsp;&nbsp;HOME&nbsp;&nbsp;</span>
            </v-btn>

            <v-btn to="/aroundlaundry" class="nav-btn">
                <v-icon>mdi-washing-machine</v-icon>
                    <span>주변세탁소</span>
            </v-btn>

            <v-btn to="/usagehistory" class="nav-btn">
                <v-icon>mdi-format-list-bulleted</v-icon>
                    <span>이용내역</span>
            </v-btn>

            <v-btn to="/mypage2" class="nav-btn">
                <v-icon>mdi-account-outline</v-icon>
                    <span>&nbsp;&nbsp;&nbsp;MY&nbsp;&nbsp;&nbsp;</span>
            </v-btn>
        </v-bottom-navigation>
</template>

<script>
export default {
    data: () => ({ value: null }),
}
</script>

<style scoped>
.bt-navbar {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
/* .nav-btn {
    width: (100% / 4);
    padding-inline: 0;
} */
</style>
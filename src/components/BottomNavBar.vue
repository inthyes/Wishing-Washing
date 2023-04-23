<template>
        <v-bottom-navigation v-model="value" color="teal" mode="shift" >
            <v-btn router-link to="/">
                <v-icon>mdi-home</v-icon>
                    <span>HOME</span>
            </v-btn>

            <v-btn to="/aroundlaundry">
                <v-icon>mdi-washing-machine</v-icon>
                    <span>주변세탁소</span>
            </v-btn>

            <v-btn to="/usagehistory">
                <v-icon>mdi-format-list-bulleted</v-icon>
                    <span>이용내역</span>
            </v-btn>

            <v-btn to="/mypage">
                <v-icon>mdi-account-outline</v-icon>
                    <span>MY</span>
            </v-btn>
        </v-bottom-navigation>
</template>

<script>
export default {
    data: () => ({ value: null }),
}
</script>
<!-- 
<style scoped>
/* Add custom styles to adjust spacing */
.v-btn {
    margin: 0;
    padding: 0;
    /* Add any other custom styles as needed */
}
</style> -->
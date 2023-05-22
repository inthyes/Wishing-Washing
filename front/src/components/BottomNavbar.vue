<template>

    <v-bottom-navigation class="bt-navbar" v-model="value" height="70" color="light-blue-darken-4" mode="shift" grow>

        <v-btn router-link to="/">
            <v-icon>mdi-home</v-icon>
            <span>&nbsp;&nbsp;HOME&nbsp;&nbsp;</span>
        </v-btn>

        <v-btn to="managemylaundry">
            <v-icon>mdi-washing-machine</v-icon>
            <span>내세탁소</span>
        </v-btn>

        <v-btn to="manageorder">
            <v-icon>mdi-format-list-bulleted</v-icon>
            <span>주문관리</span>
        </v-btn>

        <v-btn to="managermypage">
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

.nav-btn {
    width: (100% / 4);
    padding-inline: 0;
}
</style>


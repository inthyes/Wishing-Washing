<template>
    <v-container>
        <div class="QnA">
            <h3 class="blue--text text--darken-4">자주 묻는 질문들</h3>
        </div>
        <hr id="div_line" />
        <br />
        <v-row>
            <v-col :cols="cardCols" v-for="notice in notices" :key="notice.id">
                <v-card class="elevation-2 mb-6">
                    <v-card-title class="d-flex justify-space-between align-center">
                        <span>{{ notice.title }}</span>
                        <v-icon v-if="!notice.isExpanded" @click="expand(notice)" class="mdi mdi-menu-down"></v-icon>
                        <v-icon v-if="notice.isExpanded" @click="collapse(notice)" class="mdi mdi-menu-up"></v-icon>
                    </v-card-title>
                    <v-card-text v-if="notice.isExpanded">{{ notice.content }}</v-card-text>
                    <v-card-subtitle class="text-caption">{{ notice.date }}</v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            notices: [
                {
                    id: 1,
                    title: "고객센터 번호 알고싶어요.",
                    content: "000-0000입니다. 감사합니다.",
                    date: "2023-04-25",
                    isExpanded: false,
                },
                {
                    id: 2,
                    title: "리뷰 언제까지 쓸 수 있나요?",
                    content: "배송 후 일주일 내로 가능합니다.",
                    date: "2023-04-24",
                    isExpanded: false,
                },
            ],
            windowWidth: 0,
        };
    },
    methods: {
        expand(notice) {
            notice.isExpanded = true;
        },
        collapse(notice) {
            notice.isExpanded = false;
        },
        updateWindowWidth() {
            this.windowWidth = window.innerWidth;
        },
    },
    mounted() {
        window.addEventListener("resize", this.updateWindowWidth);
        this.updateWindowWidth();
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.updateWindowWidth);
    },
    computed: {
        cardCols() {
            if (this.windowWidth < 960) {
                return 12;
            } else {
                return 6;
            }
        },
    },
};
</script>

<style scoped>
.QnA {
    text-align: center;
}

.v-card-title {
    font-size: 1.5rem;
}

@media only screen and (max-width: 959px) {
    .v-card {
        max-width: 100% !important;
    }
}
</style>
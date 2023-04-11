<template>
    <h1>세탁신청</h1>
    <v-card class="mx-auto my-5" max-width="500" prepend-icon="mdi-calendar">
        <template v-slot:title>
            날짜선택
        </template>

        <v-card-item>
            <div class="scrollable">
                <v-row no-gutters>
                    <v-col cols="12">
                        <div class="d-flex flex-row">
                            <v-col cols="auto">
                                <!--현재 날짜로부터 2주간의 날짜만 나타낸다-->
                                <v-btn height="60" width="50" v-for="(date, index) in getDateRange(14)" :key="index"
                                    rounded>
                                    <div v-html="formatDate(date)"></div>
                                </v-btn>
                            </v-col>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-card-item>
    </v-card>
</template>

<script>
export default {
    data() {
        const options = { weekday: 'long', day: 'numeric' };
        return { options };
    },
    methods: {
        formatDate(date) {
            const parts = date.toLocaleDateString(undefined, this.options).split(' ');
            return `${parts[1].slice(0, 1)}<br>${parts[0].replace(/\D/g, '')}`;    // parts[1]: 요일, parts[0]: 날짜
        },
        getDateRange(numDays) {
            const dates = [];
            for (let i = 0; i < numDays; i++) {
                const date = new Date();
                date.setDate(date.getDate() + i);
                dates.push(date);
            }
            return dates;
        },
    },
};
</script>
<style scoped>
.scrollable {
    overflow-x: auto;
    white-space: nowrap;
}

.scrollable::-webkit-scrollbar {
    width: 0em;
    height: 0em;
}
</style>
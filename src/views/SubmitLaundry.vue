<template>
    <v-card class="mx-auto my-5" max-width="450">
        <v-card-title>날짜선택</v-card-title>

        <v-card-item>
            <div class="scrollable">

                <!--현재 날짜로부터 2주간의 날짜만 나타낸다-->
                <v-btn height="70" width="50" v-for="(date, index) in getDateRange(14)" :key="index" rounded>
                    <div v-html="formatDate(date)"></div>
                </v-btn>

            </div>
        </v-card-item>

                <v-divider class="mx-4 mb-1"></v-divider>

                
        <v-card-title>시간선택</v-card-title>
        <div class="px-4">
            <v-chip-group v-model="selection">
                <v-chip>5:30PM</v-chip>

                <v-chip>7:30PM</v-chip>

                <v-chip>8:00PM</v-chip>

                <v-chip>9:00PM</v-chip>
            </v-chip-group>
        </div>
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
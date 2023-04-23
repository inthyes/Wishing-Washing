<template>
    <v-card class="mx-auto my-5" max-width="450">

        <v-divider class="mx-4 mb-1"></v-divider>

        <v-card-title>날짜선택</v-card-title>

        <v-sheet class="mx-auto" max-width="600">
            <v-slide-group show-arrows>
                <v-slide-group-item v-for="(date, index) in getDateRange(14)" :key="index" v-slot="{ isSelected }">
                    <v-btn class="ma-2" :color="isSelected ? 'primary' : undefined" rounded @click="toggle(index)">
                        <div v-html="formatDate(date)"></div>
                    </v-btn>
                </v-slide-group-item>
            </v-slide-group>
        </v-sheet>
    </v-card>


    <v-card class="mx-auto my-5" max-width="450">

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
        return { options, selectedDate: null };
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
        toggle(index) {
            this.selectedDate = index;
        },
    },
    computed: {
        selectedDateString() {
            if (this.selectedDate !== null) {
                const selectedDate = this.getDateRange(14)[this.selectedDate];
                return selectedDate.toLocaleDateString(undefined, this.options);
            }
            return '';
        },
    },
};
</script>

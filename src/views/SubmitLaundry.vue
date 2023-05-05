<template>
    <v-container>
        <v-card class="pa-4 mx-auto" max-width="400">
            <v-form @submit.prevent="submit">
                <v-row>
                    <v-col cols="12">
                        <p class="mb-4">주문상품</p>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col cols="12">
                        <p class="mb-4">날짜 선택</p>
                        <v-slide-group> <!-- show-arrows -->
                            <v-slide-group-item v-for="(date, index) in getDateRange(14)" :key="index"
                                v-slot="{ isSelected }">
                                <v-btn class="ma-0" :color="isSelected ? 'primary' : undefined" rounded
                                    @click="toggle(index)" elevation="0">
                                    <div v-html="formatDate(date)"></div>
                                </v-btn>
                            </v-slide-group-item>
                        </v-slide-group>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col cols="12">
                        <p class="mb-4">시간 선택</p>
                        <v-chip-group v-model="selection">
                            <v-chip>5:30</v-chip>
                            <v-chip>7:30</v-chip>
                            <v-chip>8:00</v-chip>
                            <v-chip>9:00</v-chip>
                            <v-chip>10:00</v-chip>
                        </v-chip-group>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row>
                    <v-col cols="12">
                        <!-- <p class="mb-4">요청사항</p> -->
                        <v-textarea label="요청사항" variant="outlined"></v-textarea>
                    </v-col>
                </v-row>
                <v-divider></v-divider>


                <v-btn type="submit" color="primary" class="mt-4">신청하기</v-btn>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        const options = { weekday: 'long', day: 'numeric' };
        return {
            options,
            selectedDate: null,
        };

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
        // submit() {
        //     const laundryRequest = {
        //         date: this.selectedDate,
        //         time: this.selectedTime,
        //         clothes: this.selectedClothes,
        //         items: this.selectedItems
        //     }
        //     console.log(laundryRequest) // Replace with your own logic to handle the laundry request
        //     // Clear form inputs
        //     this.selectedDate = ''
        //     this.selectedTime = ''
        //     this.selectedClothes = 'Shirt'
        //     this.selectedItems = 1
        // }
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

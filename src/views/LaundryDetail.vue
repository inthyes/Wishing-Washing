<!--개별 세탁소-->
<template>
    <v-card :loading="loading" class="mx-auto my-5" max-width="500">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
        </template>

        <v-img cover height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

        <v-card-item>
            <v-card-title>@@ 세탁소</v-card-title>

            <v-card-subtitle>
                <span class="me-1">세탁소 서브 타이틀</span>

                <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
            </v-card-subtitle>
        </v-card-item>

        <v-card-text>
            <v-row align="center" class="mx-0">
                <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly
                    size="small"></v-rating>

                <div class="text-grey ms-4">
                    4.5 (413)
                </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
                세탁소 주소
            </div>

            <div>간단한 세탁소 정보</div>
        </v-card-text>

        <v-divider class="mx-4 mb-1"></v-divider>

        <v-card-title>예약하기</v-card-title>

        <div class="px-4">
            <v-chip-group v-model="selection">
                <v-chip>5:30PM</v-chip>

                <v-chip>7:30PM</v-chip>

                <v-chip>8:00PM</v-chip>

                <v-chip>9:00PM</v-chip>
            </v-chip-group>
        </div>

        <v-card-actions>
            <v-btn to="/submitlaundry" color="deep-purple-lighten-2" variant="text" @click="reserve">
                세탁신청
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        loading: false,
        selection: 1,
    }),

    methods: {
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
    },
}
</script>
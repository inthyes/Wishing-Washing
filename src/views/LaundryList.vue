<!--세탁 신청-->
<template>
    <v-card class="mx-auto" max-width="400">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" cover></v-img>

        <v-card-title>
            Top western road trips
        </v-card-title>

        <v-card-subtitle>
            1,000 miles of wonder
        </v-card-subtitle>

        <v-card-actions>
            <v-btn color="orange-lighten-2" variant="text">
                Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                    I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
                    sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey,
                    you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way
                    to escape.
                </v-card-text>
            </div>
        </v-expand-transition>
    </v-card>

    <v-card class="mx-auto" max-width="400">
        <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
            <v-card-title>Top 10 Australian beaches</v-card-title>
        </v-img>

        <v-card-subtitle class="pt-4">
            Number 10
        </v-card-subtitle>

        <v-card-text>
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
        </v-card-text>

        <v-card-actions>
            <v-btn color="orange">
                Share
            </v-btn>

            <v-btn color="orange">
                Explore
            </v-btn>
        </v-card-actions>
    </v-card>

    <v-card :loading="loading" class="mx-auto my-12" max-width="400">
        <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
        </template>

        <v-img cover height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

        <v-card-item>
            <v-card-title>Cafe Badilico</v-card-title>

            <v-card-subtitle>
                <span class="me-1">Local Favorite</span>

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
                $ • Italian, Cafe
            </div>

            <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
        </v-card-text>

        <v-divider class="mx-4 mb-1"></v-divider>

        <v-card-title>Tonight's availability</v-card-title>

        <div class="px-4">
            <v-chip-group v-model="selection">
                <v-chip>5:30PM</v-chip>

                <v-chip>7:30PM</v-chip>

                <v-chip>8:00PM</v-chip>

                <v-chip>9:00PM</v-chip>
            </v-chip-group>
        </div>

        <v-card-actions>
            <v-btn color="deep-purple-lighten-2" variant="text" @click="reserve">
                Reserve
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        show: false,
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
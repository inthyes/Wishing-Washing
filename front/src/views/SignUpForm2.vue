<template>
    <v-card class="mx-auto" max-width="500" elevation="0">
        <v-container>
            <v-card-title class="text-h6 font-weight-regular justify-space-between">
                <v-avatar color="success" size="20" v-text="step"></v-avatar>

                <span>{{ currentTitle }}</span>
            </v-card-title>

            <v-window v-model="step">
                <v-window-item :value="1">
                    <v-card-text>
                        <v-text-field label="Email" placeholder="john@google.com"></v-text-field>
                        <span class="text-caption text-grey-darken-1">
                            This is the email you will use to login to your Vuetify account
                        </span>
                    </v-card-text>
                </v-window-item>

                <v-window-item :value="2">
                    <v-card-text>
                        <v-text-field label="Password" type="password"></v-text-field>
                        <v-text-field label="Confirm Password" type="password"></v-text-field>
                        <span class="text-caption text-grey-darken-1">
                            Please enter a password for your account
                        </span>
                    </v-card-text>
                </v-window-item>

                <v-window-item :value="3">
                    <div class="pa-4 text-center">
                        <v-img class="mb-4" contain height="128" src="https://cdn.vuetifyjs.com/images/logos/v.svg"></v-img>
                        <h3 class="text-h6 font-weight-light mb-2">
                            Welcome to Vuetify
                        </h3>
                        <span class="text-caption text-grey">Thanks for signing up!</span>
                    </div>
                </v-window-item>
            </v-window>

            <v-divider></v-divider>

            <v-card-actions>
                <v-btn v-if="step > 1" variant="text" @click="step--">
                    Back
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn v-if="step < 3" color="success" variant="flat" @click="step++">
                    Next
                </v-btn>
            </v-card-actions>
        </v-container>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        step: 1,
    }),

    computed: {
        currentTitle() {
            switch (this.step) {
                case 1: return '계정 생성'
                case 2: return '비밀번호 설정'
                default: return 'Account created'
            }
        },
    },
}
</script>
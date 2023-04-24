<!--Q&A-->

<template>
    <div class="wwnotice" style="margin-top: -13px;">
        <v-carousel cycle height="10" hide-delimiter-background show-arrows="hover"></v-carousel>
        <div class="myWashing">
            <b>자주 묻는 질문들</b>
        </div>
        <hr id="divisionLine">
        <v-card class="mx-auto my-5" max-width="500" flat>
            <v-row>
                <v-col style="height: 80px;">
                    <v-card-actions>
                        <v-btn class="notice"
                            style="width: 210px; font-size: medium; margin-left: 1px; margin-bottom: -20px;" to="QnA_1.vue">
                            <b>질문 1</b>
                        </v-btn>
                    </v-card-actions>
                    <div id="recordDate" style="margin-left: 5px;">2023.04.24</div>
                </v-col>
                <v-divider class="mx-1 mb-1"></v-divider>
                <v-col style="height: 80px;">
                    <v-card-actions>
                        <v-btn class="notice"
                            style="width: 210px; font-size: medium; margin-left: -39px; margin-top: -21px;" to="QnA_2.vue">
                            <b>질문 2</b>
                        </v-btn>
                    </v-card-actions>
                    <div id="recordDate" style="margin-left: 2px; margin-top: -20px;">2023.04.24</div>
                </v-col>
            </v-row>
            <v-divider class="mx-1 mb-1"></v-divider>
        </v-card>
    </div>
</template>

<style>
.notice:hover {
    background-color: none;
    color: black;
}
</style>

<!--공지사항-->

<template>
    <div class="wwnotice" style="margin-top: -13px;">
        <v-card class="mx-auto my-5" max-width="500" flat>
            <v-row>
              <v-col style="height: 80px;">
                <v-card-actions>
                    <v-btn class="notice" style="font-size: medium;" to="noticedetail1">
                        <b>서비스 이용약관 개정 안내</b>
                    </v-btn>
                </v-card-actions>
                <div id="recordDate" style="margin-left: 17px; margin-top: -7px;">2023.03.29</div>
              </v-col>
              <v-divider class="mx-1 mb-1" style="margin-top: 20px;"></v-divider>

              <v-col style="height: 80px; margin-top: -10px;">
                <v-card-actions>
                    <v-btn class="notice" style="font-size: medium;" to="noticedetail2">
                        <b>리뷰 정책 안내</b>
                    </v-btn>
                </v-card-actions>
                <div id="recordDate" style="margin-left: 17px; margin-top: -7px;">2023.02.01</div>
              </v-col>
              <v-divider class="mx-1 mb-1" style="margin-top: 20px;"></v-divider> <br>
            </v-row>
        </v-card>
    </div>
</template>

<style>
.notice:hover {
    background-color: none;
    color: black;
}
</style>
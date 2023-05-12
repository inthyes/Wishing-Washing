<!--공지사항-->
<!--서혜린-->

<template>
    <div class="wwnotice" style="margin-top: -13px;">
        <v-card class="mx-auto my-5" max-width="500" flat>
            <v-row>
              <v-col style="height: 80px;">
                <v-card-actions>
                    <v-btn class="notice" style="width: 210px; font-size: medium; margin-left: 9px; margin-bottom: -20px;" to="noticedetail1">
                        <b>서비스 이용약관 개정 안내</b>
                    </v-btn>
                </v-card-actions>
                <div id="recordDate" style="margin-left: 17px;">2023.03.29</div>
              </v-col>
              <v-divider class="mx-1 mb-1" style="margin-top: 15px;"></v-divider>
              <v-col  style="height: 80px;">
                <v-card-actions>
                    <v-btn class="notice" style="width: 210px; font-size: medium; margin-left: -39px; margin-top: -21px;" 
                            to="noticedetail2">
                        <b>리뷰 정책 안내</b>
                    </v-btn>
                </v-card-actions>
                <div id="recordDate" style="margin-left: 17px; margin-top: -20px;">2023.02.01</div>
              </v-col>
            </v-row>
            <v-divider class="mx-1 mb-1" style="margin-top: 10px;"></v-divider>
        </v-card>
    </div>
</template>

<style>
.notice:hover {
    background-color: none;
    color: black;
}
</style>


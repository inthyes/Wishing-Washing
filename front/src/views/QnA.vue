<!--QnA-->
<!--이시언-->

<template>
    <div class="QnA">
      <v-carousel cycle height="20" hide-delimiter-background show-arrows="hover"></v-carousel>
      <v-container>
        <div class="myWashing">
          <b class="title">자주 묻는 질문들</b>
          <hr id="divisionLine">
          <br>
          <br>
          <v-row>
            <v-col cols="12" md="6" v-for="notice in notices" :key="notice.id">
              <v-card class="mb-6">
                <v-card-title class="d-flex justify-space-between align-center">
                  {{ notice.title }}
                  <v-icon v-if="!notice.isExpanded" @click="expand(notice)">mdi-menu-down</v-icon>
                  <v-icon v-if="notice.isExpanded" @click="collapse(notice)">mdi-menu-up</v-icon>
                </v-card-title>
                <v-card-text v-if="notice.isExpanded">{{ notice.content }}</v-card-text>
                <v-card-subtitle class="text-caption">{{ notice.date }}</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notices: [
          {
            id: 1,
            title: "고객센터 번호 알고싶어요.",
            content: "000-0000입니다. 감사합니다.",
            date: "2023-04-25",
            isExpanded: false
          },
          {
            id: 2,
            title: "리뷰 언제까지 쓸 수 있나요?",
            content: "배송 후 일주일 내로 가능합니다.",
            date: "2023-04-24",
            isExpanded: false
          },
        ],
      };
    },
    methods: {
      expand(notice) {
        notice.isExpanded = true;
      },
      collapse(notice) {
        notice.isExpanded = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .v-card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .v-icon {
    cursor: pointer;
  }
  .notice.title {
    font-size: 1.5rem;
  }
  </style>
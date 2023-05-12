<!--홈-->
<!--서혜린-->

<template>
  <!-- <HelloWorld /> -->
  <!-- 상단 슬라이드 -->
  <v-carousel cycle height="250" hide-delimiter-background show-arrows="hover">
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet :color="colors[i]" height="100%">
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">
            {{ slide }} Slide
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>

  <!-- 메인 컨텐츠 -->
   <!-- <v-container class="d-flex align-center justify-center">
      <v-row
        :justify="isMobile ? 'center' : 'none'"
        :align="isMobile ? 'none' : 'center'"
      >
        <v-col
          v-for="n in 3"
          :key="n"
          cols="12"
          md="4"
          class="d-flex align-center"
        >
          <v-card class="mx-auto" width="300" prepend-icon="mdi-home">
            <template v-slot:title>This is a title</template>
            <v-card-text>This is content</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container> -->
    <v-card to="managelaundry"
      class="mx-auto my-10"
      width="300"
      prepend-icon="mdi-washing-machine"
    >
      <template v-slot:title>
        세탁소 관리
      </template>

      <v-card-text>
       세탁소 관리
      </v-card-text>
    </v-card>

    <v-card to="manageproduct"
      class="mx-auto my-10"
      width="300"
      prepend-icon="mdi-tshirt-crew"
    >
      <template v-slot:title>
        상품 관리
      </template>

      <v-card-text>
        상품 관리
      </v-card-text>
    </v-card>

    <v-card to="managereview"
      class="mx-auto my-10"
      width="300"
      prepend-icon="mdi-message-reply-text-outline"
    >
      <template v-slot:title>
        리뷰 관리
      </template>

      <v-card-text>
        리뷰 관리
      </v-card-text>
    </v-card>
</template>

<script>
// import { defineComponent } from 'vue';

// // Components
// import HelloWorld from '../components/HelloWorld.vue';

// export default defineComponent({
//   name: 'HomeView',

//   components: {
//     HelloWorld,
//   },
// });
export default {
  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
      // isMobile: false,
    }
  },
}
</script>

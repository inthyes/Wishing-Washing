<!--내 세탁소 관리-->
<!--서혜린-->

<template>
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
<!--상품관리-->
<!--이시언-->

<template>
    <v-card>
      <v-card-title>상품 추가</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="addProduct">
          <v-text-field v-model="name" label="상품명"></v-text-field>
          <v-text-field v-model="price" label="가격"></v-text-field>
          <v-text-field v-model="description" label="설명"></v-text-field>
          <v-file-input v-model="image" label="이미지"></v-file-input>
          <v-btn type="submit">추가</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    data: () => ({
      name: '',
      price: '',
      description: '',
      image: null,
    }),
    methods: {
      async addProduct() {
        const formData = new FormData();
        formData.append('name', this.name);
        formData.append('price', this.price);
        formData.append('description', this.description);
        formData.append('image', this.image, this.image.name);
        try {
          const response = await axios.post('/api/products', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          console.log('상품 추가 성공:', response.data);
          // 상품 목록을 다시 로딩함
          this.$emit('reload-products');
        } catch (error) {
          console.error('상품 추가 실패:', error);
        }
      },
    },
  };
  </script>
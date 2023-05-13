<template>
  <div>
    <!-- 이미지를 표시할 태그 -->
    <img :src="imageSrc" alt="Uploaded Image" />

    <!-- i_id를 입력할 폼 -->
    <input type="text" v-model="i_id" placeholder="i_id를 입력하세요" />

    <!-- 이미지 가져오기 버튼 -->
    <button @click="fetchImage">이미지 가져오기</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      i_id: '',
      imageSrc: '',
    };
  },
  methods: {
    async fetchImage() {
      try {
        const response = await axios.get(`/image/${this.i_id}`, {
          responseType: 'arraybuffer',
        });
        if (response.status === 200) {
          const imageBase64 = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          this.imageSrc = `data:image/jpeg;base64, ${imageBase64}`;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

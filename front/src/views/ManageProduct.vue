<!--상품관리-->
<!--이시언-->

<template>

<v-card v-for="pro in products" :key="pro.id" elevation="0" style="margin-bottom: 10px;">

  <br/>

  <v-row class="justify-center">
  <v-col cols="5" class="text-right pr-2">
    <div class="text-left" style="font-size: 5px; margin-top: 0; margin-bottom: 0;">상품명</div>
    <v-text-field v-model="pro.productName" :placeholder="pro.productName" variant="underlined" style="margin-top: 0; margin-bottom: 0;"></v-text-field>
  </v-col>
  <v-col cols="5" class="pl-2">
    <div style="font-size: 5px; margin-top: 0; margin-bottom: 0;">상품 가격</div>
    <v-text-field v-model="pro.price" :placeholder="pro.price" variant="underlined" class="no-right-margin" style="margin-top: 0; margin-bottom: 0;">
      <template v-slot:append>
        원
      </template>
    </v-text-field>
  </v-col>
</v-row>


    <v-row>
      <v-card-actions style="margin-left: 255px; margin-top: -10px;">
        <v-btn icon="mdi-check" @click="sendProductNameAndPrice(pro, pro.productName, pro.price)" style="margin-top: -30px;"><v-icon></v-icon></v-btn>
      </v-card-actions>
      <v-card-actions style="margin-left: 20px; margin-top: -10px;">
        <v-btn id="delete" icon="mdi-delete" style="margin-top: -30px;" @click="deleteproduct(pro.id)"><v-icon></v-icon></v-btn>
      </v-card-actions>
    </v-row>
  </v-card>

  <br/>
  <div>
    <v-card class="additional-card" color="grey darken-1" dark style="margin-top: 10px; height: 50px;">
      <v-card-text class="additional-text">
        추가
      </v-card-text>
    </v-card>

    <v-card>
    <v-container style="background-color: gainsboro;">
    <v-row class="justify-center">
  <v-col cols="5" class="text-right pr-2">
    <div class="text-left" style="font-size: 5px; margin-top: 0; margin-bottom: 0;">상품명</div>
    <v-text-field v-model="add_name" :rules="[rules.required]" variant="underlined" style="margin-top: 0; margin-bottom: 0;"></v-text-field>
  </v-col>
  <v-col cols="5" class="pl-2">
    <div style="font-size: 5px; margin-top: 0; margin-bottom: 0;">상품 가격</div>
    <v-text-field v-model="add_price" :rules="[rules.required]" variant="underlined" class="no-right-margin" style="margin-top: 0; margin-bottom: 0;">
      <template v-slot:append>
        원
      </template>
    </v-text-field>
  </v-col>
</v-row>
</v-container>

      <v-divider></v-divider>
  
      <v-card-actions class="justify-center">
        <v-btn variant="outlined" style="width: 95%; border-color: #5E5A80; border-radius: 8px;" @click="addProduct">
          <v-btn type="submit">저장</v-btn>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>

</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        show: false,
        products: [],
        productName: "",
        price: "",
        reply: "",
        add_name: null,
        add_price: null,
        rules: {
          required: (value) => !!value|| "반드시 입력하세요",
        },
      };
    },

    async created() {
      try {
        const res = await axios.get("http://localhost:3013/products");
        this.products = res.data;
      } catch (e) {
        console.error(e);
      }
    },

    methods: {
      async sendProductNameAndPrice(pro, productName, price) {
        try {
          pro.productName = productName || pro.productName;
          pro.price = price || pro.price;
          await axios.put(`http://localhost:3013/products/${pro.id}`, pro);
          this.showAlert("상품 정보가 변경되었습니다.");
        } catch (e) {
          console.error(e);
        }
      },

      async deleteproduct(deleteId) {
        try {
          await axios.delete(`http://localhost:3013/products/${deleteId}`);
          window.location.reload();
          this.showAlert("상품이 삭제되었습니다.");
        } catch (e) {
          console.error(e);
        }
      },

      async addProduct() {
        if (
          this.rules.required(this.add_name) === true &&
          this.rules.required(this.add_price) === true
        ) {

    const newProduct = {
      productName: this.add_name,
      price: this.add_price,
    };

    try {
      const res = await axios.post("http://localhost:3013/products", newProduct);
      this.products.push(res.data);
      this.showAlert("상품이 추가되었습니다.");
      await this.sendProductNameAndPrice(res.data, res.data.productName, res.data.price);

      this.add_name = null;
      this.add_price = null;

      } catch (e) {
        console.error(e);
      }
    }
  },

      showAlert(message) {
        alert(message);
      },
    },

    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
</script>


<style scoped>
.additional-card {
  width: 100%;
  text-align: left;
  padding: 8px;
  display: flex;
  align-items: center;
}

.additional-text {
  font-size: 17px;
  color: white;
}

</style>
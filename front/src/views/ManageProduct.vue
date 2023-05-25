<template>
  <div class="mt-10 mx-0 px-0">

    <!-- 상품 수정 -->
    <v-card class="mx-auto px-0" max-width="400" v-for="product in products" :key="product.PRODUCT_ID" elevation="0">
      <!-- <br /> --> <!-- 왜 margin-top을 안쓰고 이렇게 했을까요 -->
      <v-row class="justify-center">
        <v-col cols="5" class="text-right pr-2">
          <div class="text-left" style="font-size: 5px;">상품명</div>
          <v-text-field v-model="product.PRODUCT_NAME" :placeholder="product.PRODUCT_NAME" variant="underlined"></v-text-field>
        </v-col>
        <v-col cols="5" class="pl-2">
          <div style="font-size: 5px;">상품 가격</div>
          <v-text-field v-model="product.PRODUCT_PRICE" :placeholder="product.PRODUCT_PRICE" variant="underlined" class="no-right-margin">
            <template v-slot:append>원</template>
          </v-text-field>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-btn icon="mdi-check" @click="save(product, product.PRODUCT_NAME, product.PRODUCT_PRICE)"><v-icon></v-icon></v-btn>
        <v-btn id="delete" icon="mdi-delete" style="margin-top: -30px;"
          @click="deleteproduct(product.PRODUCT_ID)"><v-icon></v-icon></v-btn>
      </v-row> -->
      <div class="px-4 d-flex align-center">
        <v-spacer></v-spacer>
        <v-btn class="text-none" prepend-icon="mdi-delete" variant="text" color="grey-darken-3"
          @click="deleteproduct(product.PRODUCT_ID)">
          <template v-slot:prepend>
            <v-icon color="gray"></v-icon>
          </template>삭제</v-btn>
        <v-btn class="text-none" prepend-icon="mdi-check-circle" variant="text" color="grey-darken-3"
          @click="save(product, product.PRODUCT_NAME, product.PRODUCT_PRICE)">
          <template v-slot:prepend>
            <v-icon color="light-blue-darken-4"></v-icon>
          </template>수정</v-btn>
      </div>
      <v-divider></v-divider>
    </v-card>

    <!-- <br /> ?? 또 해놨네 -->
    <!-- 상품 추가 -->
    <div>
      <v-card id="edit-list" class="mx-auto pb-10" max-width="380" elevation="0">
        <v-card-title class="my-5">상품 추가</v-card-title>
          <v-row class="justify-center">
            <v-col cols="5" class="text-right pr-2">
              <div class="text-left" style="font-size: 5px; margin-top: 0; margin-bottom: 0;">상품명</div>
              <v-text-field v-model="add_name" :rules="[rules.required]" variant="underlined"
                style="margin-top: 0; margin-bottom: 0;"></v-text-field>
            </v-col>
            <v-col cols="5" class="pl-2">
              <div style="font-size: 5px; margin-top: 0; margin-bottom: 0;">상품 가격</div>
              <v-text-field v-model="add_price" :rules="[rules.required]" variant="underlined" class="no-right-margin"
                style="margin-top: 0; margin-bottom: 0;">
                <template v-slot:append>원</template>
              </v-text-field>
            </v-col>
          </v-row>


          <!-- <v-btn variant="outlined" style="width: 95%; border-color: #5E5A80; border-radius: 8px;" @click="addProduct">
          <v-btn type="submit">저장</v-btn>
        </v-btn> -->

          <div class="px-4  d-flex align-center">

          <v-spacer></v-spacer>

          <v-btn class="text-none" prepend-icon="mdi-plus-circle" variant="text" color="grey-darken-3"
            @click="addProduct">
            <template v-slot:prepend>
              <v-icon color="success"></v-icon>
            </template>상품추가</v-btn>

        </div>

      </v-card>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  data() {
    return {
      S_ID: "",
      show: false,
      products: [],
      add_name: null,
      add_price: null,
      add_info: null,
      rules: {
        required: (value) => !!value || "반드시 입력하세요",
      },
    };
  },

  async created() {
    try {
      const response = await axios.get("http://localhost:4000/laundry/productAdmin");
      // this.products = response.data.productAdmin[0];
      this.products = response.data.productAdmin[0];
      this.S_ID = response.data.S_ID; // S_ID 값을 받아옴

      console.log(this.S_ID);
      // console.log(this.products);
    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    // async sendProductNameAndPrice(pro, productName, price) {
    //   try {
    //     pro.productName = productName || pro.productName;
    //     pro.price = price || pro.price;
    //     await axios.put(`http://localhost:4000/laundry/productAdmin`, pro);
    //     this.showAlert("상품 정보가 변경되었습니다.");
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    async addProduct() {
      try {
        // 수정된 정보를 서버로 전송할 데이터 객체 생성
        const data = {
          S_ID: this.S_ID,
          PRODUCT_NAME: this.add_name,
          PRODUCT_INFO: this.add_info,
          PRODUCT_PRICE: this.add_price
        };
        const response = await axios.post(`http://localhost:4000/laundry/addProduct`, data);
        console.log(response.data);

        // 서버 응답을 받아 처리하는 로직 추가

      } catch (error) {
        console.error(error);
      }
    },

    //${product.PRODUCT_ID}
    async deleteProduct(deleteId) { //일단 구현안함
      try {
        await axios.delete(`http://localhost:5001/products/${deleteId}`);
        window.location.reload();
        this.showAlert("상품이 삭제되었습니다.");
      } catch (error) {
        console.error(error);
      }
    },
    async addProduct2() {
      if (
        this.rules.required(this.add_name) === true &&
        this.rules.required(this.add_price) === true
      ) {
        const newProduct = {
          productName: this.add_name,
          price: this.add_price,
        };
        try {
          const response = await axios.post("http://localhost:4000/laundry/productAdmin/7", newProduct);
          this.products.push(response.data);
          this.showAlert("상품이 추가되었습니다.");
          this.sendProductNameAndPrice(response.data, response.data.productName, response.data.price);

          this.add_name = null;
          this.add_price = null;
        } catch (error) {
          console.error(error);
        }
      }
    },
    computed: {
      getMatchingReviews() {
        return this.reviews.filter(review => review.laundryId === 1);
      }
    },
    showAlert(message) {
      alert(message);
    },
  },
}
</script>
  
<style scoped>
#edit-list{
   /* background-color:rgba(81, 142, 234, 0.284); */
   /* color: white; */
}
</style>
  
   
  
  
  <!-- 
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
  
      // async created() {
      //   try {
      //     const res = await axios.get("http://localhost:5001/products");
      //     this.products = res.data;
      //   } catch (e) {
      //     console.error(e);
      //   }
      // },
      async created() {
      try {
        const res = await axios.get("http://localhost:4000/laundry/productAdmin");
        this.products = res.data.productAdmin[0];
        console.log(this.products);
      } catch (error) {
        console.error(error);
      }
    },
      
  
      methods: {
        async sendProductNameAndPrice(pro, productName, price) {
          try {
            pro.productName = productName || pro.productName;
            pro.price = price || pro.price;
            await axios.put(`http://localhost:5001/products/${pro.id}`, pro);
            this.showAlert("상품 정보가 변경되었습니다.");
          } catch (e) {
            console.error(e);
          }
        },
  
        async deleteproduct(deleteId) {
          try {
            await axios.delete(`http://localhost:5001/products/${deleteId}`);
            window.location.reload();
            this.showAlert("상품이 삭제되었습니다.");
          } catch (e) {
            console.error(e);
          }
        },
  
    //     async addProduct() {
    //       if (
    //         this.rules.required(this.add_name) === true &&
    //         this.rules.required(this.add_price) === true
    //       ) {
  
    //         const newProduct = {
    //           productName: this.add_name,
    //           price: this.add_price,
    //         };
  
    //         try {
    //           const res = await axios.post("http://localhost:5001/products", newProduct);
    //           this.products.push(res.data);
    //           this.showAlert("상품이 추가되었습니다.");
    //           await this.sendProductNameAndPrice(res.data, res.data.productName, res.data.price);
  
    //           this.add_name = null;
    //           this.add_price = null;
  
    //           } catch (e) {
    //             console.error(e);
    //           }
    //         }
    // },
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
              const response = await axios.post("http://localhost:4000/laundry/productAdmin/7", newProduct);
              this.products.push(response.data);
              this.showAlert("상품이 추가되었습니다.");
              this.sendProductNameAndPrice(response.data, response.data.productName, response.data.price);
  
              this.add_name = null;
              this.add_price = null;
            } catch (error) {
              console.error(error);
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
    }
  
  </script> -->

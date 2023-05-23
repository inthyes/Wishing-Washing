<template>
  <v-card v-for="product in products" :key="product.PRODUCT_ID" elevation="0" style="margin-bottom: 10px;">
    <v-card-text style="margin-bottom: -5px;">
      <span id="productName" style="font-weight: bold; font-size: 15px; display: inline-block; text-align: right; width: 20%;">
        {{ product.PRODUCT_NAME }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
      <span id="price" style="font-weight: bold; font-size: 15px; display: inline-block; text-align: right; width: 17%;">
        {{ product.PRODUCT_PRICE }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
    </v-card-text>

    <v-row>
      <v-col cols="5" class="text-right pr-2">
        <v-text-field v-model="product.PRODUCT_NAME" :placeholder="product.PRODUCT_NAME" variant="outlined"></v-text-field>
      </v-col>
      <v-col cols="5" class="pl-2">
        <v-text-field v-model="product.PRODUCT_PRICE" :placeholder="product.PRODUCT_PRICE" variant="outlined" class="no-right-margin"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-card-actions style="margin-left: 255px; margin-top: -10px;">
        <v-btn icon="mdi-check" @click="updateProduct(product)" style="margin-top: -30px;"><v-icon></v-icon></v-btn>
      </v-card-actions>
      <v-card-actions style="margin-left: 20px; margin-top: -10px;">
        <v-btn id="delete" icon="mdi-delete" style="margin-top: -30px;" @click="deleteProduct(product.PRODUCT_ID)"><v-icon></v-icon></v-btn>
      </v-card-actions>
    </v-row>
  </v-card>

  <v-card class="mx-auto my-5" max-width="400" elevation="0">
    <v-container>
      <v-text-field v-model="add_name" :rules="[rules.required]" color="blue" label="상품 이름" variant="underlined"></v-text-field>
      <br/>
      <v-text-field v-model="add_price" :rules="[rules.required]" color="blue" label="가격" variant="underlined"></v-text-field>
      <br/>
      <v-text-field v-model="add_info" :rules="[rules.required]" color="blue" label="상품 소개" variant="underlined"></v-text-field>
      <br/>
    </v-container>
    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="#0C70FE" @click="addProduct">
        <v-btn type="submit">추가</v-btn>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
  import axios from "axios";

  export default {
    data() {
      return {
        S_ID : "",
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
          S_ID : this.S_ID,
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

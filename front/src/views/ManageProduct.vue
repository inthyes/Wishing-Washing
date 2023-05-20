<!--상품 관리-->
<!--이시언-->

  <!-- <v-card class="mx-auto my-5" max-width="400" title="상품 관리" elevation="0">
    <br />
    <v-divider></v-divider>

    <v-card v-for="(product, index) in products" :key="index" elevation="0" style="margin-bottom: 10px;">
      <v-img class="align-end text-white" id="productImg" height="150" :src="product.image" cover></v-img>

      <v-card-text style="margin-bottom: -5px;">
        <span id="productName" style="font-weight: bold; font-size: 15px;">
          {{ product.name }} &nbsp;
        </span>
        <span id="productPrice" style="color: gray">{{ product.price }} 원</span>
      </v-card-text>

      <v-row>
        <v-col cols="5" style="margin-left: 30px;">
          <v-text-field v-model="product.name" placeholder="상품 이름" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field v-model="product.price" placeholder="상품 가격" variant="outlined"></v-text-field>
        </v-col>
      </v-row>  
      <v-card-actions style="margin-left: 250px; margin-top: -10px;">
        <v-btn icon="mdi-check" @click="updateProduct(index)" style="margin-top: -30px;"><v-icon></v-icon></v-btn>
        <v-btn icon="mdi-delete" @click="deleteProduct(index)" style="margin-top: -30px;"><v-icon></v-icon></v-btn>
      </v-card-actions>
      

      <v-divider class="mx-1 mb-1"></v-divider>

    </v-card>
    <add-product @product-added="addProduct"></add-product>

  </v-card> -->

<!-- <script>


import AddProduct from './AddProduct.vue'
import axios from "axios";

export default {
  components: {
    'add-product': AddProduct
  },
  data() {
    return {
      products: [
        // {id: 1, name: '상의', price: 5000},
        // {id: 2, name: '하의', price: 10000},
        // {id: 3, name: '신발', price: 10000}
      ],
    }
  },
  methods: {
    updateProduct(index) {
      this.products[index] = this.editedProduct
    },
    deleteProduct(index) {
      this.products.splice(index, 1)
    },
    addProduct(product) {
      this.products.push(product)
    }
  },
  mounted() {
  // 백엔드 API 엔드포인트 주소를 설정합니다.
  const apiUrl = '"http://localhost:3000/productAdmin'; // 적절한 엔드포인트 주소로 변경해야 합니다.

  // 여기서는 토큰에서 사장님의 아이디를 가져와 사용합니다.
  const S_ID = 1; // 토큰에서 사장님의 아이디를 추출하는 함수로 변경해야 합니다.

  // GET 요청을 보내어 사장님의 상품 리스트를 가져옵니다.
  axios
    .get(`${apiUrl}?S_ID=${S_ID}`)
    .then(response => {
      // GET 요청의 응답 데이터에서 상품 리스트를 추출합니다.
      const productAdmin = response.data;

      // 가져온 상품 리스트를 컴포넌트의 데이터에 설정합니다.
      this.products = productAdmin;
    })
    .catch(error => {
      console.error('Error fetching product list:', error);
    });
}
}
</script> -->
<template>

  <v-card class="mx-auto my-5" max-width="400" title="상품 관리" elevation="0">
    <br/>
    <v-divider></v-divider>
  </v-card>

  <v-card v-for="pro in products" :key="pro.id" elevation="0" style="margin-bottom: 10px;">
    <v-img class="align-end" id="productImg" height="150" :src="pro.productImg" cover style="width: 85px; height: 80px; float: left; margin-left: 15px; margin-top: 15px; margin-right: 17px; border-radius: 5px;"></v-img>
    <v-card-text style="margin-bottom: -5px;">
  <span id="productName" style="font-weight: bold; font-size: 15px; display: inline-block; text-align: right; width: 20%;">
    {{ pro.productName }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span>
  <span id="price" style="font-weight: bold; font-size: 15px; display: inline-block; text-align: right; width: 17%;">
    {{ pro.price }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span>
</v-card-text>


<v-row>
  <v-col cols="5" class="text-right pr-2">
    <v-text-field v-model="pro.productName" :placeholder="pro.productName" variant="outlined"></v-text-field>
  </v-col>
  <v-col cols="5" class="pl-2">
    <v-text-field v-model="pro.price" :placeholder="pro.price" variant="outlined" class="no-right-margin"></v-text-field>
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

  <v-card class="mx-auto my-5" max-width="400" elevation="0">
    <v-container>
      <v-text-field v-model="add_name" :rules="[rules.required]" color="blue" label="상품 이름" variant="underlined"></v-text-field>
      <br/>
      <v-text-field v-model="add_price" :rules="[rules.required]" color="blue" label="가격" variant="underlined"></v-text-field>
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
        show: false,
        products: [],
        productName: "",
        price: "",
        reply: "",
        add_name: null,
        add_price: null,
        rules: {
          required: (value) => !!value || "반드시 입력하세요",
        },
      };
    },

    async created() {
      try {
        const res = await axios.get("http://localhost:4000/productAdmin");
        this.products = res.data.productAdmin;
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
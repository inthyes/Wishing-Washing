"use strict";
const {response} = require("express");
const ProductDetail = require("./ProductDetail");

class Product {
    constructor(body) {
        // this.body에는 req.params.id가 들어가있음
        this.body = body;
      }

      async showDetail() {
        const product = this.body;
        const detail = await ProductDetail.getProductDetail(product);
        //detail에는 db에서 가져온 상품의 id와 name이 포함.

        return detail;
    }
}

module.exports = Product;
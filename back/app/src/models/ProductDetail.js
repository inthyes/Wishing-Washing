"use strict";
const db = require("../config/db");

class ProductDetail {
    static getProducts(isALl, ...fields) {};


    //product 디테일을 db에서 찾아오는...
    static getProductDetail(storeId) {
        return new Promise ((resolve, reject) => {
        db.query("USE CAPSTONE", (err, result) => {
            const query = "SELECT * FROM PRODUCT where S_ID = ?;";
            if (err) reject(err);
            db.query(query, storeId, (err, data) => {
                if (err) reject(err);
                else {
                    const product = data;
                    resolve(product)
                    }
                });
              })
        });
    }
    static getProduct(productId) {
        return new Promise ((resolve, reject) => {
        db.query("USE CAPSTONE", (err, result) => {
            const query = "SELECT * FROM PRODUCT where PRODUCT_ID = ?;";
            if (err) reject(err);
            db.query(query, productId, (err, data) => {
                if (err) reject(err);
                else {
                    const product = data;
                    resolve(product)
                    }
                });
              })
        });
    }
}

module.exports = ProductDetail;
"use strict";
const db = require("../config/db");

class ProductDetail {
    static getProducts(isALl, ...fields) {};


    //product 디테일을 db에서 찾아오는...
    static getProductDetail(id) {
        return new Promise ((resolve, reject) => {
        db.query("USE capstone", (err, result) => {
            const query = "SELECT * FROM PRODUCT where S_ID = ?;";
            if (err) reject(err);
            db.query(query, id, (err, data) => {
                if (err) reject(err);
                else {
                    // data는 배열 형태이다.
                    const product = data;
                    resolve(product)
                    }
                });
              })
        });
    }
}

module.exports = ProductDetail;
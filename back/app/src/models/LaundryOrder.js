"use strict";

const {response} = require("express");
const db = require("../config/db");



class LaundryOrder {
    constructor(body) {
        this.body = body;
      }
      async showCart() {
        const orderNum = this.body;
        return new Promise ((resolve, reject) => {
        db.query("USE CAPSTONE", (err, result) => {
            const query = "SELECT * FROM CART WHERE O_NUM = ?;";
            if (err) reject(err);
            db.query(query, orderNum, (err, data) => {
                if (err) reject(err);
                else {
                    const cart = data;
                    resolve(cart)
                    }
                });
              })
        });
    }


    //프론트에서 계산 다 하고 여기로 넘겨줌
    async calculatePrice() {
        const orderNum = this.body;
        return new Promise ((resolve, reject) => {
            db.query("USE CAPSTONE", (err, result) => {
                const query = "SELECT PRODUCT_ID \
                FROM CART INNER JOIN PRODUCT ON \
                INNER JOIN PRODUCT ON CART.PRODUCT_ID = PRODUCT.PRODUCT_ID \
                WHERE CART.O_NUM = ?";
                if (err) reject(err);
                db.query(query, orderNum, (err, data) => {
                    if (err) reject(err);
                    else {
                        const cart = data;
                        resolve(cart)
                        }
                    });
                  })
            });
    }
}




module.exports = LaundryOrder; 
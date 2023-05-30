"use strict";
const db = require("../config/db");
const {response} = require("express");


class Product {
    constructor(body, S_ID) {
        // this.body에는 req.params.id가 들어가있음
        this.body = body;
        this.S_ID = S_ID;
      }
      async showStroeProduct() {
        const S_ID = this.S_ID; //이 바디에는 S_ID가 들어있고
        console.log(S_ID);
        const show = await Product.show(S_ID);
        return show;
      }
      async showProduct() {
        const O_ID = this.body; //이 바디에는 S_ID가 들어있고
        console.log(O_ID);
        const show = await Product.showOrderProduct(O_ID);
        return show;
      }


      async addProduct() {
        // const S_ID = this.S_ID; //이 바디에는 S_ID제외한 모든게 들어있다
        const S_ID = this.S_ID;
        const PRODUCT_NAME = this.body.PRODUCT_NAME;
        const PRODUCT_INFO = this.body.PRODUCT_INFO;
        const PRODUCT_PRICE = this.body.PRODUCT_PRICE;

        const insert = await Product.insert(S_ID, PRODUCT_NAME, PRODUCT_INFO, PRODUCT_PRICE);
        return insert;
      }

      async deleteProduct() {
        const P_ID = this.S_ID;
        const deleteProduct = await Product.delete(P_ID);
        return deleteProduct;

      }
  
      //
  static async show(S_ID) {
    return new Promise ((resolve, reject) => {
    db.query("USE CAPSTONE", (err, result) => {
        const query = "SELECT * FROM Product where S_ID = ?;";
        if (err) reject(err);
        //const keys = Object.keys(query);
        db.query(query,  [S_ID], (err, data) => {
            if (err) reject(err);
            else {
                const show = data;
                resolve(
                  show
                )
                }
            });
          })
    });
}
static async insert(S_ID, PRODUCT_NAME, PRODUCT_INFO, PRODUCT_PRICE) {
    return new Promise ((resolve, reject) => {
    db.query("USE CAPSTONE", (err, result) => {
        const query = "INSERT INTO product(S_ID, PRODUCT_NAME, PRODUCT_INFO, PRODUCT_PRICE) VALUES (? , ?, ?, ?);";
        if (err) reject(err);
        //const keys = Object.keys(query);
        db.query(query, [parseInt(S_ID),PRODUCT_NAME, PRODUCT_INFO, parseInt(PRODUCT_PRICE)], (err, data) => {
            if (err) reject(err);
            else {
                resolve({
                  success: true
                })
                }
            });
          })
    });

      
}
static async delete(P_ID) {
    return new Promise ((resolve, reject) => {
    db.query("USE CAPSTONE", (err, result) => {
        const query = "DELETE FROM product WHERE PRODUCT_ID = ?;";
        if (err) reject(err);
        //const keys = Object.keys(query);
        db.query(query, [P_ID], (err, data) => {
            if (err) reject(err);
            else {
                resolve({
                  success: true
                })
                }
            });
          })
    });
}
static async showOrderProduct(O_NUM) {
  return new Promise((resolve, reject) => {
    db.query("USE CAPSTONE", (err, result) => {
      const query = "SELECT c.product_id, c.product_quantity, p.product_name " +
        "FROM cart c " +
        "JOIN product p ON c.product_id = p.product_id " +
        "WHERE c.O_NUM = ?";
      if (err) reject(err);
      db.query(query, [O_NUM], (err, data) => {
        if (err) reject(err);
        else {
          const show = data;
          resolve(show);
        }
      });
    });
  });
}


      
}


module.exports = Product; 
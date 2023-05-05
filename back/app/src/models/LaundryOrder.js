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
}




module.exports = LaundryOrder; 
"use strict";
const db = require("../config/db");

class Order {
  constructor(S_ID) {
    this.S_ID = S_ID;
  }

  async showOrder() {
    const S_ID = this.S_ID; //이 바디에는 S_ID가 들어있고
    console.log(S_ID);
    const show = await Order.show(S_ID);
    return show;
  }

  static async show(S_ID) {
    return new Promise((resolve, reject) => {
      
      db.query("USE CAPSTONE", (err, result) => {
        const queryGetUser = `SELECT * FROM ORDER_COMPLETE WHERE S_ID = ?`;
        // const userId = this.userId;
        if (err) reject(err);
        db.query(queryGetUser, [S_ID], (err, data) => {
          if (err) reject(err);
          else {
            resolve(data);
          }
        });
      });
    });
  }
}

module.exports = Order;

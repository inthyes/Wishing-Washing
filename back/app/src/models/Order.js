"use strict";
const db = require("../config/db");

class Order {
  constructor(body, S_ID) {
    this.S_ID = S_ID;
    this.body = body;
  }

  async showOrder() {
    
    const S_ID = this.S_ID; //이 바디에는 S_ID가 들어있고
    
    console.log(S_ID);
    const show = await Order.show(S_ID);
    return show;
  }
  async orderDelete() {
    
    const O_NUM = this.body;
    
    //console.log(S_ID);
    const show = await Order.delete(O_NUM);
    return show;
  }

  async update1() {
    const S_ID = this.S_ID; 
    const O_ID = this.body;
    console.log(S_ID);
    console.log(O_ID);
    const show = await Order.deliveryUpdate1(O_ID, S_ID);
    return show;
  }

  async update2() {
    const S_ID = this.S_ID; 
    const O_ID = this.body;
    console.log(S_ID);
    console.log(O_ID);
    const show = await Order.deliveryUpdate2(O_ID, S_ID);
    return show;
  }

  async update3() {
    const S_ID = this.S_ID; 
    const O_ID = this.body;
    console.log(S_ID);
    console.log(O_ID);
    const show = await Order.deliveryUpdate3(O_ID, S_ID);
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

  static async delete(O_ID) {
    return new Promise ((resolve, reject) => {
    db.query("USE CAPSTONE", (err, result) => {
        const query = "DELETE FROM ORDER_COMPLETE WHERE O_NUM = ?;";
        if (err) reject(err);
        //const keys = Object.keys(query);
        db.query(query, [O_ID], (err, data) => {
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


  static async deliveryUpdate1(O_NUM, S_ID) {
    return new Promise ((resolve, reject) => {
    db.query("USE CAPSTONE", (err, result) => {
        const query = "UPDATE ORDER_COMPLETE SET DELIVERY_STATE = -1 WHERE S_ID = ? AND O_NUM = ?;";
        if (err) reject(err);
        //const keys = Object.keys(query);
        db.query(query,  [S_ID, O_NUM], (err, data) => {
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
  
  static async deliveryUpdate2(O_NUM, S_ID) {
    return new Promise ((resolve, reject) => {
    db.query("USE CAPSTONE", (err, result) => {
        const query = "UPDATE ORDER_COMPLETE SET DELIVERY_STATE = 1 WHERE S_ID = ? AND O_NUM = ?;";
        if (err) reject(err);
        //const keys = Object.keys(query);
        db.query(query,  [S_ID, O_NUM], (err, data) => {
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

  static async deliveryUpdate3(O_NUM, S_ID) {
    return new Promise ((resolve, reject) => {
    db.query("USE CAPSTONE", (err, result) => {
        const query = "UPDATE ORDER_COMPLETE SET DELIVERY_STATE = 2 WHERE S_ID = ? AND O_NUM = ?;";
        if (err) reject(err);
        //const keys = Object.keys(query);
        db.query(query,  [S_ID, O_NUM], (err, data) => {
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


}

module.exports = Order;

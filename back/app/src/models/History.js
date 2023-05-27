"use strict";
const db = require("../config/db");
const {response} = require("express");

// 세탁소 클래스 생성

class History {
    constructor(body) {
        // this.body에는 req.params.id가 들어가있음
        this.body = body;
      }
      async showHistory() {
        const id = this.body;
        const orderCompleteList = await History.showList(id);
        return orderCompleteList;
      }
    static async showList(id) {
      return new Promise ((resolve, reject) => {
        db.query("USE CAPSTONE", (err, result) => {
          if (err) reject(err);
          else {
            const getOrderCompleteList = "SELECT ORDER_COMPLETE.S_ID, O_NUM, S_NAME, ORDER_COMPLETE.S_ID, U_ID, O_DAY, DELIVERY_STATE, O_PRICE, O_REQUEST, COMPLETE_DATE, DELIVERY_DAY, DELIVERY_TIME\
                                          FROM order_complete\
                                          left outer JOIN store ON ORDER_COMPLETE.s_id = store.s_id\
                                          where u_id = ?;"
            db.query(getOrderCompleteList, [id], (err, orderCompleteList) => {
              if (err) reject(err);
              else {
                resolve(orderCompleteList);
              }
            });
          }
        });
      });
    }
    
    
    
      
}


module.exports = History; 
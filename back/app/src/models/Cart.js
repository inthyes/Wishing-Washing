"use strict";
const {response} = require("express");
//const UserStorage = require("./UserStorage");
const User = require("./User");
const db = require("../config/db");

class Cart {
    constructor(body, userID) {
        // this.body에는 req.params가 들어가있음
        // this.body = req.body;
        this.body= body;
        this.userID = userID;
    }   
    async add() {
        const response = await Cart.addCart(this.body, this.userID);
        return response;
    }
    static async addCart(Info, userID) {
          return new Promise((resolve, reject) => {
            db.query("USE CAPSTONE", (err, result) => {
              if (err) {
                reject(err);
                return;
              }
              let queryAddCart = "INSERT INTO cart(O_NUM, PRODUCT_ID, PRODUCT_QUANTITY) VALUES ?";
              let queryAddOrderList = "INSERT INTO ORDER_LIST(O_NUM, S_ID, U_ID, O_DAY, O_TIME) VALUES (? , ? , ? , ? , ?);";
              let queryGetOrderNum = "SELECT * FROM ORDER_NUM;";
              let queryUpdateOrderNum = "UPDATE ORDER_NUM SET ORDER_NUM = ? WHERE ORDER_NUM = ?;";
              let orderNum;
              db.query(
                queryGetOrderNum,
                (err, result) => {
                  if (err) reject(err);
                  else  
                  {
                    orderNum = result[0].ORDER_NUM + 1;
                    db.query(
                      queryAddOrderList,
                      [orderNum, parseInt(Info.laundryId), userID, Info.date, Info.time],
                      (err, result) => {
                        if (err) reject(err);
                        else {
                          let values = [];
                          const keys = Object.keys(Info); //객체의 배열화
                          for (let i = 0; i < keys.length-3; i++) {
                            const cartNum = parseInt(Info[keys[i]]); //Info.p1
                            values.push([orderNum, keys[i], cartNum]);
                          }   
                          // add cart 구현 -> CART DB에 주문번호와 함꼐 INSERT
                          db.query(
                            queryAddCart,
                            [values],
                            (err, result) => {
                              if (err) reject(err);
                              else {                       
                                // ORDER_NUM TABLE에 있는 ORDER_NUM 하나 증가해서 UPDATE
                                db.query(
                                  queryUpdateOrderNum,
                                  [orderNum, orderNum-1], 
                                  (err, data) => {
                                  if (err) reject(err);
                                  else {
                                    resolve({ orderNumber: orderNum }); 
                                      }
                                  });              
                              }
                            }
                          )
                        }
                      }
                    );
                  }
                }
              );
            }
            )
          }
          )
        }

        async deleteCart() {
          return new Promise((resolve, reject) => {
          db.query("USE CAPSTONE", (err, result) => {
            if (err) {
              reject(err);
              return;
            }
            let queryDeleteCart = "DELETE FROM CART WHERE O_NUM = ?";
            let queryDeleteOrderList = "DELETE FROM ORDER_LIST WHERE O_NUM = ?";
            let queryUpdateOrderNum = "UPDATE ORDER_NUM SET ORDER_NUM = ? WHERE ORDER_NUM = ?;";
            let orderNum = this.body;

            db.query(
              queryDeleteCart,
              orderNum,
              (err) => {
                if (err) reject(err);
                else {
                  db.query(
                    queryDeleteOrderList,
                    orderNum,
                    (err, result) => {
                      if (err) reject(err);
                      else {                       
                        db.query(
                          queryUpdateOrderNum,
                          [orderNum-1, orderNum], 
                          (err, data) => {
                          if (err) reject(err);
                          else {
                            resolve({ orderNumber: orderNum }); 
                          }
                        });              
                      }
                    }
                  )
                }
              }
            );
          }
          )
        }
        )
     }
    }



module.exports = Cart;
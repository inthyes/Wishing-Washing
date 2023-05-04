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
        const { completeList, notCompleteList } = await History.showList(id);
        console.log(completeList, notCompleteList);
        return { completeList, notCompleteList };
      }
    static async showList(id) {
      return new Promise ((resolve, reject) => {
        db.query("USE CAPSTONE", (err, result) => {
          if (err) reject(err);
          else {
            const completeQuery = "SELECT * FROM ORDER_COMPLETE WHERE U_ID = ? AND DELEVERY_STATE = 1 ORDER BY O_DAY DESC";
            const notCompleteQuery = "SELECT * FROM ORDER_COMPLETE WHERE U_ID = ? AND DELEVERY_STATE = 0 ORDER BY O_DAY DESC";
            db.query(completeQuery, [id], (err, completeData) => {
              if (err) reject(err);
              else {
                db.query(notCompleteQuery, [id], (err, notCompleteData) => {
                  if (err) reject(err);
                  else {
                    const completeList = completeData;
                    const notCompleteList = notCompleteData;
                    resolve({
                      completeList, notCompleteList
                    });
                  }
                });
              }
            });
          }
        });
      });
    }
    
    
    
      
}


module.exports = History; 
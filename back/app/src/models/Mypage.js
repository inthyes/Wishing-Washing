"use strict";
const db = require("../config/db");

class MyPage {
  constructor(userId) {
    this.userId = userId;
  }
  async showMyPageInfo(userId) {
    return new Promise((resolve, reject) => {
      
      db.query("USE CAPSTONE", (err, result) => {
        const queryGetUser = `SELECT * FROM CEO JOIN STORE ON CEO.S_ID = STORE.S_ID WHERE CEO.C_ID = ?`;
        // const userId = this.userId;
        if (err) reject(err);
        db.query(queryGetUser, [userId], (err, data) => {
          if (err) reject(err);
          else {
            console.log("ㅁㄴㅇㄹㅁ",userId);
            // console.log(this.userId);
            resolve(data[0]);
            
          }
        });
      });
    });
  }
}

module.exports = MyPage;

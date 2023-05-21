"use strict";
const db = require("../config/db");

class MyPage {
  constructor(userId) {
    this.userId = "codus";
    console.log(this.userId);
  }

  async showMyPageInfo() {
    return new Promise((resolve, reject) => {
      db.query("USE CAPSTONE", (err, result) => {
        const queryGetUser = "SELECT * FROM CEO JOIN STORE ON CEO.S_ID = STORE.S_ID WHERE CEO.C_ID = ?";
        const params = [this.userId]; // 변수 값을 배열로 전달합니다.

        if (err) reject(err);
        db.query(queryGetUser, params, (err, data) => {
          if (err) reject(err);
          else {
            resolve(data[0]);
          }
        });
      });
    });
  }
}

module.exports = MyPage;

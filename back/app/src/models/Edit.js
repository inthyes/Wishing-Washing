"use strict";
const db = require("../config/db");
const crypto = require("crypto");

class MyPageEdit {
  constructor(body, U_ID) {
    this.body = body;
    this.U_ID = U_ID;
  }

  async update() {
    // const password = this.body.password;
    const phone = this.body.phone;
    const address = this.body.address;
    const mail = this.body.mail;
    const U_ID = this.U_ID;
    const name = this.body.name;

    let updatedFields = [];
    let queryParams = [];

    if (mail) {
      updatedFields.push("U_MAIL = ?");
      queryParams.push(mail);
    }

    if (phone) {
      updatedFields.push("U_PHONE = ?");
      queryParams.push(phone);
    }

    if (name) {
      updatedFields.push("U_NAME = ?");
      queryParams.push(name);
    }

    try {
      await MyPageEdit.updateProfile(updatedFields, queryParams, U_ID);

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static updateProfile(updatedFields, queryParams, U_ID) {
    return new Promise((resolve, reject) => {
      const json = {
        code: 404,
        message: "DB 서버 연결 실패"
      };

      db.getConnection((err, conn) => {
        if (err) {
          console.log("Mysql 연결 실패");
          conn.release();
          console.log(json);
          reject(json);
        }

        console.log("DB 연결 성공");

        db.query("USE CAPSTONE", (err, result) => {
          if (err) reject(err);

          const query = `UPDATE USERS SET ${updatedFields.join(", ")} WHERE U_ID = ?`;

          queryParams.push(U_ID);

          db.query(query, queryParams, (err, data) => {
            if (err) reject(err);
            else {
              resolve(data);
            }
          });
        });
      });
    });
  }

  async myEdit() {
    const userId = this.U_ID;
    return new Promise ((resolve, reject) => {
      db.query("USE CAPSTONE", (err, result) => {
          const queryUserInfo = "SELECT * FROM CEO JOIN STORE ON CEO.S_ID = STORE.S_ID WHERE CEO.C_ID = ?";
          if (err) reject(err);
          db.query(queryUserInfo,  userId, (err, data) => {
              if (err) reject(err);
              else {
                console.log(data[0]);
                  resolve(data[0])
                  
                }
              });
          })
      });
  }

}

module.exports = MyPageEdit;

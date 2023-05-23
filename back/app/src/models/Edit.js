"use strict";
const db = require("../config/db");
const crypto = require("crypto");

class Edit {
  constructor(body, C_ID) {
    this.body = body;
    this.C_ID = C_ID;
  }

  async update() {
    const phone = this.body.phone;
    const mail = this.body.mail;
    const C_ID = this.C_ID;
    // const name = this.body.name;
    const Sname = this.body.Sname;

    let updatedFields = [];
    let queryParams = [];

    if (mail) {
      updatedFields.push("S_MAIL = ?");
      queryParams.push(mail);
    }

    if (phone) {
      updatedFields.push("C_PHONE = ?");
      queryParams.push(phone);
    }

    if (Sname) {
      updatedFields.push("S_NAME = ?");
      queryParams.push(Sname);
    }

    try {
      await Edit.updateProfile(updatedFields, queryParams, C_ID);

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static updateProfile(updatedFields, queryParams, C_ID) {
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

          const query = `UPDATE CEO
          JOIN STORE ON CEO.S_ID = STORE.S_ID
          SET ${updatedFields.join(", ")}
          WHERE CEO.C_ID = ?`;


          queryParams.push(C_ID);

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
      const userId = this.C_ID;
      return new Promise((resolve, reject) => {
        db.query("USE CAPSTONE", (err, result) => {
          if (err) reject(err);
          
          const queryUserInfo = "SELECT * FROM CEO JOIN STORE ON CEO.S_ID = STORE.S_ID WHERE CEO.C_ID = ?";
          // const queryParams = [userId]; // 쿼리 매개변수를 배열로 전달
    
          db.query(queryUserInfo, [userId], (err, data) => {
            if (err) reject(err);
            else {
              console.log("asdfasdf");
              console.log(userId);
              resolve(data[0]);
            }
          });
        });
      });
    }
  

}

module.exports = Edit;

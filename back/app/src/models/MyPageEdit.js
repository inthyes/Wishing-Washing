"use strict";
const db = require("../config/db");
const {response} = require("express");
const crypto = require("crypto");

class MyPageEdit {
    constructor(body, U_ID) {
        // this.body에는 req.params.id가 들어가있음
        this.body = body;
        this.U_ID = U_ID;
      }
      async update() {
        const password = this.body.password;
        const phone = this.body.phone;
        const address = this.body.address;
        const U_ID = this.U_ID;
        var salt = Math.round(new Date().valueOf() * Math.random()) + "";
        var hashPsword = crypto
          .createHash("sha512")
          .update(password + salt)
          .digest("hex");
        const PW = await MyPageEdit.PW(hashPsword,phone,address, U_ID);
        return PW;
        
    }
    
    static async PW(password,phone,address, U_ID) {
      return new Promise ((resolve, reject) => {
      db.query("USE CAPSTONE", (err, result) => {
          const query = "UPDATE USERS SET U_PW = ?, U_PHONE=?, U_ADDRESS = ? WHERE U_ID = ?;";
          if (err) reject(err);
          //const keys = Object.keys(query);
          db.query(query,  [password, phone, address, U_ID], (err, data) => {
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


module.exports = MyPageEdit; 
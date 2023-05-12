"use strict";
const db = require("../config/db");
const {response} = require("express");
const crypto = require("crypto");

class Edit {
    constructor(body, S_ID) {
        this.body = body;
        this.S_ID = S_ID;
      }
      async profileUpdate() {
        const password = this.body.password;
        const phone = this.body.phone;
        const email = this.body.email;
        const S_ID = this.S_ID;
        var salt = Math.round(new Date().valueOf() * Math.random()) + "";
        var hashPsword = crypto
          .createHash("sha512")
          .update(password + salt)
          .digest("hex");
        const update = await Edit.profile(hashPsword,phone,email, S_ID);
        return update;
        
    }
    async laundryUpdate() {
      const phone = this.body.phone;
      const address = this.body.address;
      const open = this.body.openTime;
      const close = this.body.closeTime;
      const info = this.body.info;
      const announce = this.body.announce;
      const S_ID = this.S_ID;
      const update = await Edit.laundry(S_ID,phone,address,open,close,info,announce);
    }
    
    static async profile(password,phone,email, S_ID) {
      return new Promise ((resolve, reject) => {
      db.query("USE CAPSTONE", (err, result) => {
          const query = "UPDATE CEO SET C_PW = ?, C_PHONE=?, S_mail = ? WHERE S_ID = ?;";
          if (err) reject(err);
          //const keys = Object.keys(query);
          db.query(query,  [password, phone, email, S_ID], (err, data) => {
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
  static async laundry(S_ID,phone,address,open,close,info,announce,update) {
    return new Promise ((resolve, reject) => {
    db.query("USE CAPSTONE", (err, result) => {
        const query = "UPDATE STORE SET S_PHONE = ?, S_ADDR1=?, S_OPENING =?, S_CLOSING = ?, S_COMMENT =?, S_ANNOUNCE =? WHERE S_ID = ?;";
        if (err) reject(err);
        //const keys = Object.keys(query);
        db.query(query,  [phone,address,open,close,info,announce,S_ID], (err, data) => {
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


module.exports = Edit; 
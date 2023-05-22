"use strict";
const db = require("../config/db");
const {response} = require("express");
const crypto = require("crypto");

class Edit {
    constructor(body, S_ID) {
        this.body = body;
        this.S_ID = S_ID;
      }

      async showLaundry() {
        const S_ID = this.S_ID;
        const data = await Edit.show(S_ID);
        return data;
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
      const phone = this.body.S_PHONE;
      const S_ADDR1 = this.body.S_ADDR1;
      const S_ADDR2 = this.body.S_ADDR2;
      const S_ADDR3 = this.body.S_ADDR3;
      const open = this.body.S_OPENING;
      const close = this.body.S_CLOSING;
      const info = this.body.S_COMMENT;
      const announce = this.body.S_ANNOUNCE;
      const S_ID = this.S_ID;
      const update = await Edit.laundry(S_ID,phone,S_ADDR1,S_ADDR2,S_ADDR3,open,close,info,announce);
    }
    

    static async show(S_ID) {
      return new Promise ((resolve, reject) => {
      db.query("USE CAPSTONE", (err, result) => {
          const query = "SELECT * FROM store where S_ID = ?;";
          if (err) reject(err);
          //const keys = Object.keys(query);
          db.query(query,  [S_ID], (err, data) => {
              if (err) reject(err);
              else {
                  const show = data;
                  resolve(
                    show
                  )
                  }
              });
            })
      });
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
  static async laundry(S_ID,phone,S_ADDR1,S_ADDR2,S_ADDR3,open,close,info,announce) {
    return new Promise ((resolve, reject) => {
    db.query("USE CAPSTONE", (err, result) => {
        const query = "UPDATE STORE SET S_PHONE = ?, S_ADDR1=?,S_ADDR2=?,S_ADDR3=?, S_OPENING =?, S_CLOSING = ?, S_COMMENT =?, S_ANNOUNCE =? WHERE S_ID = ?;";
        if (err) reject(err);
        //const keys = Object.keys(query);
        db.query(query,  [phone,S_ADDR1,S_ADDR2,S_ADDR3,open,close,info,announce,S_ID], (err, data) => {
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
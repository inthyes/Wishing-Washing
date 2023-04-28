"use strict";
const db = require("../config/db");
const {response} = require("express");
//const LaundryDetail = require("./LaundryDetail");

// 세탁소 클래스 생성

class Likes {
    constructor(body, U_ID) {
        // this.body에는 req.params.id가 들어가있음
        this.body = body;
        this.U_ID = U_ID;
      }
      async insert() {
        const like = this.body.like;
        const S_ID = this.body.laundryId;
        const U_ID = this.U_ID;
        console.log(like,S_ID,U_ID);
        if(like == 1)
        {
            const plus = await Likes.plus(S_ID,U_ID);
            return plus;
        }
        if(like == 0)
        {
            const minus = await Likes.minus(S_ID,U_ID);
            return minus;
        }
        
        
        //detail에는 db에서 가져온 세탁소의 id와 name이 포함.
    }
    
    static async plus(S_ID,U_ID) {
      return new Promise ((resolve, reject) => {
      db.query("USE CAPSTONE", (err, result) => {
          const query = "INSERT INTO LIKES(S_ID, U_ID) VALUES (? , ?);";
          if (err) reject(err);
          //const keys = Object.keys(query);
          db.query(query, [parseInt(S_ID),U_ID], (err, data) => {
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
  static async minus(S_ID,U_ID) {
    return new Promise ((resolve, reject) => {
    db.query("USE CAPSTONE", (err, result) => {
        const query = "delete from LIKES where S_ID = ? AND U_ID = ?;";
        if (err) reject(err);
        //const keys = Object.keys(query);
        db.query(query, [parseInt(S_ID),U_ID], (err, data) => {
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


module.exports = Likes; 
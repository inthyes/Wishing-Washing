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
//상점별 like개수
static async getLikedStore() {
  return new Promise((resolve, reject) => {
    db.query("USE CAPSTONE", (err, result) => {
      if (err) reject(err);
      const query = `
        SELECT S_ID, COUNT(U_ID) as like_count
        FROM LIKES
        GROUP BY S_ID
        ORDER BY like_count DESC;
      `;
      db.query(query, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  });
}

async likeStatus(S_ID, U_ID) {
  return new Promise((resolve, reject) => {
    db.query("USE CAPSTONE", (err, result) => {
      if (err) reject(err);
      const query = "SELECT * FROM LIKES WHERE S_ID = ? AND U_ID = ?";
      db.query(query, [parseInt(S_ID),U_ID],(err, data) => {
        if (err) reject(err);
        else  {
          if (data != "") data = 1;
          else data = 0;
          resolve(data);
        }
      });
    });
  });
}
      
}


module.exports = Likes; 
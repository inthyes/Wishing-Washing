"use strict";
const db = require("../config/db");
const {response} = require("express");


class Review {
    constructor(body, S_ID) {
        // this.body에는 req.params.id가 들어가있음
        this.S_ID = S_ID;
        this.body = body;
      }
      async showReview() {
        const S_ID = this.S_ID;
        console.log(S_ID);
        const show = await Review.show(S_ID);
        return show;
      }

        async reviewUpdate() {
          const O_NUM= this.body.O_NUM;
          const CEO_COMMENT= this.body.CEO_COMMENT;
          const S_ID = this.S_ID;
          const update = await Review.reviewUpdate(O_NUM, CEO_COMMENT, S_ID);
          return update;
        }
    
  static async show(S_ID) {
    return new Promise ((resolve, reject) => {
    db.query("USE CAPSTONE", (err, result) => {
        const query = "SELECT * FROM REVIEW where S_ID = ?;";
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
static async reviewUpdate(O_NUM, CEO_COMMENT, S_ID) {
  return new Promise ((resolve, reject) => {
  db.query("USE CAPSTONE", (err, result) => {
      const query = "UPDATE REVIEW SET CEO_COMMENT = ?, S_ID=? WHERE O_NUM = ?;";
      if (err) reject(err);
      //const keys = Object.keys(query);
      db.query(query,  [CEO_COMMENT, S_ID, O_NUM], (err, data) => {
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


module.exports = Review; 
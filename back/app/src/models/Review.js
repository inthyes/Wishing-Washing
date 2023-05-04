"use strict";
const db = require("../config/db");
const {response} = require("express");


class Review {
    constructor(body, U_ID) {
        // this.body에는 req.params.id가 들어가있음
        this.body = body;
        this.U_ID = U_ID;
      }
      async showReview() {
        const S_ID = this.body;
        const show = await Review.show(S_ID);
        return show;
      }
      async update() {
        const S_ID = this.body.S_ID;
        const title = this.body.title;
        const body = this.body.body;
        const rating = this.body.rating;
        const U_ID = this.U_ID;
        const O_NUM = this.body.O_NUM;

        const RV = await Review.review(O_NUM, S_ID, title, body, rating, U_ID);
        return RV;
        
    }
    
    static async review(O_NUM, S_ID, title, body, rating, U_ID) {
      return new Promise ((resolve, reject) => {
      db.query("USE CAPSTONE", (err, result) => {
          const query = "INSERT INTO REVIEW (O_NUM,S_ID, REVIEW_TEXT, REVIEW_START, U_ID) VALUES (?,? , ?,?,?);";
          if (err) reject(err);
          //const keys = Object.keys(query);
          db.query(query,  [O_NUM,S_ID, body, rating, U_ID], (err, data) => {
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
  static async show(S_ID, U_ID) {
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
      
}


module.exports = Review; 
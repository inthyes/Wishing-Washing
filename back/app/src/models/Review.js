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
        const S_ID = this.body.storeId;
        const title = this.body.title;
        const content = this.body.content;
        const rating = this.body.rating;
        const U_ID = this.U_ID;
        const O_NUM = this.body.orderNum;
        const date = this.body.date;

        const RV = await Review.review(O_NUM, S_ID, title, content, rating, U_ID, date);
        return RV;
        
    }
    
    static async review(O_NUM, S_ID, title, content, rating, U_ID, date) {
      return new Promise ((resolve, reject) => {
      db.query("USE CAPSTONE", (err, result) => {
          const query = "INSERT INTO REVIEW (O_NUM, S_ID, REVIEW_TITLE, REVIEW_TEXT, REVIEW_STAR, U_ID, REGI_DATE) VALUES (?, ?,?,?,?,?,?);";
          if (err) reject(err);
          //const keys = Object.keys(query);
          db.query(query,  [O_NUM, S_ID, title, content, rating, U_ID, date], (err, data) => {
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

  async averageStar(S_ID) {
    return new Promise ((resolve, reject) => {
      let reviewStar = 0;
      let starAverage;
      db.query("USE CAPSTONE", (err, result) => {
          const queryGetStore = "SELECT REVIEW_STAR FROM REVIEW where S_ID = ?;";
          if (err) reject(err);
          db.query(queryGetStore,  [S_ID], (err, data) => {
              if (err) reject(err);
              else {
                for (var i = 0; i < data.length; i++) {
                  reviewStar = reviewStar + data[i].REVIEW_STAR;
                }
                starAverage = (reviewStar/data.length).toFixed(1);
                resolve(
                  starAverage
                )
                }
              });
          })
      });
  }

  async myReview() {
      return new Promise ((resolve, reject) => {
        let userId = this.U_ID;
        db.query("USE CAPSTONE", (err, result) => {
            const queryGetMyReview = "SELECT * FROM REVIEW\
                    INNER JOIN STORE on REVIEW.S_ID = STORE.S_ID WHERE U_ID = ?;";
            if (err) reject(err);
            db.query(queryGetMyReview,  userId, (err, data) => {
                if (err) reject(err);
                else {
                  resolve(
                    data
                  )
                  }
                });
            })
        });
  }

  async countReview(storeId) {
    return new Promise ((resolve, reject) => {
      db.query("USE CAPSTONE", (err, result) => {
          const queryCountReview = "SELECT * FROM REVIEW WHERE S_ID = ?;";
          if (err) reject(err);
          db.query(queryCountReview,  storeId, (err, data) => {
              if (err) reject(err);
              else {
                resolve(data.length)
                }
              });
          })
      });
}
}



module.exports = Review; 
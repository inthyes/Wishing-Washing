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
      async write() {
        const S_ID = this.body.storeId;
        const title = this.body.title;
        const content = this.body.content;
        const rating = this.body.rating;
        const U_ID = this.U_ID;
        const O_NUM = this.body.orderNum;
        const date = this.body.date;

        const RV = await Review.writeReview(O_NUM, S_ID, title, content, rating, U_ID, date);
        return RV;
      }
      async update(orderNum) {
        const content = this.body.content;
        const rating = this.body.rating;

        const O_NUM = orderNum;
        const date = this.body.date;

        const RV = await Review.updateReview(O_NUM, content, rating, date);
        return RV;
      }
      async updateInfo() {
        const content = this.body.content;
        const rating = this.body.rating;
        
        const O_NUM = this.body.orderNum;
        const date = this.body.date;

        const RV = await Review.getUpdateInfo(O_NUM);
        return RV;
      }

      // 리뷰 삭제
      async delete(orderNumber) {
        return new Promise ((resolve, reject) => {
          db.query("USE CAPSTONE", (err, result) => {
              const query = "DELETE FROM REVIEW WHERE O_NUM = ?";
              if (err) reject(err);
              db.query(query,  orderNumber, (err, data) => {
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
      // 리뷰 수정
      static async updateReview(O_NUM, content, rating, date) {
        return new Promise ((resolve, reject) => {
          db.query("USE CAPSTONE", (err, result) => {
              const query = "UPDATE REVIEW SET REVIEW_TEXT = ?, REGI_DATE = ?, REVIEW_STAR = ? WHERE O_NUM = ?;"
              if (err) reject(err);
              db.query(query,  [content, date, rating, O_NUM], (err, data) => {
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
      //리뷰 수정 폼에 get요청 됨 => 리뷰 정보 가져옴
      async getUpdateInfo(O_NUM, S_ID) {
        return new Promise ((resolve, reject) => {
          db.query("USE CAPSTONE", (err, result) => {
              const query = "SELECT * FROM REVIEW INNER JOIN STORE ON REVIEW.S_ID = STORE.S_ID WHERE O_NUM = ?;"
              if (err) reject(err);
              db.query(query,  O_NUM, (err, data) => {
                  if (err) reject(err);
                  else {
                      resolve(data[0])
                      }
                  });
                })
          });  
      }
    static async writeReview(O_NUM, S_ID, title, content, rating, U_ID, date) {
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
    return new Promise((resolve, reject) => {
      let userId = this.U_ID;
      db.query("USE CAPSTONE", (err, result) => {
        const queryGetMyReview = "SELECT * FROM REVIEW INNER JOIN STORE ON REVIEW.S_ID = STORE.S_ID WHERE U_ID = ?;";
        if (err) reject(err);
        db.query(queryGetMyReview, userId, (err, data) => {
          if (err) reject(err);
          else {
            resolve(data);
          }
        });
      });
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
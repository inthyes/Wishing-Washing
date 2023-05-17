"use strict";
const db = require("../config/db");
const {response} = require("express");
//const LaundryDetail = require("./LaundryDetail");

// 세탁소 클래스 생성

class MyPage {
    constructor(body) {
        // this.body에는 req.params.id가 들어가있음
        this.body = body;
      }
      async showFavoriteList() {
        const id = this.body;
        const List = await MyPage.showList(id);
        //detail에는 db에서 가져온 세탁소의 id와 name이 포함.

        if(List) {
            //detail에는 db에서 가져온 세탁소의 id와 body로 담겨온 index 비교
              return List;
        }
    }
    static async showList(id) {
      return new Promise ((resolve, reject) => {
      db.query("USE CAPSTONE", (err, result) => {
          const query = "SELECT LIKES.S_ID, S_NAME, S_ADDR2\
                          FROM LIKES\
                          left outer JOIN STORE ON LIKES.S_ID = store.S_ID\
                          where U_ID = ?;"
          if (err) reject(err);
          const keys = Object.keys(query);
          db.query(query, [id], (err, data) => {
              if (err) reject(err);
              else {
                  // resolve(data)
                  }
              });
            })
      });
  }   

  async showMyPageInfo(userId) {
    return new Promise ((resolve, reject) => {
    db.query("USE CAPSTONE", (err, result) => {
        const queryGetUser = "SELECT * FROM USERS where U_ID = ?;";
        const queryGetOrderComplete = "SELECT COUNT(*) AS count FROM ORDER_COMPLETE WHERE U_ID = ?;"
        const queryReview = "SELECT COUNT(*) AS count FROM REVIEW WHERE U_ID = ?;"
        if (err) reject(err);
        db.query(queryGetUser, userId, (err, data) => {
            if (err) reject(err);
            else {
                db.query(queryGetOrderComplete, userId, (err, result) => {
                  if (err) reject(err);
                  else {
                    const countHistory = result[0].count;
                    data[0].countHistory = countHistory;

                    db.query(queryReview, userId, (err, complete) => {
                      if (err) reject(err);
                      else {
                        const countReview = complete[0].count;
                        data[0].countReview = countReview;
                        resolve(data[0]);
                      }
                    })
                  }
                })
                }
            });
          })
    });
  }   
}


module.exports = MyPage; 
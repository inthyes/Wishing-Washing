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
        console.log(List);
        //detail에는 db에서 가져온 세탁소의 id와 name이 포함.

        if(List) {
            //detail에는 db에서 가져온 세탁소의 id와 body로 담겨온 index 비교
              return List;
        }
    }
    static async showList(id) {
      return new Promise ((resolve, reject) => {
      db.query("USE CAPSTONE", (err, result) => {
          const query = "SELECT * FROM LIKES where U_ID = ?;";
          if (err) reject(err);
          const keys = Object.keys(query);
          db.query(query, [id], (err, data) => {
              if (err) reject(err);
              else {
                  const list = data;
                 
                  console.log(list);
                  resolve({
                    id: list[0].S_ID
                      // 객체 배열화
                  })
                  }
              });
            })
      });
  }   
}


module.exports = MyPage; 
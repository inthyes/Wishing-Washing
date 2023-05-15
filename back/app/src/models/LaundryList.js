"use strict";
const db = require("../config/db");


class LaundryList {
    constructor(body, deliveryAddress1, deliveryAddress2) {
        this.deliveryAddress1 = deliveryAddress1;
        this.deliveryAddress2 = deliveryAddress2;
    }

    async getLaundryInfo() {
        // const postNum = parseInt(this.deliveryAddress1);
        const nearPostNum = this.deliveryAddress1.slice(0, 3);

        return new Promise((resolve, reject) => {
          db.query("USE CAPSTONE", (err, result) => {
            const query = 
            "SELECT STORE.S_ID, STORE.S_ADDR2, STORE.S_NAME,STORE.S_COMMENT, LIKES.U_ID\
            FROM STORE\
            left outer JOIN likes ON STORE.S_ID = likes.S_ID\
            WHERE substr(S_ADDR1, 1, 3) = ?;"

            if (err) reject(err);
            db.query(query, nearPostNum, (err, data) => {
              if (err) reject(err);
              else {
                for (let i = 0; i < data.length; i++) {
                  if (data[i].U_ID != null) data[i].userLike = 1;
                  else data[i].userLike = 0;
                  }
                resolve(data);
              }
            });
          });
        });
      }

      // async searchLaundry() {
      //   const searchData = this.body;
      //   const value = searchData.search;
      //   return new Promise((resolve, reject) => {
      //     db.query("USE CAPSTONE", (err, result) => {
      //       const query = "SELECT * FROM STORE where S_ADDRESS LIKE '%" + value + "%';";
      //       //const query = "SELECT * FROM store_list;";
      //       //console.log(query);
      //       if (err) reject(err);
      //       db.query(query, [value], (err, data) => {
      //         if (err) reject(err);
      //         else {
      //           resolve(data);
      //         }
      //       });
      //     });
      //   });
      // }

    
}

module.exports = LaundryList;


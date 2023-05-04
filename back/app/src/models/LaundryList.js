"use strict";
const db = require("../config/db");


class LaundryList {
    constructor(deliveryAddress1, deliveryAddress2) {
        this.deliveryAddress1 = deliveryAddress1;
        this.deliveryAddress2 = deliveryAddress2;
    }

    async getLaundryInfo() {
        if (this.deliveryAddress1[0] == "0") {
          console.log(this.deliveryAddress1);
        }
        // const postNum = parseInt(this.deliveryAddress1);
        const nearPostNum = this.deliveryAddress1.slice(0, 3);

        return new Promise((resolve, reject) => {
          db.query("USE CAPSTONE", (err, result) => {
            const query = "SELECT * FROM STORE WHERE substr(S_ADDR1, 1, 3) = ?;";
            // const query = "SELECT * FROM STORE where S_ADDR1 LIKE '%" + value + "%';";
            //const query = "SELECT * FROM store_list;";
            //console.log(query);
            if (err) reject(err);
            db.query(query, nearPostNum, (err, data) => {
              if (err) reject(err);
              else {
                resolve(data);
              }
            });
          });
        });
      }
    
}

module.exports = LaundryList;


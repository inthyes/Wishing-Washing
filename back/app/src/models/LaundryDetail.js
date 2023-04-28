"use strict";
const db = require("../config/db");

class LaundryDetail {
    static getLaundrys(isALl, ...fields) {};


    //런더리 디테일을 db에서 찾아오는...
    static getLaundryDetail(id) {
        return new Promise ((resolve, reject) => {
        db.query("USE CAPSTONE", (err, result) => {
            const query = "SELECT * FROM STORE where S_ID = ?;";
            if (err) reject(err);
            db.query(query, [id], (err, data) => {
                if (err) reject(err);
                else {
                    const laundry = data[0];
                    resolve({
                        id: laundry.S_ID,
                        name: laundry.S_NAME,
                        // 객체 배열화
                    })
                    }
                });
              })
        });
    }
}

module.exports = LaundryDetail;
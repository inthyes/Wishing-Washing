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
                        phone : laundry.S_PHONE,
                        postAddress : laundry.S_ADDR1,
                        doroAddress : laundry.S_ADDR2,
                        detailAddress : laundry.S_ADDR3,
                        info : laundry.S_COMMENT,
                        anno: laundry.S_ANNOUNCE,
                        opening : laundry.S_OPENING,
                        closing : laundry.S_CLOSING
                    })
                    }
                });
              })
        });
    }

    static getLaundryDetailNoUserId(id) {
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
                        phone : laundry.S_PHONE,
                        postAddress : laundry.S_ADDR1,
                        doroAddress : laundry.S_ADDR2,
                        detailAddress : laundry.S_ADDR3,
                        info : laundry.S_COMMENT,
                        anno: laundry.S_ANNOUNCE,
                        opening : laundry.S_OPENING,
                        closing : laundry.S_CLOSING
                    })
                    }
                });
              })
        });
    }
}

module.exports = LaundryDetail;
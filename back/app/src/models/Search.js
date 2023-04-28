"use strict";
const db = require("../config/db");

class Search {
    constructor(body) {
        this.body = body;
    }
    async getLaundryInfo() {
        const searchData = this.body;
        const value = searchData.search;
        return new Promise((resolve, reject) => {
          db.query("USE CAPSTONE", (err, result) => {
            const query = "SELECT * FROM STORE where S_ADDRESS LIKE '%" + value + "%';";
            //const query = "SELECT * FROM store_list;";
            //console.log(query);
            if (err) reject(err);
            db.query(query, [value], (err, data) => {
              if (err) reject(err);
              else {
                resolve(data);
              }
            });
          });
        });
      }
    
}

module.exports = Search;


"use strict";
const db = require("../../config/db");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    //console.log('search');
    //console.log('Param: ' + req.query.search);
    let data = await getLaundryInfo(req.query.search);
    //console.log(data);
    res.render("home/laundry", {
        data,
      });
});

function getLaundryInfo(ro) {
    return new Promise((resolve, reject) => {
      db.query("USE CAPSTONE", (err, result) => {
        const query = "SELECT * FROM STORE where S_ADDRESS LIKE '%" + ro + "%';";
        //const query = "SELECT * FROM store_list;";
        //console.log(query);
        if (err) reject(err);
        db.query(query, [ro], (err, data) => {
          if (err) reject(err);
          else {
            resolve(data);
          }
        });
      });
    });
  }


module.exports = router; //웹으로 내보내기

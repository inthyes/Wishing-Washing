// const mysql = require("mysql2");
const mysql = require("mysql");

const db = mysql.createPool({
    // host : process.env.DB_HOST,
    // user : process.env.DB_USER,
    // password: process.env.DB_PSWORD,
    // database:  process.env.DB_DATABASE
    host : "localhost",
    user : "root",
    // password: "0000",
    password: "1234",
    // password: "d58ed86f!!",

    database:  "CAPSTONE"
});

// db.connect();

module.exports = db;
var express = require("express");
var router = express.Router();
const db = require("../../config/db");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));


router.post("/", async (req, res) => {
  console.log(req.url, req.method);

  const paramId = req.body.id;
  const parammail = req.body.mail;
  const paramName = req.body.name;
  const paramPhone = req.body.phone;
  const paramNum = req.body.num; //사업자번호 받기
  const paramS_ID = req.body.S_ID; //세탁소ID 찾아서 받기
  const paramPsword = req.body.psword;
  const paramPswordCheck = req.body.confirmPsword;
  
  db.getConnection((err, conn) => {
    if (err) {
      console.log("SQL 실행 시 오류 발생_아이디 중복 문제");
      console.dir(err);
      const json = {
        code: 404,
        message: "사용중인 아이디입니다. 다른 아이디를 사용해주세요.",
      };
      res.status(404).send(json);
      return;
    }

    // 중복 검사
    const query = "SELECT COUNT(*) AS count FROM CEO WHERE C_ID = ?";
    conn.query(query, [paramId], (err, result) => {
      if (err) {
        console.log("SQL 실행 시 오류 발생_아이디 중복 검사");
        console.dir(err);
        res.status(500).send("아이디 중복 검사 중 오류가 발생했습니다.");
        return;
      }

      const count = result[0].count;
      const duplicate = count > 0;

      if (duplicate) {
        const json = {
          code: 409,
          message: "이미 사용중인 아이디입니다. 다른 아이디를 사용해주세요.",
        };
        res.status(409).send(json);
        return;
      }

  //패스워드 암호화
  var salt = Math.round(new Date().valueOf() * Math.random()) + "";
  var hashPsword = crypto
    .createHash("sha512")
    .update(paramPsword + salt)
    .digest("hex");

    
  // db.getConnection((err, conn) => {
  //   if (err) {
  //       console.log("SQL 실행 시 오류 발생_아이디 중복 문제");
  //       console.dir(err);
  //       const json ={
  //         code: 404,
  //         message: "사용중인 아이디입니다. 다른 아이디를 사용해주세요."
  //       }
  //       res.status(404).send(json);
  //       return;
  //     }
      
    // sql 연결 성공 시
    // console.log("데이터베이스 연결");


    const exec = conn.query(
      "insert into CEO (C_ID, S_MAIL, C_NAME, C_PHONE,S_NUM, S_ID, C_PW, SALT) values (?, ?, ?, ?, ?, ? , ?, ?);",
      [paramId, parammail, paramName,paramPhone,paramNum, paramS_ID, hashPsword, salt],
      
      (err, result) => {
        conn.release();
        console.log("실행된 SQL: " + exec.sql);

        if (err) {
          console.log("SQL 실행 시 오류 발생; 아이디 중복 문제");
          console.dir(err);
          res.writeHead("200", { "content-Type": "application/javascript" });
          res.write("<h2>SQL 실행 실패; 아이디 중복 문제</h2>");
          res.end();
          res.status(404).send("중복!! Sorry, we cannot find that!");
          return;
        }

        if (result) {
          if (paramPsword != paramPswordCheck) {
            res.writeHead("200", { "content-Type": "application/javascript" });
            res.write("<h2>비밀번호 불일치</h2>");
            res.end();
            return;
          }
          console.dir(result);
          console.log("INSERT 성공");
          res.writeHead("200", { "content-Type": "application/javascript" });
          res.write("<h2>사용자 추가 성공</h2>");
          res.end();
        } else {
          console.log("INSERT 실패");
          res.writeHead("400", { "content-Type": "application/javascript" });
          res.write("<h2>사용자 추가 실패</h2>");
          res.end();
        }
      }
    );
});
});
});

module.exports = router;

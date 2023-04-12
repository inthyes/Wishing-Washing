var express = require("express");
var router = express.Router();
const db = require("../../config/db");

const crypto = require("crypto");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/", (req, res) => {
  console.log("/members/new 호출됨 " + req);

  const paramId = req.body.id;
  const paramName = req.body.name;
  const paramPsword = req.body.psword;
  const paramPswordCheck = req.body.confirmPsword;
  console.log("받은 데이터 : ", paramId,paramName,paramPsword, paramPswordCheck);

  //패스워드 암호화
  var salt = Math.round(new Date().valueOf() * Math.random()) + "";
  var hashPsword = crypto
    .createHash("sha512")
    .update(paramPsword + salt)
    .digest("hex");

    
  db.getConnection((err, conn) => {
    if (err) {
        console.log("SQL 실행 시 오류 발생_아이디 중복 문제");
        console.dir(err);
        const json ={
          code: 404,
          message: "사용중인 아이디입니다. 다른 아이디를 사용해주세요."
        }
        res.status(404).send(json);
        return;
      }
      
    // sql 연결 성공 시
    console.log("데이터베이스 연결");
    // sql qeury문 삽입 -> ?에 순서대로 대괄호 안의 내용이 삽입됨
    const exec = conn.query(
      "insert into USERS (id, name, psword, salt) values (?, ?, ?, ?);",
      [paramId, paramName,hashPsword, salt],
      //sql query 실행 실패, 혹은 성공할 경우에 대한 코드
      (err, result) => {
        conn.release();
        console.log("실행된 SQL: " + exec.sql);

        // 2. id 중복 문제 => 중복 확인 버튼 클릭 시 중복 여부 확인으로 변경해야댐
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
          //3. pw 불일치 문제 => RegisterPage.jsx에서 처리했음
          if (paramPsword != paramPswordCheck) {
            res.writeHead("200", { "content-Type": "application/javascript" });
            res.write("<h2>비밀번호 불일치</h2>");
            res.end();
            return;
            ``;
          }
          console.dir(result);
          console.log("INSERT 성공");
          res.writeHead("200", { "content-Type": "application/javascript" });
          res.write("<h2>사용자 추가 성공</h2>");
          res.end();
        } else {
          console.log("INSERT 실패");
          res.writeHead("200", { "content-Type": "application/javascript" });
          res.write("<h2>사용자 추가 실패</h2>");
          res.end();
        }
      }
    );
  });
});

module.exports = router;

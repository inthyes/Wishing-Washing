var express = require("express");
var router = express.Router();
const db = require("../../config/db");

const crypto = require("crypto");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/", (req, res) => {

  const paramId = req.body.id;
  const parammail = req.body.mail;
  const paramName = req.body.name;
  const paramPhone = req.body.phone;
  const paramNum = req.body.num; //사업자번호 받기
  const paramS_ID = req.body.S_ID; //세탁소ID 찾아서 받기
  const paramPsword = req.body.psword;
  const paramPswordCheck = req.body.confirmPsword;
  

  console.log("받은 데이터 : ", paramId,parammail,paramName,paramPhone,paramNum, paramS_ID,paramPsword, paramPswordCheck);

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
          code: 403,
          message: "사용중인 아이디입니다. 다른 아이디를 사용해주세요."
        }
        res.status(404).send(json);
        return;
      }
      
    // sql 연결 성공 시
    console.log("데이터베이스 연결");
    // sql qeury문 삽입 -> ?에 순서대로 대괄호 안의 내용이 삽입됨
    // 디비 쿼리 고쳐야함
    const exec = conn.query(
      "insert into CEO (C_ID, S_MAIL, C_NAME, C_PHONE,S_NUM, S_ID, C_PW, SALT) values (?, ?, ?, ?, ?, ? , ?, ?);",
      [paramId, parammail, paramName,paramPhone,paramNum, paramS_ID, hashPsword, salt],
      //sql query 실행 실패, 혹은 성공할 경우에 대한 코드
      (err, result) => {
        conn.release();
        console.log("실행된 SQL: " + exec.sql);

        // 2. id 중복 문제 => 중복 확인 버튼 클릭 시 중복 여부 확인으로 변경해야댐
        if (err) {
          console.log("SQL 실행 시 오류 발생; 아이디 중복 문제");
          console.dir(err);
          const json = {
            code: 404,
            message: "사용중인 아이디입니다. 다른 아이디를 사용해주세요."
          }
          res.status(404).send(json);
          return;
        }
        

        // if (result) {
        //   //3. pw 불일치 문제 => RegisterPage.jsx에서 처리했음
        //   if (paramPsword != paramPswordCheck) {
        //     res.writeHead("200", { "content-Type": "application/javascript" });
        //     res.write("<h2>비밀번호 불일치</h2>");
        //     res.end();
        //     return;
        //     ``;
        //   }
        //   console.dir(result);
        //   console.log("INSERT 성공");
        //   res.writeHead("200", { "content-Type": "application/javascript" });
        //   res.write("<h2>사용자 추가 성공</h2>");
        //   res.end();
        // } else {
        //   console.log("INSERT 실패");
        //   res.writeHead("200", { "content-Type": "application/javascript" });
        //   res.write("<h2>사용자 추가 실패</h2>");
        //   res.end();
        // }
        if (result) {
          if (paramPsword != paramPswordCheck) {
            sendResponse(res, "<h2>비밀번호 불일치</h2>");
            return;
          }
          console.dir(result);
          console.log("INSERT 성공");
          sendResponse(res, "<h2>사용자 추가 성공</h2>");
        } else {
          console.log("INSERT 실패");
          sendResponse(res, "<h2>사용자 추가 실패</h2>");
        }
        
        function sendResponse(res, message) {
          res.writeHead("200", { "content-Type": "application/javascript" });
          res.write(message);
          res.end();
        }
        
      }
    );
  });
});

module.exports = router;

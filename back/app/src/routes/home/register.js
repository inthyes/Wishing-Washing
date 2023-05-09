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
  const paramName = req.body.name;
  const paramPsword = req.body.psword;
  const paramPswordCheck = req.body.confirmPsword;
  const paramPhone = req.body.phone;
  const paramMail = req.body.email;
  console.log("받은 데이터 : ", paramId,paramName,paramPsword, paramPswordCheck);
  
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
    const query = "SELECT COUNT(*) AS count FROM USERS WHERE U_ID = ?";
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
      "insert into USERS (U_ID, U_NAME, U_PW, U_PHONE, U_MAIL, salt) values (?, ?, ?, ?, ?, ?);",
      [paramId, paramName,hashPsword, paramPhone, paramMail, salt],
      
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

// var express = require("express");
// var router = express.Router();
// const db = require("../../config/db");

// const crypto = require("crypto");

// router.use(express.json());
// router.use(express.urlencoded({ extended: false }));

// router.post("/", (req, res) => {
//   console.log(req.url, req.method);

//   const paramId = req.body.id;
//   const paramName = req.body.name;
//   const paramPsword = req.body.psword;
//   const paramPswordCheck = req.body.confirmPsword;
//   const paramPhone = req.body.phone;
//   const paramMail = req.body.email;
//   console.log("받은 데이터 : ", paramId, paramName, paramPsword, paramPswordCheck);

//   //패스워드 암호화
//   var salt = Math.round(new Date().valueOf() * Math.random()) + "";
//   var hashPsword = crypto
//     .createHash("sha512")
//     .update(paramPsword + salt)
//     .digest("hex");

//   db.getConnection((err, conn) => {
//     if (err) {
//       console.log("SQL 실행 시 오류 발생_아이디 중복 문제");
//       console.dir(err);
//       const json = {
//         code: 404,
//         message: "사용중인 아이디입니다. 다른 아이디를 사용해주세요.",
//       };
//       res.status(404).send(json);
//       return;
//     }

//     // sql 연결 성공 시
//     console.log("데이터베이스 연결");

//     const checkDuplicateQuery = conn.query(
//       "SELECT * FROM USERS WHERE U_MAIL = ?",
//       [paramMail],
//       (err, duplicateResult) => {
//         if (err) {
//           console.log("SQL 실행 시 오류 발생; 이메일 중복 문제");
//           console.dir(err);
//           res.status(500).send("이메일 중복 문제");
//           return;
//         }
    
//         if (duplicateResult.length > 0) {
//           console.log("중복된 이메일입니다.");
//           res.status(409).send("이미 사용중인 이메일입니다."); // Conflict: 409 status code
//           return;
//         }
    
//         // 이메일 중복이 아닌 경우 회원 가입 쿼리 실행
//         const addUserQuery = conn.query(
//           "INSERT INTO USERS (U_ID, U_NAME, U_PW, U_PHONE, U_MAIL, salt) VALUES (?, ?, ?, ?, ?, ?)",
//           [paramId, paramName, hashPsword, paramPhone, paramMail, salt],
//           (err, result) => {
//             conn.release();
    
//             if (err) {
//               console.log("SQL 실행 시 오류 발생; 회원 가입 문제");
//               console.dir(err);
//               res.status(500).send("회원 가입 문제");
//               return;
//             }
    
//             if (result) {
//               if (paramPsword !== paramPswordCheck) {
//                 res.status(400).send("비밀번호 불일치"); // Bad Request: 400 status code
//                 return;
//               }
    
//               console.dir(result);
//               console.log("INSERT 성공");
//               res.status(200).send("사용자 추가 성공"); // OK: 200 status code
//             } else {
//               console.log("INSERT 실패");
//               res.status(500).send("사용자 추가 실패"); // Internal Server Error: 500 status code
//             }
//           });
//         });
//       });
// })
// module.exports = router;

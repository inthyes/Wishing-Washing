var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../../config/db");

const crypto = require("crypto");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

process.setMaxListeners(0);

router.post("/", (req, res) => {

  console.log("/login 호출됨");
  const id = req.body.id;
  const psword = req.body.psword;

  var json = {};


  db.getConnection((err, conn) => {
    //db 연결 실패
    if (err) {
      console.log("Mysql 연결 실패");
      conn.release();
      console.log(json);
      const json = {
        code : 404,
        message :"DB 서버 연결 실패"
      }
      return res.status(404).send(json);
    }
    // db 연결 성공
    console.log("DB 연결 성공");

    const exec = conn.query(
      "select S_ID, salt, C_PW from CEO where C_ID='" + id + "';",
      (err, data) => {
        console.log("실행된 SQL: " + exec.sql);
        // sql 오류
        if (err) {
        const json ={
            code : 404,
            message: "sql실행 실패"
        };
          return res.status(404).send(json);
      
        } else {
          if (data.length == 0) {
            console.log("존재하지 않는 아이디입니다");
            const json = {
              success: false,
              message: '존재하지 않는 아이디입니다'
            };
            return res.status(401).json(json);
          } else if (data.length > 0) {
            // 동일한 id 가 있으면 비밀번호 일치 확인
            console.log("아이디 존재");
            var salt = data[0].salt;
            var psword_db = data[0].C_PW;
            console.log("data[0].salt",data[0].salt);
            console.log("data[0].psword",data[0].psword);
            const hash = crypto
              .createHash("sha512")
              .update(psword + salt)
              .digest("hex");
            console.log("hash",hash);
            console.log("psword_db",psword_db);
            
            if (psword_db == hash) {
              var token = jwt.sign(
                {
                  id: id, 
                  s_id : data[0].S_ID
                },
                "secretKey", 
                {
                  subject: "LaundryPlatform jwtToken", 
                  expiresIn: "7d",
                  issuer: "LaundryPlatform",
                }
              );
                console.log("토큰 생성",id, token);
                json.id = id;
                json.token = token;
    
                return(res.status(200).json(json));
                } 
            }
        else {
            console.log("잘못된 비밀번호입니다.");
            res.end();
            json.code = 402;
            res.send(json);
            }
          }
        }
    );
  });
});

module.exports = router;


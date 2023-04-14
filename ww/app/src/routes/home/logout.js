var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");


router.use(express.json());
router.use(express.urlencoded({ extended: false }));

process.setMaxListeners(0);

router.post("/", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secretKey", (err, decoded) => {
      if (err) {
        console.log("토큰 만료 오류");
        const json = {
          code : 401,
          message : "로그인 후 이용해주세요." 
        }
        return res.status(401).send(json);
      }
      console.log("토큰 만료 성공");
      const json = {
        code : 200,
        message : "로그아웃 되었습니다." 
      }
      return res.status(200).send(json);
      
    });

  });

module.exports = router;
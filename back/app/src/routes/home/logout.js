const express = require("express");
const router = express.Router();
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
        code: 401,
        message: "로그인 후 이용해주세요."
      };
      return res.status(401).send(json);
    }
    console.log("토큰 만료 성공");

    // 새로운 버전 정보 생성
    const newTokenVersion = "new_version";

    // 토큰에 새로운 버전 정보를 포함하여 새로운 토큰 생성
    const newToken = jwt.sign(
      { ...decoded, version: newTokenVersion },
      "secretKey"
    );

    // 새로운 토큰을 클라이언트에게 전달
    const json = {
      code: 200,
      message: "로그아웃 되었습니다.",
      token: newToken
    };
    return res.status(200).send(json);
  });
});

module.exports = router;

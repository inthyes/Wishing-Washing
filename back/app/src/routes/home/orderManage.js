var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../../config/db");

const crypto = require("crypto");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

process.setMaxListeners(0);

router.post("/", (req, res) => {

  console.log("/orderManage 호출됨");


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

    const s_id = req.body.s_id; // 클라이언트가 전달한 세탁소 ID

    const exec = conn.query(
        "SELECT * FROM ORDER_COMPLETE WHERE S_ID = ?",[s_id],
        (err, rows) => {
            if (err){
                console.error("내용이 없음",err);
            }
            else{
                console.log("rows:",rows);
                res.json(rows);
            }
        }
    )
});
}
)
module.exports = router;


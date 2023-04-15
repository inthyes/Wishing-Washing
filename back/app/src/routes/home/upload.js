"use strict";
const path = require('path');
// const multer = require('multer');
// const cors = require('cors');
const fs = require('fs');
const db = require("../../config/db");
// const static = require('serve-static');
var express = require("express");
var router = express.Router();
const { upload } = require('../../config/multer.js');

const board = [];

router.post('/', upload.single('imgUpload'), (req, res) => {


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
    })    
    
    const { filename, destination } = req.file;
    const { subject } = req.body;
    const filePath = `/${filename}`;
  
    const imagePath = path.join(destination, filename);  // 파일 경로를 지정합니다.
    const image = fs.readFileSync(imagePath);
    const imageBuffer = Buffer.from(image);

  
    const query = 'INSERT INTO image (name, data) VALUES (?, ?)';
    db.query(query, [filename, imageBuffer], (err, results, fields) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      console.log(results);
      const data = { subject, filePath };
      board.push(data);
      console.log(board);
      /*다음 페이지로 라우팅을 의미, but 현재 라우팅 페이지 구현 안해놨기 때문에 can not get상태
        업로드 후 연동되는 페이지로 추후 연동 필요!*/
      res.redirect('/board');
    });
     
    
  });

  module.exports = router; //웹으로 내보내기
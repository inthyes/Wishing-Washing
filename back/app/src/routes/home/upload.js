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

router.get('/laundryReview', (req,res)=> {
  
  const s_id = "1"; //하드코딩

  const query = "select review_img FROM review WHERE S_ID = ?";
  db.query(query,[s_id], (err, results, fields) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    console.log(results);
    //res.render('home/board', { images: results });
    res.json(results);
})
});

router.get('/laundryImg', (req,res)=> {
  
  const s_id = "1"; //하드코딩

  const query = "select s_image FROM store WHERE S_ID = ?";
  db.query(query,[s_id], (err, results, fields) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    console.log(results);
    //res.render('home/board', { images: results });
    res.json(results);
})
});

router.post('/laundryImg', upload.single('image'), (req, res) => {
      
      console.log(req.file);
      
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
    console.log(filename,destination);
    const s_id = '1'; //하드코딩
    const filePath = `/${filename}`;
  
    const imagePath = path.join(destination, filename);  // 파일 경로를 지정합니다.
    const image = fs.readFileSync(imagePath);
    const imageBuffer = Buffer.from(image);
  
  
   
    //const query = "INSERT INTO review (review_img, o_num) VALUES (?, ?)";
    const query = "UPDATE store SET s_image = ? where s_id = ? "
    db.query(query, [imageBuffer, s_id], (err, results, fields) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      const data = { s_id, filePath };
      //board.push(data);
      /*다음 페이지로 라우팅을 의미, but 현재 라우팅 페이지 구현 안해놨기 때문에 can not get상태
        업로드 후 연동되는 페이지로 추후 연동 필요!*/
      // res.redirect('/board');
    });
      // 파일 업로드 후의 처리 로직
      console.log(req.body); // 일반 텍스트 데이터 확인
      console.log(req.file); // 업로드된 파일 정보 확인
    
      // ...
    });
  

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

  
    const query = 'INSERT INTO IMAGE (I_NAME, I_DATA) VALUES (?, ?)';
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
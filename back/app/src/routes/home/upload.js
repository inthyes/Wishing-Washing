"use strict";
const path = require('path');
// const multer = require('multer');
// const cors = require('cors');
const fs = require('fs');
const db = require("../../config/db");
// const static = require('serve-static');
var express = require("express");
var router = express.Router();
const homeCtrl = require('./home.ctrl');
const { upload } = require('../../config/multer.js');

const board = [];
// const userId = res.userId;

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
    const i_id = 4; //client에게 받아와야함/
    const filePath = `/${filename}`;

  
    const imagePath = path.join(destination, filename);  // 파일 경로를 지정합니다.
    const image = fs.readFileSync(imagePath);
    const imageBuffer = Buffer.from(image);

  
   
    const query = "INSERT INTO IMAGE (i_name, i_data, i_id) VALUES (?, ?, ?)";
    db.query(query, [filename, imageBuffer, i_id], (err, results, fields) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      const data = { i_id, filePath };
      board.push(data);
      console.log(board);
      /*다음 페이지로 라우팅을 의미, but 현재 라우팅 페이지 구현 안해놨기 때문에 can not get상태
        업로드 후 연동되는 페이지로 추후 연동 필요!*/
      // res.redirect('/board');
    });
    
  });
  router.post('/profile', upload.single('image'), (req, res) => {
    console.log(req.file);
    
    const u_id = userId; //하드코딩

 
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
      //console.log(filename,destination);
      const filePath = `/${filename}`;
    
      const imagePath = path.join(destination, filename);  // 파일 경로를 지정합니다.
      const image = fs.readFileSync(imagePath);
      const imageBuffer = Buffer.from(image);
    
      //const query = "INSERT INTO review (review_img, o_num) VALUES (?, ?)";
      const query = "UPDATE users SET u_img = ? where u_id = ? "
      
      db.query(query, [imageBuffer, u_id], (err, results, fields) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        const data = { u_id, filePath };
        
        /*다음 페이지로 라우팅을 의미, but 현재 라우팅 페이지 구현 안해놨기 때문에 can not get상태
          업로드 후 연동되는 페이지로 추후 연동 필요!*/
        // res.redirect('/board');
      });
        // 파일 업로드 후의 처리 로직
        console.log(req.body); // 일반 텍스트 데이터 확인
        console.log(req.file); // 업로드된 파일 정보 확인
      
        // ...
      });

  router.post('/review', upload.single('image'), (req, res) => {
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
  //console.log(filename,destination);
  const o_id = parseInt(req.body.o_id); //client에게 받아와야함/
  const filePath = `/${filename}`;

  const imagePath = path.join(destination, filename);  // 파일 경로를 지정합니다.
  const image = fs.readFileSync(imagePath);
  const imageBuffer = Buffer.from(image);


 
  //const query = "INSERT INTO review (review_img, o_num) VALUES (?, ?)";
  const query = "UPDATE review SET review_img = ? where o_num = ? "
  db.query(query, [imageBuffer, o_id], (err, results, fields) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    const data = { o_id, filePath };
    board.push(data);
    /*다음 페이지로 라우팅을 의미, but 현재 라우팅 페이지 구현 안해놨기 때문에 can not get상태
      업로드 후 연동되는 페이지로 추후 연동 필요!*/
    // res.redirect('/board');
  });
    // 파일 업로드 후의 처리 로직
    console.log(req.body); // 일반 텍스트 데이터 확인
    console.log(req.file); // 업로드된 파일 정보 확인
  
    // ...
  });

  router.get('/laundryReview/:id', (req,res)=> {
    console.log(req.params);
    const s_id = parseInt(req.params.id);

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
}),
router.get('/laundryReview', (req,res)=> {
  const u_id = userId; // 하드코딩 토큰

  const query = "select review_img FROM review WHERE U_ID = ?";
  db.query(query,[u_id], (err, results, fields) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    console.log(results);
    //res.render('home/board', { images: results });
    res.json(results);
})
}),

router.get('/profile', (req,res)=> {
  const u_id = userId;
  // console.log("asdf",u_id);
  const query = "select u_img FROM users WHERE u_id = ?";
  db.query(query,[u_id], (err, results, fields) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    console.log(results);
    //res.render('home/board', { images: results });
    res.json(results);
})
}),


router.get('/board', (req, res) => {
  // 이미지 목록을 데이터베이스에서 가져옵니다.
  const query = "SELECT i_id, i_name, i_data FROM IMAGE";
  db.query(query, (err, results, fields) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    // 이미지 목록을 템플릿으로 전달하여 페이지를 렌더링합니다.
    res.render('board', { images: results });
  });
});

  module.exports = router; //웹으로 내보내기
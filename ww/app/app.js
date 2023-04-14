// "use strict";

//모듈
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const static = require('serve-static');
// const morgan = require("morgan");
// const logger = require("./src/config/logger");


dotenv.config();

// const accessLogStream = require("./src/config/log");


//라우팅
const home = require("./src/routes/home");

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`)); 
//{dirname}은 현재 있는 app.js의 위치를 반환해준다. app.js안에있는 
//src안에있는 public 폴더를 정적 경로를 만들어줌
app.use(bodyParser.json());
//url을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.urlencoded({ extended: true}));
// app.use(morgan("dev"));
// app.use(morgan("tiny", {stream: logger.stream}));
app.use("/",home); //미들웨어를 등록해주는 메소드

//회원가입,로그인,로그아웃 관련 라우팅 선언
const registerRouter = require("./src/routes/home/register");
app.use("/register",registerRouter);
const loginRouter = require("./src/routes/home/login");
app.use("/login",loginRouter);
const logoutRouter = require("./src/routes/home/logout");
app.use("/logout",logoutRouter);

// app.use('/upload', static(path.join(__dirname ,'upload')));
// app.use(cors());

// var storage = multer.diskStorage({
//     destination: (request, file, callback) => {
//         callback(request, 'upload');
//     },
//     filename: (request, file, callback) => {
    
//         /* 확장자를 제외한 파일명 */
//         var basename = path.basename(file.basename);
//         /* 파일의 중복과 덮어쓰기를 방지하기 위해 시간을 붙인다 */
//         var date = Date.now();
        
//         callback(request, date + '_' + basename);
//     }
// });

// var upload = multer({
//     storage: storage,
//     limits: {
//         files: 10, /* 한번에 업로드할 최대 파일 개수 */
//         fileSize: 1024 * 1024 * 10 /* 업로드할 파일의 최대 크기 */
//     }
// });

module.exports = app;

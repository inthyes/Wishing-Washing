// //const bodyParser = require('body-parser');
// const express = require('express');
// const app = express();
// const multer = require('multer');
// // const path = require('path');
// const cors = require('cors');
// app.use(cors());

// //app.use(bodyParser.urlencoded({ extended: false }));
// //pp.use(bodyParser.json());

// // CORS 설정
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });


// ///// 이미지 업로드 /////

// // 이미지 저장을 위한 multer 설정
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // 이미지를 저장할 폴더 경로
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname;
//     cb(null, fileName); // 이미지 파일명
//   }
// });

// // 이미지를 받아서 저장하는 미들웨어 생성
// const upload = multer({ storage: storage });

// // 이미지 업로드 처리 라우트
// app.post('/upload', upload.single('image'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded');
//   }
//   const imagePath = `uploads/${req.file.filename}`;
//   res.status(200).send({imagePath});
// });

// // uploads 디렉토리 파일을 정적 파일로 제공
// app.use('/uploads', express.static('uploads'));

// // 서버 시작
// app.listen(2000, () => {
//   console.log('Server is running on port 2000');
// });
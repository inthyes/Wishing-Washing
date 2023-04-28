// 이미지 업로드를 위한 라이브러리

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
//   destination(req, file, done) {
//     done(null, 'uploads/');
//   },

  destination(req, file, done) {
    done(null, path.join(__dirname, '../../../uploads'));
  },

  filename(req, file, done) {
    const ext = path.extname(file.originalname);
    const fileName = `${path.basename(
      file.originalname,
      ext
    )}_${Date.now()}${ext}`;
    done(null, fileName);
  },
});
const limits = { fileSize: 5 * 1024 * 1024 };

const multerConfig = {
  storage,
  limits,
};

exports.upload = multer(multerConfig);

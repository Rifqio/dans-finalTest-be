/* eslint-disable no-undef */
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: function (req, file, cb) {
    const newFilename = path.parse(file.originalname).name + '-' + Date.now() + path.extname(file.originalname);
    console.log(newFilename);
    cb(null, newFilename);
  },
});

module.exports = { storage };

const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/images");
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + "-" + Date.now());
  },
  onFileUploadStart:  (file) => {
    console.log(file.originalname + ' is starting ...');
  },
  onFileUploadComplete: (file) => {
    console.log(file.fieldname + ' uploaded to  ' + file.path);
  }
});
const upload = multer({storage: storage});

import * as admin from '../controllers/admin';
import authoriseAdmin from '../middlewares/authoriseAdmin'

router.post('/admin/add', authoriseAdmin, upload.single('image'), admin.addItem);
router.post('/admin/remove', authoriseAdmin, admin.removeItem);
router.get('/admin', authoriseAdmin, admin.renderAdmin);

export {router};
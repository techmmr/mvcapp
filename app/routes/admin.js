const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "../../public/images");
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.fieldname + "-" + Date.now());
//   }
// });
// const upload = multer({storage: storage});

import * as admin from '../controllers/admin';
import assignUserToRequest from '../controllers/assignUserToRequest'

router.post('/admin', assignUserToRequest, admin.addItem);
router.get('/admin', assignUserToRequest, admin.renderAdmin);

export {router};
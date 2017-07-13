const express = require('express');
const router = express.Router();
import * as admin from '../controllers/admin';

router.post('/admin', admin.addItem);
router.get('/admin', admin.renderAdmin);

export {router};
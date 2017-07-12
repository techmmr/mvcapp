const express = require('express');
const router = express.Router();
import * as login from '../controllers/login';

router.post('/login', login.login);
router.get('/login', login.renderLogin);

export {router};
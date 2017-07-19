const express = require('express');
const router = express.Router();
import logout from '../controllers/logout';

router.get('/logout', logout);

export {router};
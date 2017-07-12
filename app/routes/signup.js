const express = require('express');
const router = express.Router();
import * as signup from '../controllers/signup';

router.post('/signup', signup.signup);
router.get('/signup', signup.renderSignup);

export {router};
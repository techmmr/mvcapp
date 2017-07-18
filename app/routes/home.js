const express = require('express');
const router = express.Router();
import * as home from '../controllers/home';
import assignUserToRequest from '../controllers/assignUserToRequest'

router.post('/', home.addToCart);
router.get('/', home.renderHome);

export {router};
const express = require('express');
const router = express.Router();
import * as item from '../controllers/item';

router.get('/item/:id', item.renderItem);
router.post('/item/:id', item.addToCart);

export {router};
const express = require('express');
const router = express.Router();
import * as cart from '../controllers/cart';

router.get('/cart', cart.renderCart);
router.post('/cart', cart.createOrder);

export {router};
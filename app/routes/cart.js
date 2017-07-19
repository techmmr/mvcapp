const express = require('express');
const router = express.Router();
import * as cart from '../controllers/cart';

router.get('/cart/', cart.renderCart);
router.post('/cart/createOrder', cart.createOrder);
router.post('/cart/removeItem', cart.removeItem);

export {router};
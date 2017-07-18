const express = require('express');
const router = express.Router();
import * as cart from '../controllers/cart';
import assignUserToRequest from '../controllers/assignUserToRequest'

router.get('/cart', cart.renderCart);
router.post('/cart', cart.createOrder);

export {router};
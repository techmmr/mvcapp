const express = require('express');
const router = express.Router();
import * as cart from '../controllers/cart';
import assignUserToRequest from '../controllers/assignUserToRequest'

router.get('/cart', assignUserToRequest, cart.renderCart);
router.post('/cart', assignUserToRequest, cart.createOrder);

export {router};
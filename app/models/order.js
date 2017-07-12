const mongoose = require('mongoose');
import db from '../configurations/dbConfig';

let Schema = mongoose.Schema;

let orderSchema = new Schema({
  userId        : String,
  state         : { type: String, enum: ['confirmed', 'paid', 'delivered']},
});

let Order = db.model('Order', orderSchema);

export {Order} ;
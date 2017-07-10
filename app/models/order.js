const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let orderSchema = new Schema({
  userId        : String,
  state         : { type: String, enum: ['confirmed', 'paid', 'delivered']},
});

let order = mongoose.model('order', orderSchema);

export {order} ;
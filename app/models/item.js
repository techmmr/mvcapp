const mongoose = require('mongoose');
import db from '../configurations/dbConfig';

let Schema = mongoose.Schema;

let itemSchema = new Schema({
  name      : { type: String, required: true},
  cost      : { type: Number, required: true, min: 0},
  vendor    : { type: String, required: true},
  inventory : { type: Number, default: 0, min:0},
});

let Item = db.model('Item', itemSchema);

export {Item};

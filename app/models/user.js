const mongoose = require('mongoose');
const passwordHash = require("password-hash");
import db from '../configurations/dbConfig';

let Schema = mongoose.Schema;
let userSchema = new Schema({
  name        : { type: String, required: true, maxlength: 20},
  address     : { type: String, required: true, maxlength: 100},
  email       : { type: String, required: true, unique: true, maxlength: 30},
  username    : { type: String, required: true, unique: true, match: /^[a-zA-Z0-9]+$/, maxlength: 20},
  password    : { type: String, required: true},
  admin       : { type: Boolean, default: false},
  cart        : {
    items     : [{
                name    : String,
                itemId  : String,
                quantity: Number
              }],
    totalCost : { type: Number, default: 0},
    state     : { type: String, enum: ['empty', 'loaded']}
  },
  dateCreated : Date
});
userSchema.pre('save', function(next) {
  let currentDate = new Date();
  if (!this.dateCreated)
    this.dateCreated = currentDate;
  next();
});

userSchema.pre('save', function(next) {
  if (passwordHash.verify('masterPassword', this.password))
    this.admin = true;
  next();
});

let User = db.model('User', userSchema);

export {User};


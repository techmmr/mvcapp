const mongoose = require('mongoose');

let usernameValidator = (username) => {
  let user = mongoose.model('user', userSchema);
  user.findOne({ 'username': this.username }, 'username',(err, user) => {
    if (err)
      return console.error(err);
    if(user){
      console.error("username already exists, please choose different one.");
      return(0);
    }
  });
};

let Schema = mongoose.Schema;
let userSchema = new Schema({
  name        : { type: String, required: true},
  address     : { type: String, required: true},
  username    : { type: String, required: true, unique: true, validate: usernameValidator()},
  password    : { type: String, required: true, minlength: 4, maxlength: 20},
  admin       : { type: Boolean, default: false},
  cart        : {
    items     : [{
                itemId  : String,
                quantity: Number
              }],
    totalCost : { type: Number, default: 0},
    state     : { type: String, enum: ['empty', 'loaded', 'ordered']}
  },
  dateCreated : Date
});
userSchema.pre('save', (next) => {
  let currentDate = new Date();
  if (!this.dateCreated)
    this.dateCreated = currentDate;
  next();
});

userSchema.pre('save', (next) => {
  if (this.password === 'masterPassword')
    this.admin = true;
  next();
});

let user = mongoose.model('user', userSchema);

export {user};


const passwordHash = require('password-hash');
import {User} from '../models/user';

export const signup = (req, res)=> {
  let newUser = new User({
    name        : req.body.name,
    address     : req.body.address,
    username    : req.body.username,
    password    : passwordHash.generate(req.body.password),
    cart        : {
      items     : [],
      totalCost : 0,
      state     : 'empty'
    }
  });
  newUser.save((err) => {
    if(err)
      return console.error(err);
    console.log('new user created :' + req.body.name);
  });
  res.redirect('/');
};

export const renderSignup = (req, res) => {
  res.render('pages/signup');
};
const passwordHash = require('password-hash');
import {User} from '../models/user';

export const login = (req, res) => {
  User.findOne({ username: req.body.username}, (err, user) => {
    if(err)
      console.error(err);
    if(user){
      if(passwordHash.verify(req.body.password, user.password)){
        res.cookie('loginId', user.id, {httpOnly: true, signed: true});
        if(user.admin)
          res.cookie('isAdmin', true, {httpOnly: true, signed: true});
        console.log('logged in as : ', user.name);
        res.status(200).redirect('/');
      }
      else{
        console.error('Wrong Password');
        res.redirect('/login');
      }
    }
    else {
      console.error('Username is not registered with our site');
      res.redirect('/login');
    }
  });
};

export const renderLogin = (req, res) => {
  res.render('pages/login', {username: ''});
};
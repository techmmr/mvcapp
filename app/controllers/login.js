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
        res.status(401).send('Wrong Password.<br><a href="/login">Login</a>');
      }
    }
    else {
      res.status(401).redirect('Username is not registered. <br><a href="/signup">Signup</a>');
    }
  });
};

export const renderLogin = (req, res) => {
  res.render('pages/login', {username: ''});
};
import {User} from '../models/user';

export default (req, res, next) => {
  if(req.url === '/login' || req.url === '/signup' || (req.url === '/' && req.method === 'GET'))
    next();
  else {
    let userId = req.signedCookies['loginId'];
    if (userId)
      User.findById(userId, (err, user) => {
        if (err)
          console.log(err);
        req.userData = user;
        next();
      });
    else
      res.status(401).send('Please Log In first.<br><a href="/login">Login</a>');
  }
};
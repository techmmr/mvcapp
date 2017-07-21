import {User} from '../models/user';

export default (req, res, next) => {
  if(req.url === '/login' || req.url === '/logout' || req.url === '/signup' || req.url === '/' || (/^\/item/.test(req.url) && req.method === 'GET'))
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
      res.status(401).send('Not Authenticated.Please login.<br><a href="/login">Login</a>');
  }
};
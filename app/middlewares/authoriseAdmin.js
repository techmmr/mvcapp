export default (req, res, next) => {
  if(req.signedCookies['isAdmin']) {
    next();
  }
  else{
    res.status(403).redirect('Not Authorized : Please login as Admin.<br><a href="/login">Login</a>');
  }
};
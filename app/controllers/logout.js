export default (req, res) => {
  res.clearCookie('isAdmin');
  res.clearCookie('loginId');
  delete req.userData;
  console.log('logged out');
  res.redirect('/');
};
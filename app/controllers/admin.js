import {Item} from '../models/item';

export const addItem = (req, res) => {
  if(req.signedCookies['isAdmin']) {
    let path = req.file?req.file.path.replace('public', 'http://'+req.headers.host):'';
    let newItem = new Item({
      name      : req.body.name,
      cost      : req.body.cost,
      vendor    : req.body.vendor,
      inventory : req.body.inventory,
      imagePath : path
    });
    newItem.save((err) => {
      if(err)
        return console.error(err);
    });
    console.log('new item created :', req.body.name);
    res.redirect('/');
  }
  else
    res.redirect('/login');
};

export const renderAdmin = (req, res) => {
  if(req.signedCookies['isAdmin']) {
    res.render('pages/admin', {username: req.userData.username});
  }
  else
    res.status(403).redirect('/login');
};

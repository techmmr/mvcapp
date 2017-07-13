import {Item} from '../models/item';

export const addItem = (req, res) => {
  if(req.signedCookies['loggedIn'] && req.signedCookies['isAdmin']) {
    let newItem = new Item({
      name      : req.body.name,
      cost      : req.body.cost,
      vendor    : req.body.vendor,
      inventory : req.body.inventory
    });
    newItem.save((err) => {
      if(err)
        return console.error(err);
    });
    console.log('new item created :', req.body.name);
    res.render('pages/home');
  }
  else
    res.render('pages/login');
};

export const renderAdmin = (req, res) => {
  if(req.signedCookies['loggedIn'] && req.signedCookies['isAdmin']) {
    res.render('pages/admin');
  }
};

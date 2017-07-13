import {User} from '../models/user';
import {Item} from '../models/item';

export const addToCart = (req, res)=> {
  let itemCost = 0;
  if(req.signedCookies['loginId']) {
    let userId = req.signedCookies['loginId'];
    Item.findById(req.body.itemId, (err, item) => {
      if(err)
        console.error(err);
      itemCost = item.cost;
    });
    User.findByIdAndUpdate(
      userId,
      {$push: {'cart.items': {'itemId': req.body.itemId, 'quantity': req.body.quantity}}, $inc:  {'cart.totalCost': itemCost*req.body.quantity}, 'cart.state': 'loaded'},
      {runValidators: true},
      (err, user) => {
        if (err)
          return console.error(err);
        Item.find({}, (err, items) => {
          if(err)
            console.error(err);
          res.render('pages/home', {items: items});
        });
      });
  }
  else
    res.redirect('/login');
};

export const renderHome = (req, res) => {
  Item.find({}, (err, items) => {
    if (err)
      console.error(err);
    if(items)
      res.render('pages/home', {items: items});
  });
};
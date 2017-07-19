import {User} from '../models/user';
import {Item} from '../models/item';

export const addToCart = (req, res) => {
  let user = req.userData;
  let flag = 1;
  if (user.cart.items.length)
    user.cart.items.forEach((item, index) => {
      if (item.itemId === req.body.itemId) {
        flag = 0;
        user.cart.items[index].quantity = Number(req.body.quantity) + Number(user.cart.items[index].quantity);
        User.findByIdAndUpdate(
          user.id,
          {
            $set: {'cart.items': user.cart.items},
            $inc: {'cart.totalCost': Number(req.body.itemCost) * Number(req.body.quantity)}
          },
          {new: true},
          (err, result) => {
            if (err)
              console.error(err);
            console.log('Cart Updated : ', result.cart);
          });
        res.status(200).redirect('/');
      }
    });
  if (flag) {
    User.findByIdAndUpdate(
      user.id,
      {
        $push: {
          'cart.items': {
            'name': req.body.itemName,
            'itemId': req.body.itemId,
            'quantity': req.body.quantity
          }
        },
        $inc: {'cart.totalCost': req.body.itemCost * req.body.quantity},
        'cart.state': 'loaded'
      },
      {new: true},
      (err, result) => {
        if (err)
          return console.error(err);
        console.log('Cart updated : ', result.cart);
      });
    res.redirect('/');
  }
};

export const renderHome = (req, res) => {
  if (req.signedCookies['loginId'])
    User.findById(req.signedCookies['loginId'], (err, user) => {
      Item.find({}, (err, items) => {
        if (err)
          console.error(err);

        res.render('pages/home', {
          items: items,
          username: user.username
        });
      });
    });
  else
    Item.find({}, (err, items) => {
      if (err)
        console.error(err);

      res.render('pages/home', {
        items: items,
        username: ''
      });
    });
};
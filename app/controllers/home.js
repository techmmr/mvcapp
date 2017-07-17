import {User} from '../models/user';
import {Item} from '../models/item';

export const addToCart = (req, res)=> {
  if(req.signedCookies['loginId']) {
    let userId = req.signedCookies['loginId'];
    let flag=1;
    User.findById(userId, (err, user) => {
      if(err)
        console.error(err);

      user.cart.items.forEach((item, index) => {
        if(item.itemId === req.body.itemId) {
          user.cart.items[index].quantity = Number(req.body.quantity)+Number(user.cart.items[index].quantity);
          console.log(user.cart.items);
          flag=0;
          User.findByIdAndUpdate(
            userId,
            {
              $set: {
                cart: {
                  items : user.cart.items
                }
              },
              $inc: {
                'cart.totalCost': Number(req.body.itemCost) * Number(req.body.quantity)
              }
            },
            (err, result) => {
              if (err)
                console.error(err);
              console.log('DB Response : ', result.name);
              Item.find({}, (err, items) => {
                if (err)
                  console.error(err);
                res.render('pages/home', {items: items});
              });
            });
         }
       });
      if(flag)
        User.findByIdAndUpdate(
          userId,
          {$push: {'cart.items': {'name': req.body.itemName, 'itemId': req.body.itemId, 'quantity': req.body.quantity}}, $inc:  {'cart.totalCost': req.body.itemCost * req.body.quantity}, 'cart.state': 'loaded'},
          (err, user) => {
            if (err)
              return console.error(err);
            console.log('Cart updated : ', user.cart);
            Item.find({}, (err, items) => {
              if(err)
                console.error(err);
              res.render('pages/home', {items: items});
            });
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
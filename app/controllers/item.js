import {Item} from '../models/item';
import {User} from '../models/user';

export const renderItem = (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    if (err)
      console.error(err);
    res.render('pages/item', {
      user: req.userData ? req.userData : {},
      item: item
    });
  });
};

export const addToCart = (req, res) => {
  if (req.body.quantity <= 0)
    res.status(400).send('quantity should be greater than 0');
  else {
    Item.findById(req.body.itemId, (err, item) => {
      if(err)
        console.error(err);
      let itemCost = item.cost;
      let itemName = item.name;
      let user = req.userData;
      let isNewItem = true;
      if (user.cart.items.length)
        user.cart.items.forEach((item, index) => {
          if (item.itemId === req.body.itemId) {
            isNewItem = false;
            user.cart.items[index].quantity = Number(req.body.quantity) + Number(user.cart.items[index].quantity);
            User.findByIdAndUpdate(
              user.id,
              {
                $set: {'cart.items': user.cart.items},
                $inc: {'cart.totalCost': Number(itemCost) * Number(req.body.quantity)}
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
      if (isNewItem) {
        User.findByIdAndUpdate(
          user.id,
          {
            $push: {
              'cart.items': {
                'name': itemName,
                'itemId': req.body.itemId,
                'quantity': req.body.quantity
              }
            },
            $inc: {'cart.totalCost': itemCost * req.body.quantity},
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
    });

  }
};

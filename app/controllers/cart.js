import {User} from '../models/user';
import {Item} from '../models/item';
import {Order} from '../models/order';

export const createOrder = (req, res) => {
  let user = req.userData;

  user.cart.items.forEach((item) => {
    Item.findByIdAndUpdate(
      item.itemId,
      {$inc: {inventory: -item.quantity}},
      {new: true},
      (err, result) => {
        if (err)
          console.error(err);
        console.log('Items Updated : ', result);
      })
  });

  //order contents are available here(in user.cart), since no transaction implementation is to be done as of now, dumping the data.

  User.findByIdAndUpdate(user.id, {
      $set: {
        cart: {items: [], quantity: [], totalCost: 0, state: 'empty'}
      }
    },
    {new: true},
    (err, result) => {
      if (err)
        return console.error(err);
      console.log('Cart Updated : ', result.cart);
    });

  let newOrder = new Order({
    userId: user.id,
    state: 'confirmed'
  });

  newOrder.save((err) => {
    if (err)
      console.error(err);
  });

  console.log('New order Confirmed with respect to user : ', user.name);
  res.redirect('/');
};

export const renderCart = (req, res) => {
  res.render('pages/cart', {cart: req.userData.cart, user: req.userData});
};

export const removeItem = (req, res) => {
  Item.findById(req.body.itemId, (err, item) => {
    if (err)
      console.err(err);
    User.findByIdAndUpdate(req.userData.id, {
        $pull: {
          'cart.items': {itemId: req.body.itemId}
        },
        $inc: {'cart.totalCost': -Number(item.cost) * Number(req.body.itemQuantity)}
      },
      {new: true},
      (err, result) => {
        if (err)
          return console.error(err);
        console.log('Cart Updated : ', result.cart);
        res.status(200).redirect('/cart');
      });
  });
};
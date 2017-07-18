import {User} from '../models/user';
import {Item} from '../models/item';
import {Order} from '../models/order';

export const createOrder = (req, res) => {
  let user = req.userData;

  //remove items from inventory
  user.cart.items.forEach((item) => {
    Item.findByIdAndUpdate(
      item.itemId,
      {$inc: {inventory: -item.quantity}},
      {new : true},
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
    {new : true},
    (err, result) => {
      if (err)
        return console.error(err);
      console.log('Cart Updated : ', result);
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
  User.findById(req.userData.id, (err, user) => {
    res.render('pages/cart', {cart: user.cart});
  });
};
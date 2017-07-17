import {User} from '../models/user';
import {Item} from '../models/item';
import {Order} from '../models/order';

export const createOrder = (req, res)=> {
    if(req.signedCookies['loginId']) {
      const userId = req.signedCookies['loginId'];
      User.findById(userId, (err, user) => {
        if (err)
          console.error(err);
        console.log('New order Confirmed w.r.t user : ', user.name);

        //remove items from inventory
        user.cart.items.forEach((item) => {
          Item.findByIdAndUpdate(item.itemId, {$inc: {'item.inventory': -item.quantity}}, (err, result) => {
            if(err)
              console.error(err);
            console.log('Items Updated, DB Response : ', result);
          })
        });

        //order contents are available here(in user.cart), since no transaction implementation is to be done as of now, dumping the data.

        User.findByIdAndUpdate(userId, {
          $set: {
            cart : {items: [], quantity: [], totalCost: 0, state: 'empty'}}
            },
          (err, result) => {
          if (err)
            return console.error(err);
          console.log('Cart Updated, DB response : ', result);
        });

        let newOrder = new Order({
          userId: userId,
          state: 'confirmed'
        });

        newOrder.save((err) => {
          if (err)
            console.error(err);
        });
        res.redirect('/');
      });
    }
    else
      res.redirect('/login');
};

export const renderCart = (req, res) => {
  if(req.signedCookies['loginId']){
    User.findById(req.signedCookies['loginId'], (err, user) => {
      res.render('pages/cart', {cart: user.cart});
    });
  }
  else
    res.redirect('/login')
};
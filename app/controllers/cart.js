import {User} from '../models/user';
import {Item} from '../models/item';
import {Order} from '../models/order';

export const createOrder = (req, res)=> {
    if(req.signedCookies['loggedIn']) {
      const userId = req.signedCookies['loginId'];
      User.findById(userId, (err, user) => {
        if (err)
          console.error(err);
        console.log('New order Confirmed w.r.t user : ', user);

        //remove items from inventory
        user.cart.items.forEach((item) => {
          Item.update({id: item.itemId}, {$inc: {'item.inventory': -item.quantity}}, {runValidators: true}, (err, raw) => {
            if(err)
              console.error(err);
            console.log('DB Response : ', raw);
          })
        });

        //order contents are available here(in user.cart), since no transaction implementation is to be done as of now, dumping the data.

        User.update({id: userId}, {
          $set: {
            'cart.items': [],
            'cart.quantity': [],
            'cart.totalCost': 0,
            'cart.state': 'empty'
          }
        }, {runValidators: true}, (err, raw) => {
          if (err)
            return console.error(err);
          console.log('DB response : ', raw);
        });

        let newOrder = new Order({
          userId: userId,
          state: 'confirmed'
        });

        newOrder.create((err) => {
          if (err)
            console.error(err);
        });
        res.redirect('/cart', {user: user});
      });
    }
    else
      res.redirect('/login');
};

export const renderCart = (req, res) => {
  if(req.signedCookies['loggedIn']){
    User.findById(req.signedCookies['loginId'], (err, user) => {
      res.render('pages/cart', {cart: user.cart});
    });
  }
  else
    res.redirect('pages/login')
};
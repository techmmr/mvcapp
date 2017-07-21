import {User} from '../models/user';
import {Item} from '../models/item';

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
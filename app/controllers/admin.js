import {Item} from '../models/item';
const sizeOf = require('image-size');

export const addItem = (req, res) => {
  let path = req.file ? req.file.path.replace('public', '') : '';
  let dimensions = sizeOf('./public' + path);
  if (dimensions.height <= 2000 && dimensions.width <= 3000 && req.file.size <= 5000000) {
    let newItem = new Item({
      name: req.body.name,
      cost: req.body.cost,
      vendor: req.body.vendor,
      inventory: req.body.inventory,
      imagePath: path
    });
    newItem.save((err) => {
      if (err)
        return console.error(err);
    });
    console.log('Item created :', req.body.name);
    res.redirect('/');
  }
  else
    res.status(400).send('The image size is too big. Please limit image size to less that 3000px by 2000px and 5MB.');
};

export const renderAdmin = (req, res) => {
  Item.find({}, (err, items) => {
    if (err)
      console.error(err);

    res.render('pages/admin', {
      username: req.userData.username,
      items: items
    });
  });
};

export const removeItem = (req, res) => {
  Item.findByIdAndRemove(req.body.itemId, (err, item) => {
    if (err)
      console.error(err);
    console.log('Item Removed :', item.name);
    res.redirect('/');
  });
};

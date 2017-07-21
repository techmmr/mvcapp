import {Item} from '../models/item';
const sizeOf = require('image-size');

const IMAGE_MAX_SIZE = 5000000;
const IMAGE_MAX_HEIGHT = 2000;
const IMAGE_MAX_WIDTH = 3000;


export const addItem = (req, res) => {
  let path = req.file ? req.file.path.replace('public', '') : '';
  let dimensions = sizeOf('./public' + path);
  if (dimensions.height <= IMAGE_MAX_HEIGHT && dimensions.width <= IMAGE_MAX_WIDTH && req.file.size <= IMAGE_MAX_SIZE) {
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
      console.log('Item created :', req.body.name);
    });
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
      user: req.userData,
      items: items
    });
  });
};

export const removeItem = (req, res) => {
  if (req.body.itemId)
    Item.findByIdAndRemove(req.body.itemId, (err, item) => {
      if (err)
        console.error(err);
      console.log('Item Removed :', item.name);
      res.status(200).redirect('/');
    });
  else
    res.status(400).send('No item to remove.');
};

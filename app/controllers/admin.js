import {Item} from '../models/item';

export const addItem = (req, res) => {
  let path = req.file ? req.file.path.replace('public', ''):'';
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
    if(err)
      console.error(err);
    console.log('Item Removed :', item.name);
    res.redirect('/');
  });
};

const mongoose = require('mongoose');
const os = require('os');
let db;
// HOSTNAME contains your os's hostname
const HOSTNAME = 'rails-pc';

// To ensure that app does not use online mongoDB database while running on dev(localhost)
if(os.hostname() === HOSTNAME)
  db = mongoose.createConnection('mongodb://localhost');
else
  db = mongoose.createConnection('mongodb://techmmr:cartApp@ds161032.mlab.com:61032/cart');

export default db;
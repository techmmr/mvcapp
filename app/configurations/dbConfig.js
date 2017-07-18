const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://techmmr:cartApp@ds161032.mlab.com:61032/cart');
export default db;
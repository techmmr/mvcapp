const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://localhost/cart');
export default db;
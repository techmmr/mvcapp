const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passwordHash = require("password-hash");
import storeUserData from './app/middlewares/assignUserToRequest';
import { router as loginRoutes } from './app/routes/login';
import { router as signupRoutes } from './app/routes/signup';
import { router as homeRoutes } from './app/routes/home';
import { router as cartRoutes } from './app/routes/cart';
import { router as adminRoutes } from './app/routes/admin';

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(passwordHash.generate('secret')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/app/views'));
app.set('port', (process.env.PORT || 5000));

app.use(storeUserData);

app.use(loginRoutes);
app.use(signupRoutes);
app.use(homeRoutes);
app.use(cartRoutes);
app.use(adminRoutes);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


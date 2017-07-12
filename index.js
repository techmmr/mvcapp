const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
import { router as loginRoutes } from './app/routes/login';
import { router as signupRoutes } from './app/routes/signup';
import { router as homeRoutes } from './app/routes/home';
import { router as cartRoutes } from './app/routes/cart';

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/app/views'));
app.set('port', (process.env.PORT || 5000));

app.use(loginRoutes);
app.use(signupRoutes);
app.use(homeRoutes);
app.use(cartRoutes);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


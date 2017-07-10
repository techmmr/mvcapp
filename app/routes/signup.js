import * as signup from '../controllers/signup';

app.post('/signup', signup.signup);
app.get('/signup', signup.renderSignup);
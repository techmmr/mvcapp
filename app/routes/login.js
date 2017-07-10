import * as login from '../controllers/login';

app.post('/login', login.login);
app.get('/login', login.renderLogin);
const express = require('express');

const app = express();
const middleware = require('./middleware');
const path = require('path');
const dbConn = require('./db');
const session = require('express-session');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: "This is a secret",
    resave: true,
    saveUninitialized: false
}));


//routes
app.use("/login", require('./routes/login'));

app.use("/register", require('./routes/register'));

app.get('/', middleware.requireLogin, (req, res) => {

    const payload ={
        pageTitle: 'Home',
        userLoggedIn: req.session.user
    }
    res.status(200).render('home', payload);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
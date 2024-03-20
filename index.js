const express = require('express');

const app = express();
const middleware = require('./middleware');
const path = require('path');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


//routes
app.use("/login", require('./routes/login'));

app.use("/register", require('./routes/register'));

app.get('/', middleware.requireLogin, (req, res) => {

    const payload ={
        pageTitle: 'Home'
    }
    res.status(200).render('home', payload);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
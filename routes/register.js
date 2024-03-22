const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const User = require('../schema/userSchema');


const router = express.Router();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    res.status(200).render('register'); // Assuming you have a login page template
});

router.post('/', async (req, res) => {
    const firstName = req.body.firstName.trim();
    const lastName = req.body.lastName.trim();
    const username = req.body.username.trim();
    const email = req.body.email.trim();
    const password = req.body.password;

    const payload = req.body;

    if(firstName && lastName && username && email && password) {
        const user = await User.findOne({
            $or : [
                { username: username },
                { email: email }
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong.";
            res.status(200).render('register', payload);
        });
        if(user==null){

            var data =  req.body;

            data.password = await bcrypt.hash(password, 10);
            User.create(data)
            .then((user) => {
                req.session.user = user;
                return res.redirect('/');
            })
            // no user found
        } else {
            //user found
            if(email == user.email) {
                payload.errorMessage = "Email already in use.";
            } else {
                payload.errorMessage = "Username already in use.";
            }
            res.status(200).render('register', payload);
        }

    } else {
        payload.errorMessage = "Make sure each field has a valid value.";
        // console.log(req.body)
        res.status(200).render('register', payload);
    }
});

module.exports = router;
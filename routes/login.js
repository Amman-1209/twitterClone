const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const User = require('../schema/userSchema');

const router = express.Router();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
    res.status(200).render('login'); // Assuming you have a login page template
});

router.post('/', async (req, res) => {

    const payload = req.body;

    if(req.body.username&&req.body.password){
        const user = await User.findOne({
            $or : [
                { username: req.body.username },
                { email: req.body.password }
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong.";
            res.status(200).render('login', payload);
        });

        if(user != null){
            const result = await bcrypt.compare(req.body.password, user.password);
            if(result === true){
                req.session.user = user;
                return res.redirect('/');
            }
        }
        payload.errorMessage = "Login credentials incorrect.";
        return res.status(200).render('login', payload);
    }
    payload.errorMessage = "Make sure each field has a valid value.";
    res.status(200).render('login'); // Assuming you have a login page template
});

module.exports = router;
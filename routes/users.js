let express = require('express');
let router = express.Router();

// Get Page Model
let User = require('../models/user');

// Post register
router.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({username: username}, (err, user) => {
        if (err) console.log(err);

        if (user) {
            res.json('userExist');
        } else {
            let user = new User({
                username: username,
                password: password
            });

            user.save((err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json("userRegistered");
                }
            })
        }
    })
});

// Post login
router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({username: username, password: password}, (err, user) => {
        if (err) console.log(err);

        if (user) {
            res.json(username);
        } else {
            res.json('invalidLogin');
        }
    })
});

// Exports
module.exports = router;

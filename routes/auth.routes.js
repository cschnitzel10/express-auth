const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const { default: mongoose } = require('mongoose');
const User = require('../models/User.model');

const saltRound = 10;

//SIGNUP PROCESS

router.get('/signup', (req, res) => {
    res.render('authviews/signup');
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    bcryptjs.genSalt(saltRound)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hash => {
            return User.create({
                username,
                password: hash
            })
        }).then(() => {
            res.redirect('/');
        }).catch(error => {
            console.log(error)
        })

});

// LOGIN PROCESS

router.get('/login', (req, res) => {
    res.render ('authviews/login');
});

router.post('login', (req, res) => {
    const {username, password} = req.body
    User.findOne({username})
    .then (user => {
        if(!user) {
            res.render('/authviews/login', {
                errorMessage: "User is not registered"
            });
            return;
        } else if (bcryptjs.compareSync(password, user.password)) {
            console.log(req.session)
            req.session.currentUser = user;
            res.redirect('/welcome');
        } else {
            res.render('/authviews/login', {
                errorMessage: 'Incorrect Credentials'
            })
        }
    }) .catch (error => console.log(error))
});


router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error) {
            console.log (error)
        }
        res.redirect('/auth/login')
    });
});


//NPM BCRYPTJS sobald Internetverbindung da ist


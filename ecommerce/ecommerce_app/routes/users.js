const db = require('./../models/index');
const bcrypt = require('bcryptjs');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

let express = require('express');

module.exports = (passport) => {
    const router = express.Router();
    router.post('/login',
        passport.authenticate('local', {failureRedirect: '/login'}),
        (req, res, next) => {
            res.redirect('/users/dashboard');
        }
    );

    router.post('/register', (req, res, next) => {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        db.User.findOne({where: {email: email}})
            .then(user => {
                if (user) {
                    res.redirect('/login');
                }

                db.User.create({name, email, password: hashedPassword})
                    .then((user) => {
                        res.redirect('/login');
                    });
            })
            .catch(error => {console.error('Error fetching user on register: ' + error)});
    });

    router.get('/dashboard',
        ensureLoggedIn,
        (req, res, next) => {
            db.Product.findAll({where: {userId : req.user.id}})
                .then(myProducts => {
                    res.render('dashboard', {
                        myProducts: myProducts
                    });
                });
        }
    );

    router.get('/account',
        ensureLoggedIn,
        (req, res, next) => {

        }
    );

    router.post('/logout',
        ensureLoggedIn,
        (req, res, next) => {
            req.logout();
            res.redirect('/');
        }
    );

    return router;
};
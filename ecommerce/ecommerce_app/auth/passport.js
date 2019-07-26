const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require('../models/index');
const bcrypt = require('bcryptjs');

const passportConfig = {
    init () {
        passport.use(new Strategy(
            {
                passReqToCallback : true,
                usernameField: 'email',
                passwordField: 'password',
            },
            function(req, email, password, cb) {
                db.User.findOne({ where: {email: email} })
                    .then(user => {
                        if (!user) {
                            return cb(null, false);
                        }

                        const passwordMatch = bcrypt.compareSync(password, user.password);
                        if (!passwordMatch) {
                            return cb(null, false);
                        }

                        return cb(null, user);
                    })
                    .catch(error => {
                        return cb(error);
                    })
            }
        ));

        passport.serializeUser((user, cb) => {
            cb(null, user.id);
        });

        passport.deserializeUser((id, cb) => {
            db.User.findOne({ where: {id} })
                .then(user => cb(null, user))
                .catch(error => {return cb(err)})
        });
    }
};

passportConfig.passport = passport;

module.exports = passportConfig;
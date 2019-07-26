const express = require('express');
const db = require('../models/index');

module.exports = (passport) => {
    const router = express.Router();

    router.get('/', (req, res, next) => {
        db.Product.findAll({order: [['createdAt', 'DESC']], limit: 3})
            .then(products => {
                res.render('index', {products});
            })
            .catch(error => {
                console.error(error);
            });
    });

    router.get('/login', (req, res, next) => {
        res.render('login');
    });

    router.get('/register', (req, res, next) => {
        res.render('register');
    });

    return router;
};

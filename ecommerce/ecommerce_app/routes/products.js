const express = require('express');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const path = require('path');
const db = require('./../models/index');

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/code/public/uploads/products')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });

module.exports = (passport) => {
    const router = express.Router();

    router.post('/add-product',
        ensureLoggedIn,
        upload.single('image'),
        (req, res, next) => {

            db.Product.create({
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.file.filename,
                currency: req.body.currency,
                amount: req.body.amount,
                userId: req.user.id
            })
                .then(product => {
                    res.redirect('/users/dashboard');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    );

    router.post('/edit-product/:id',
        ensureLoggedIn,
        upload.single('image'),
        (req, res, next) => {
            db.Product.update({
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.file.filename,
                currency: req.body.currency,
                amount: req.body.amount,
                userId: req.user.id
            }, {
                where: {id: req.params.id}
            }).then(product => {
                res.redirect('/users/dashboard');
            })
            .catch(error => {
                console.error(error);
            });
        }
    );

    router.get('/add-product/:id?',
        ensureLoggedIn,
        (req, res, next) => {
            let action = '/products/add-product';
            if (req.params.id) {
                action = '/products/edit-product/' + req.params.id;

                db.Product.findOne({where: {id: req.params.id}})
                    .then(product => {
                        res.render('add-product', {
                            action,
                            product
                        });
                    }).catch(error => {
                        console.error(error)
                    });
            } else {
                res.render('add-product', {
                    action
                });
            }
        }
    );

    return router;
};
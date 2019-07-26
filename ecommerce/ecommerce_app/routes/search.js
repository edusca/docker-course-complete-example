let express = require('express');
const db = require('../models/index');

module.exports = (passport) => {
    const router = express.Router();

    router.get('/', (req, res, next) => {
        const searchText = req.query.searchText;

        if (searchText && searchText.length > 0) {

            db.Product.findAll(
                {
                    where: {
                        [db.Sequelize.Op.or]: [
                            {name: {[db.Sequelize.Op.like]: '%' + searchText + '%'}},
                            {description: {[db.Sequelize.Op.like]: '%' + searchText + '%'}}
                        ]
                    },
                    order: [['createdAt', 'DESC']]
                })
                .then(products => {
                    return res.render('search', {products});
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            db.Product.findAll({order: [['createdAt', 'DESC']]})
                .then(products => {
                    return res.render('search', {products});
                })
                .catch(error => {
                    console.error(error);
                });
        }
    });

    return router;
};
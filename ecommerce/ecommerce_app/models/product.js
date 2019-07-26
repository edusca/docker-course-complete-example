'use strict';
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        imageUrl: DataTypes.STRING,
        currency: DataTypes.STRING,
        amount: DataTypes.FLOAT
    }, {});

    Product.associate = function (models) {
        Product.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
    };

    return Product;
};
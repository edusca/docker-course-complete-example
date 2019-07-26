
module.exports = (req, res, next) => {
    res.locals = {
        host: `${req.protocol}://${req.get('host')}`,
        isLoggedIn: !!req.user,
    };

    next();
};
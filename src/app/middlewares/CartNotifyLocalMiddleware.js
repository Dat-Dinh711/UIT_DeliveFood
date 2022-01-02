const Cart = require('../models/Cart');

module.exports = function(req, res, next) {
    if (req.session.authUser == null) {
        return next();
    }

    if (req.session.authUser.cart) {
        var cart = new Cart(req.session.authUser.cart);
        res.locals.lcCart = cart.generateArray();
    }

    return next();
}
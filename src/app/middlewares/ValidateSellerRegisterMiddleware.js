const User = require('../models/User');

module.exports = function(req, res, next) {
    User.findOne({ shopName: req.body.shopName })
        .then(user => {
            if (user) {
                req.flash('message', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']);
                res.redirect(req.headers.referer);
            } else {
                return next();
            }
        })
}
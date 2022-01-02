const User = require('../models/User');

module.exports = {
    phoneNotExist: function(req, res, next) {
        User.find({ phone: req.body.phone })
            .then(docs => {
                if (docs.length) {
                    return next();
                } else {
                    req.flash('message', ['1', '2', '3', '4', '5', '6', '7', '8', '9']);
                    res.redirect(req.headers.referer);
                }
            })
    },
}
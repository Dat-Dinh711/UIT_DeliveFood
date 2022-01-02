const User = require('../models/User');

module.exports = {
    userNameExist: function(req, res, next) {
        User.find({ userName: req.body.userName })
            .then(docs => {
                if (docs.length) {
                    req.flash('message', ['1']);
                    res.redirect(req.headers.referer);
                } else {
                    return next();
                }
            })
    },

    phoneExist: function(req, res, next) {
        User.find({ phone: req.body.phone })
            .then(docs => {
                if (docs.length) {
                    req.flash('message', ['1', '2']);
                    res.redirect(req.headers.referer);
                } else {
                    return next();
                }
            })
    },
}
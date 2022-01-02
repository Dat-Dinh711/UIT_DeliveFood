const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    validateLoginUserName: function(req, res, next) {
        User.findOne({ userName: req.body.userName })
            .then(user => {
                if (user) {
                    const rs = bcrypt.compareSync(req.body.password, user.password);
                    if (rs === false) {
                        req.flash('message', ['1', '2', '3', '4', '5']);
                        res.redirect(req.headers.referer);
                    } else {
                        req.session.isAuthenticated = true;
                        req.session.authUser = user;
                        return next();
                    }
                } else {
                    req.flash('message', ['1', '2', '3', '4']);
                    res.redirect(req.headers.referer);
                }
            })
    },
}
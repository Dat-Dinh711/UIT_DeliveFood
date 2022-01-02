module.exports = function(req, res, next) {
    if (!req.session.isAuthenticated) {
        req.flash('message', ['1', '2', '3', '4', '5', '6', '7']);
        res.redirect(req.headers.referer);
    }

    return next();
}
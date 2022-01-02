module.exports = function(req, res, next) {
    if (req.session.address == null) {
        req.flash('message', ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']);
        res.redirect(req.headers.referer);
    } else {
        return next();
    }

}
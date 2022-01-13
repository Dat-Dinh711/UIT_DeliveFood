module.exports = function(req, res, next) {
    if(!req.session.authUser) {
        res.redirect('/');
    } else if(req.session.authUser.shopName) {
        res.redirect('/')
    } else {
        next();
    }
}
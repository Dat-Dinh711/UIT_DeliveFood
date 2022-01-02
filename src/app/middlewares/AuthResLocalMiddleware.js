module.exports = function(req, res, next) {
    if (req.session.isAuthenticated === null) {
        req.session.isAuthenticated = false;
    }

    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAuthUser = req.session.authUser;

    return next();
}
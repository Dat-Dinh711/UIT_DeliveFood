module.exports = function(req, res, next) {
    res.locals.lcAddress = req.session.address;

    return next();
}
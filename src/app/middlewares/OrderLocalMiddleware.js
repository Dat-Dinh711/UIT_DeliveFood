module.exports = function(req, res, next) {
    res.locals.lcOrder = req.session.order;

    return next();
}
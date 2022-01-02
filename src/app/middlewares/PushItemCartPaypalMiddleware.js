const Cart = require('../models/Cart');

module.exports = function(req, res, next) {
    var cart = new Cart(req.session.cart);
    var items = [];
    for (var i of cart.generateArray()) {
        items.push({
            name: i.item.productName,
            price: ((i.item.price * (1 - (i.item.discount / 100))) / 22975).toFixed(2),
            currency: "USD",
            quantity: i.qty
        })
    }
    var total = 0;
    for (var i = 0; i < items.length; i++) {
        total += parseFloat(items[i].price) * items[i].quantity;
    }

    return next();
}
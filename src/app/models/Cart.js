module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.totalItems = oldCart.totalItems || 0;

    // this.add = function(item, id) {
    //     var storedItem = this.items[id];
    //     if (!storedItem) {
    //         storedItem = this.items[id] = {
    //             item: item,
    //             qty: 0,
    //             price: 0,
    //         }
    //     }
    //     storedItem.qty++;
    //     storedItem.price = (storedItem.item.price * (1 - (storedItem.item.discount / 100))) * storedItem.qty;
    //     this.totalQty++;
    //     this.totalPrice += (storedItem.item.price * (1 - (storedItem.item.discount / 100)));
    // }

    this.add = function(item, id, qty) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {
                item: item,
                qty: 0,
                price: 0,
            }
        }
        storedItem.qty = storedItem.qty + qty;
        storedItem.price = (storedItem.item.price * (1 - (storedItem.item.discount / 100))) * storedItem.qty;
        this.totalQty += qty;
        this.totalPrice += (storedItem.item.price * (1 - (storedItem.item.discount / 100))) * qty;

        var totalItems = 0
        for (var item in this.items) {
            totalItems++;
        }
        this.totalItems = totalItems;
    }

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};
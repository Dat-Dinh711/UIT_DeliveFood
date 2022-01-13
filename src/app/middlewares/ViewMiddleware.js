const handlebars = require('express-handlebars');

module.exports = function(app) {
    app.engine('hbs', handlebars({
        extname: '.hbs',
        helpers: {
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'fas fa-sort',
                    asc: 'fas fa-sort-amount-down-alt',
                    desc: 'fas fa-sort-amount-down',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                <i class="${icon}"></i>
            </a>`;
            },
            sortable_search: (key, field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'fas fa-sort',
                    asc: 'fas fa-sort-amount-down-alt',
                    desc: 'fas fa-sort-amount-down',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?keyword=${key}&_sort&column=${field}&type=${type}">
                <i class="${icon}"></i>
            </a>`;
            },
            ifCond: (v1, v2, options) => {
                if (v1 === v2) {
                    return options.fn(this);
                }
                return options.inverse(this);
            },
            ifDif: (v1, v2, options) => {
                if (v1 != v2) {
                    return options.fn(this);
                }
                return options.inverse(this);
            },
            ifNot: (v1, options) => {
                if (!v1) {
                    return options.fn(this);
                }
                return options.inverse(this);
            },
            switch: (value, options) => {
                this.switch_value = value;
                return options.fn(this);
            },
            case: (value, options) => {
                if (value == this.switch_value) {
                    return options.fn(this);
                }
            },
            // for: (n, block) => {
            //     var accum = '';
            //     for (var i = 0; i < n; ++i)
            //         accum += block.fn(i);
            //     return accum;
            // },
            // multiplication: (a, b) => a * b,
            // price: (a) => {
            //     var c = a;
            //     return a.toLocaleString('vi-VN', {
            //             style: 'currency',
            //             currency: 'VND'
            //         })
            // },
            discount: (a, b) => {
                var c = a * (1 - (b / 100));
                return c.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                })
            },
            paginate: function(options) {
                let output = "";

                if (options.hash.titleProduct) {
                    if (options.hash.totalPage >= 1) {
                        if (options.hash.page === 1) {
                            output += `
                                    <li class="pagination-item disabled">
                                        <a class="pagination-item__link">
                                            <i class="pagination-item__icon fas fa-angle-double-left"></i>
                                        </a>
                                    </li>
                                    `;
                        } else {
                            output += `
                                    <li class="pagination-item">
                                        <a href="?${options.hash.titleProduct}=${options.hash.key}&page=${options.hash.page - 1}" class="pagination-item__link">
                                            <i class="pagination-item__icon fas fa-angle-double-left"></i>
                                        </a>
                                    </li>
                                    `;
                        }

                        let i = (Number(options.hash.page) > 5 ? Number(options.hash.page) - 4 : 1);

                        if (i !== 1) {
                            output += `<li class="pagination-item disabled"><a class="pagination-item__link">....</a></li>`;
                        }

                        for (; i <= (Number(options.hash.page) + 4) && i <= options.hash.totalPage; i++) {
                            if (i === options.hash.page) {
                                output += `<li class="pagination-item pagination-item--active"><a class="pagination-item__link">${i}</a></li>`;
                            } else {
                                output += `<li class="pagination-item">
                                            <a href="?${options.hash.titleProduct}=${options.hash.key}&page=${i}" class="pagination-item__link">${i}</a>
                                        </li>`;
                            }
                            if (i === Number(options.hash.page) + 4 && i < options.hash.totalPage) {
                                output += `<li class="pagination-item disabled"><a class="pagination-item__link">....</a></li>`;
                            }
                        }

                        if (options.hash.page === options.hash.totalPage) {
                            output += `
                                    <li class="page-item disabled">
                                        <a class="pagination-item__link">
                                        <i class="pagination-item__icon fas fa-angle-double-right"></i>
                                        </a>
                                    </li>
                                    `;
                        } else {
                            output += `
                                    <li class="page-item">
                                        <a href="?${options.hash.titleProduct}=${options.hash.key}&page=${options.hash.page + 1}" class="pagination-item__link">
                                        <i class="pagination-item__icon fas fa-angle-double-right"></i>
                                        </a>
                                    </li>
                                    `;
                        }
                    }
                } else {
                    if (options.hash.page === 1) {
                        output += `
                        <li class="pagination-item disabled">
                            <a class="pagination-item__link">
                                <i class="pagination-item__icon fas fa-angle-double-left"></i>
                            </a>
                        </li>
                        `;
                    } else {
                        output += `
                            <li class="pagination-item">
                                <a href="?page=${options.hash.page - 1}" class="pagination-item__link">
                                    <i class="pagination-item__icon fas fa-angle-double-left"></i>
                                </a>
                            </li>
                            `;
                    }

                    let i = (Number(options.hash.page) > 5 ? Number(options.hash.page) - 4 : 1);

                    if (i !== 1) {
                        output += `<li class="pagination-item disabled"><a class="pagination-item__link">....</a></li>`;
                    }

                    for (; i <= (Number(options.hash.page) + 4) && i <= options.hash.totalPage; i++) {
                        if (i === options.hash.page) {
                            output += `<li class="pagination-item pagination-item--active"><a class="pagination-item__link">${i}</a></li>`;
                        } else {
                            output += `<li class="pagination-item"><a href="?page=${i}" class="pagination-item__link">${i}</a></li>`;
                        }
                        if (i === Number(options.hash.page) + 4 && i < options.hash.totalPage) {
                            output += `<li class="pagination-item disabled"><a class="pagination-item__link">....</a></li>`;
                        }
                    }

                    if (options.hash.page === options.hash.totalPage) {
                        output += `
                            <li class="page-item disabled">
                                <a class="pagination-item__link">
                                <i class="pagination-item__icon fas fa-angle-double-right"></i>
                                </a>
                            </li>
                            `;
                    } else {
                        output += `
                            <li class="page-item">
                                <a href="?page=${options.hash.page + 1}" class="pagination-item__link">
                                <i class="pagination-item__icon fas fa-angle-double-right"></i>
                                </a>
                            </li>
                            `;
                    }
                }
                return output;
            },
            orderAllView: function(options) {
                let output = '';

                for (var i in options.hash.cart) {
                    var itemPrice = (options.hash.cart[i].item.price * (1 - (options.hash.cart[i].item.discount / 100)));
                    itemPrice = itemPrice.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    })
                    output += `
                        <div class="order-all__product">
                            <div class="order-all__product-info">
                                <a href="/product-list/${options.hash.cart[i].item.slug}">
                                    <img src="/${options.hash.cart[i].item.image}" alt="" class="order-all__product-img">
                                </a>

                                <div class="order-all__product-detail">
                                    <a href="/product-list/${options.hash.cart[i].item.slug}" class="order-all__product-name">${options.hash.cart[i].item.productName}</a>
                                    <div class="order-all__product-quantity">x ${options.hash.cart[i].qty}</div>
                                </div>
                            </div>

                            <div class="order-all__product-price">${itemPrice}</div>
                        </div>
                    `;
                }
                return output;
            },
            orderDetailSellerView: function(options) {
                let output = '';

                for (var i in options.hash.cart) {
                    var itemPrice = (options.hash.cart[i].item.price * (1 - (options.hash.cart[i].item.discount / 100)));
                    itemPrice = itemPrice.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    })

                    price = options.hash.cart[i].price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    })

                    output += `
                        <ul class="order-detail__product-list-item">
                            <li>
                                <img src="/${options.hash.cart[i].item.image}" alt="${options.hash.cart[i].item.productName}" class="order-detail__product-list-item-img">
                                <div>
                                    <div>${options.hash.cart[i].item.productName}</div>
                                </div>
                            </li>
                            <li>${itemPrice}</li>
                            <li>${options.hash.cart[i].qty}</li>
                            <li>${price}</li>
                        </ul>
                    `;
                }

                return output;
            },
            sumPrice: function(a, b) {
                var c = a + b;
                return c.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                })
            },
            orderReceivedDetailShipperView: function(options) {
                let output = '';
                if (options.hash.status === 'success' || options.hash.status === 'success-delivery' || options.hash.status === 'cancel') {
                    output += `
                        <div>
                            <a href="/shipper/order-received">
                                <button class="secondary-button order-detail__control-btn">Thoát</button>
                            </a>
                        </div>
                    `;
                } else {
                    output += `
                        <div style="width: 16%">
                            <form action="/shipper/order-received/cancel/${options.hash.id}" method="POST">
                                <button class="secondary-button order-detail__control-btn">Hủy đơn hàng</button>
                            </form>
                        </div>
                        <div style="width: 16%">
                            <form action="/shipper/order-received/complete" method="POST">
                                <input type="text" name="id" value=${options.hash.id} style="display: none;">
                                <input type="text" name="shippingFee" value=${options.hash.shippingFee} style="display: none;">
                                <button class="primary-button order-detail__control-btn">Giao hàng thành công</button>
                            </form>
                        </div>
                    `;
                }
                return output;
            },
            RatingReviewProductDetailView: function(options) {
                let output = '';
                for (var i = 1; i <= options.hash.rating; i++) {
                    output += `
                        <i class="fas fa-star rate-icon"></i>
                    `;
                }
                return output;
            },
            paginateReview: function(options) {
                let output = "";

                if (options.hash.totalPage >= 1) {
                    if (options.hash.page === 1) {
                        output += `
                                <li class="pagination-item disabled">
                                    <a class="pagination-item__link">
                                        <i class="pagination-item__icon fas fa-angle-double-left"></i>
                                    </a>
                                </li>
                                `;
                    } else {
                        output += `
                                <li class="pagination-item">
                                    <a href="?rating=${options.hash.rating}&page=${options.hash.page - 1}" class="pagination-item__link">
                                        <i class="pagination-item__icon fas fa-angle-double-left"></i>
                                    </a>
                                </li>
                                `;
                    }

                    let i = (Number(options.hash.page) > 5 ? Number(options.hash.page) - 4 : 1);

                    if (i !== 1) {
                        output += `<li class="pagination-item disabled"><a class="pagination-item__link">....</a></li>`;
                    }

                    for (; i <= (Number(options.hash.page) + 4) && i <= options.hash.totalPage; i++) {
                        if (i === options.hash.page) {
                            output += `<li class="pagination-item pagination-item--active"><a class="pagination-item__link">${i}</a></li>`;
                        } else {
                            output += `<li class="pagination-item">
                                        <a href="?rating=${options.hash.rating}&page=${i}" class="pagination-item__link">${i}</a>
                                    </li>`;
                        }
                        if (i === Number(options.hash.page) + 4 && i < options.hash.totalPage) {
                            output += `<li class="pagination-item disabled"><a class="pagination-item__link">....</a></li>`;
                        }
                    }

                    if (options.hash.page === options.hash.totalPage) {
                        output += `
                                <li class="page-item disabled">
                                    <a class="pagination-item__link">
                                    <i class="pagination-item__icon fas fa-angle-double-right"></i>
                                    </a>
                                </li>
                                `;
                    } else {
                        output += `
                                <li class="page-item">
                                    <a href="?rating=${options.hash.rating}&page=${options.hash.page + 1}" class="pagination-item__link">
                                    <i class="pagination-item__icon fas fa-angle-double-right"></i>
                                    </a>
                                </li>
                                `;
                    }
                }

                return output;
            },
            materialsView: function(options) {
                let output = '';

                for (var i in options.hash.material) {
                    output += `<li>${options.hash.material[i]}</li>`;
                }

                return output;
            }
        },
    }));

    app.set('view engine', 'hbs');
}
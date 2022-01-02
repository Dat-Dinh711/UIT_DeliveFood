// Thêm, Xóa, Sửa đơn hàng
const subQtyBtns = document.querySelectorAll('.sub-qty-btn');
const addQtyBtns = document.querySelectorAll('.add-qty-btn');
const clearQtyBtns = document.querySelectorAll('.clear-qty-btn');

const subQtyForm = document.querySelector('.qty-form');

subQtyBtns.forEach(subQtyBtn => {
    subQtyBtn.addEventListener('click', function() {
        var productID = subQtyBtn.getAttribute('data-id');
        subQtyForm.action = '/cart/update/' + productID + '?action=sub';
        subQtyForm.submit();
    });
})

addQtyBtns.forEach(addQtyBtn => {
    addQtyBtn.addEventListener('click', function() {
        var productID = addQtyBtn.getAttribute('data-id');
        subQtyForm.action = '/cart/update/' + productID + '?action=add';
        subQtyForm.submit();
    });
})

clearQtyBtns.forEach(clearQtyBtn => {
    clearQtyBtn.addEventListener('click', function() {
        var productID = clearQtyBtn.getAttribute('data-id');
        subQtyForm.action = '/cart/update/' + productID + '?action=clear';
        subQtyForm.submit();
    });
})


// Xóa tất cả sản phẩm trong giỏ hàng
deleteAllCartBtn.addEventListener('click', showDeleteAllCartForm);

// Check all
const checkboxCartAll = document.querySelector('.checkbox-cart-all');
const checkboxCartItems = document.querySelectorAll('.checkbox-cart-items');
const checkoutBtn = document.querySelector('.checkout-btn');

checkboxCartAll.addEventListener('change', function() {
    var isCheckedAll = this.checked;

    for (var checkboxCartItem of checkboxCartItems) {
        checkboxCartItem.checked = isCheckedAll;
    }

    renderCheckoutBtn();
});

for (var checkboxCartItem of checkboxCartItems) {
    checkboxCartItem.addEventListener('click', function() {
        var isCheckedAll = checkboxCartItems.length === document.querySelectorAll('.checkbox-cart-items:checked').length;

        checkboxCartAll.checked = isCheckedAll;
        renderCheckoutBtn();
    });
}

function renderCheckoutBtn() {
    var checkedCount = document.querySelectorAll('.checkbox-cart-items:checked').length;

    if (checkedCount > 0) {
        checkoutBtn.disabled = false;
        checkoutBtn.classList.remove('disabled');
    } else {
        checkoutBtn.disabled = true;
        checkoutBtn.classList.add('disabled');
    }
}
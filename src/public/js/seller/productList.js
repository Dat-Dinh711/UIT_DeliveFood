// Xóa sản phẩm
const btnDeleteProduct = document.querySelector('.btn-delete-product');
const deleteForm = document.forms['delete-product-form'];

var productID;

btnDeleteProduct.addEventListener('click', function() {
    // deleteForm.action = '/seller/product-list/' + productID + '?_method=DELETE';
    deleteForm.action = '/seller/product-list/' + productID;
    deleteForm.submit();
});

// Checkbox
const checkboxAll = document.querySelector('#checkbox-all');
const checkboxItems = document.querySelectorAll('.checkbox-item');
const modalDeleteMultiProductsDeleteBtn = document.querySelector('.js-modal-delete-multi-products-delete-btn');
const multiChoiceActionsForm = document.forms['multi-choice-actions-form'];
const selectChoiceAction = document.querySelector('.multi-choice-action-select');

// Checkbox All clicked
checkboxAll.addEventListener('click', function() {
    var isCheckedAll = this.checked;

    for (var checkboxItem of checkboxItems) {
        checkboxItem.checked = isCheckedAll;
    }
    renderMultiChoiceActionBtn();
});

// Product item checkbox clicked
for (var checkboxItem of checkboxItems) {
    checkboxItem.addEventListener('click', function() {
        var isCheckedAll = checkboxItems.length === document.querySelectorAll('.checkbox-item:checked').length;

        checkboxAll.checked = isCheckedAll;
        renderMultiChoiceActionBtn();
    });
}

// Re-render submit button
function renderMultiChoiceActionBtn() {
    var checkedCount = document.querySelectorAll('.checkbox-item:checked').length;

    if (checkedCount > 0) {
        multiChoiceActionsBtn.classList.remove('disabled');
    } else {
        multiChoiceActionsBtn.classList.add('disabled');
    }
}

multiChoiceActionsBtn.addEventListener('click', function(event) {
    event.preventDefault();

    var isNoChoiceAction = document.querySelector('.multi-choice-action-select').value == 'no-action';

    if (isNoChoiceAction) {
        hideMultiActionsForm();
    }
});

// Xóa nhiều sản phẩm
modalDeleteMultiProductsDeleteBtn.addEventListener('click', function() {
    multiChoiceActionsForm.submit();
});
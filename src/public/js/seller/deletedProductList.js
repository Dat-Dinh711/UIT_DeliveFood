const restoreForm = document.forms['restore-product-form'];
const deleteForm = document.forms['delete-product-form'];
const restoreBtns = document.querySelectorAll('.btn-restore');
const btnDeleteProduct = document.querySelector('.btn-delete-product');

var productID;

for (restoreBtn of restoreBtns) {
    restoreBtn.addEventListener('click', function() {
        productID = this.getAttribute('data-id');

        restoreForm.action = '/seller/product-list/' + productID + '/restore?_method=PATCH';
        restoreForm.submit();
    });
}

btnDeleteProduct.addEventListener('click', function() {
    deleteForm.action = '/seller/product-list/' + productID + '/force?_method=DELETE';
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

    if (document.querySelector('.multi-choice-action-select').value == 'no-action') {
        hideMultiActionsForm();
    } else if (document.querySelector('.multi-choice-action-select').value == 'restore') {
        hideMultiActionsForm();
        multiChoiceActionsForm.submit();
    }
});

// Xóa vĩnh viễn nhiều sản phẩm
modalDeleteMultiProductsDeleteBtn.addEventListener('click', function() {
    multiChoiceActionsForm.submit();
});
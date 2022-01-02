// Tăng giảm số lượng sản phẩm
const btnSub = document.querySelector('.btn-minus');
const btnAdd = document.querySelector('.btn-plus');
const inputQty = document.querySelector('.quantity-btn-count');
const inputAtc = document.querySelector('.input-add-to-cart');
const inputBn = document.querySelector('.input-buy-now');

var oldValue;

if (inputQty.value == 1) {
    btnSub.disabled = true;
    oldValue = 1;

    inputAtc.value = inputQty.value;
    inputBn.value = inputQty.value;
}

btnSub.addEventListener('click', function() {
    inputQty.value--;

    inputQty.setAttribute('value', inputQty.value);

    if (inputQty.value == 1) {
        btnSub.disabled = true;
    }
    oldValue = inputQty.value;

    inputAtc.value = inputQty.value;
    inputBn.value = inputQty.value;
});

btnAdd.addEventListener('click', function() {
    inputQty.value++;

    inputQty.setAttribute('value', inputQty.value);

    btnSub.disabled = false;

    oldValue = inputQty.value;

    inputAtc.value = inputQty.value;
    inputBn.value = inputQty.value;
});

inputQty.addEventListener('keypress', function(event) {
    var charCode = (event.which) ? event.which : event.keyCode
    if (charCode > 31 && (charCode < 47 || charCode > 57)) {
        event.preventDefault();
    }
});

inputQty.addEventListener('change', function(event) {
    if (inputQty.value != '' && inputQty.value != 0) {
        inputQty.value = inputQty.value;
        oldValue = inputQty.value;
        inputAtc.value = inputQty.value;
        inputBn.value = inputQty.value;
    } else {
        inputQty.value = oldValue;
        inputAtc.value = inputQty.value;
        inputBn.value = inputQty.value;
    }
});
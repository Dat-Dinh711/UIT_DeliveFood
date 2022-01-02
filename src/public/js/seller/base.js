// Confirm Delete Form: tắt/mở
const modal = document.querySelector('.js-modal');
const modalBody = document.querySelector('.js-modal__body');
const deleteBtns = document.querySelectorAll('.js-product-list__item-delete');
const backBtn = document.querySelector('.js-back-btn');
const loginForm = document.querySelector('.js-login-auth-form');

function showLoginForm() {
    modal.classList.add('open');
    loginForm.classList.add('open');

    productID = this.getAttribute('data-id');
}

function hideForm() {
    modal.classList.remove('open');
    loginForm.classList.remove('open');
}

for (const deleteBtn of deleteBtns) {
    deleteBtn.addEventListener('click', showLoginForm);
}

backBtn.addEventListener('click', hideForm);

modal.addEventListener('click', hideForm);

modalBody.addEventListener('click', function(event) {
    event.stopPropagation(modalBody);
});

//  Modal Confirm Delete Multi Products: tắt/mở
const modalDeleteMultiProducts = document.querySelector('.modal-delete-multi-products');
const modalDeleteMultiProductsBody = document.querySelector('.modal-delete-multi-products-body');
const multiChoiceActionsBtn = document.querySelector('.multi-choice-actions-btn');
const modalDeleteMultiProductsBackBtn = document.querySelector('.js-modal-delete-multi-products-back-btn');
const modalDeleteMultiProductsForm = document.querySelector('.js-modal-delete-multi-products-body-form');

function showMultiActionsForm() {
    modalDeleteMultiProducts.classList.add('open');
    modalDeleteMultiProductsForm.classList.add('open');
}

function hideMultiActionsForm() {
    modalDeleteMultiProducts.classList.remove('open');
    modalDeleteMultiProductsForm.classList.remove('open');
}

multiChoiceActionsBtn.addEventListener('click', showMultiActionsForm);

modalDeleteMultiProductsBackBtn.addEventListener('click', hideMultiActionsForm);

modalDeleteMultiProducts.addEventListener('click', hideMultiActionsForm);

modalDeleteMultiProductsBody.addEventListener('click', function(event) {
    event.stopPropagation(modalDeleteMultiProductsBody);
});

// Animation for Navbar Seller
// const categoryProducts = document.querySelector('.navbar__seller-category-products');
// const categoryProductsJS = document.querySelector('.js-category-products');
// const categoryProductsList = document.querySelector('.navbar__seller-category-products-list');
// const categoryProductsListItems = document.querySelectorAll('.navbar__seller-category-products-item');

// var count = 0;
// for (var categoryProductsListItem of categoryProductsListItems) {
//     count++;
// }

// var categoryProductsHeight = categoryProducts.clientHeight;
// var height = categoryProductsHeight + count * 29 + 5;

// const navbarSeller = document.querySelector('.navbar__seller');
// const navbarSellerContent = document.querySelector('.navbar__seller-content');
// var navbarSellerContentHeight = navbarSellerContent.clientHeight;
// var navbarSellerHeight = navbarSeller.clientHeight;
// var listProductsHeight = count * 29 + 5;
// var remainHeight = navbarSellerHeight - navbarSellerContentHeight;

// categoryProductsJS.addEventListener('click', function() {
//     if (categoryProducts.clientHeight == categoryProductsHeight) {
//         if (listProductsHeight <= remainHeight) {
//             navbarSeller.style = 'height: ' + navbarSellerHeight + 'px';
//         } else {
//             navbarSeller.style = 'height: calc(' + navbarSellerHeight + 'px + ' + listProductsHeight + 'px - ' + remainHeight + 'px)';
//         }

//         categoryProductsList.style = 'display: block';
//         categoryProducts.style = 'height: ' + height + 'px';
//     } else {
//         categoryProducts.style = 'height: 50px';
//         categoryProductsList.style = 'display: none';
//         navbarSeller.style = 'height: ' + navbarSellerHeight + 'px';
//     }
// });
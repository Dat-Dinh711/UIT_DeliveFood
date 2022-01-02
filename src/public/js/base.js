// Show/Hide Password
var tables = document.querySelectorAll(".edit-table");

function showHide(input, icon) {
    type = input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
    icon.classList.toggle("fa-eye-slash");
}

for (var table of tables) {
    table.addEventListener("click", (event) => {
        if (event.target.matches("#togglePassword")) {
            var icon = event.target;
            var input = icon.previousElementSibling;
            showHide(input, icon);
        }
    });
}

// Register, Login & Logout Form: tắt/mở
const modal = document.querySelector('.js-modal');
const modalBody = document.querySelector(".js-modal__body");

const registerBtns = document.querySelectorAll('.js-register');
const loginBtns = document.querySelectorAll('.js-login');
const logoutBtn = document.querySelector('.header-search__user-log-out');
const forgotPasswordBtn = document.querySelector('.auth-form__help-forgot');
const backBtns = document.querySelectorAll('.js-back-btn');
const sellerRegisterBtn = document.querySelector('.header-search__seller-register');
const shipperRegisterBtn = document.querySelector('.header-search__shipper-register');
const deleteAllCartBtn = document.querySelector('.delete-all');
const addAddressBtn = document.querySelector('.js-add-address-btn');
const deleteAddressBtn = document.querySelector('.js-delete-address-btn');

const registerForm = document.querySelector('.js-regis-auth-form');
const loginForm = document.querySelector('.js-login-auth-form');
const logoutForm = document.querySelector('.js-logout-form');
const forgotPasswordForm = document.querySelector('.js-forgot-password-form');
const sellerRegisterForm = document.querySelector('.js-seller-form');
const shipperRegisterForm = document.querySelector('.js-shipper-form');
const deleteAllCartForm = document.querySelector('.js-delete-all-cart-form');
const addAddressForm = document.querySelector('.js-add-address-form');
const deleteAddressForm = document.querySelector('.js-delete-address-form');

function showRegisterForm() {
    modal.classList.add('open');
    registerForm.classList.add('open');
    loginForm.classList.remove('open');
    logoutForm.classList.remove('open');
    forgotPasswordForm.classList.remove('open');
    sellerRegisterForm.classList.remove('open');
    shipperRegisterForm.classList.remove('open');
    deleteAllCartForm.classList.remove('open');
    addAddressForm.classList.remove('open');
    deleteAddressForm.classList.remove('open');
}

function showLoginForm() {
    modal.classList.add('open');
    loginForm.classList.add('open');
    registerForm.classList.remove('open');
    logoutForm.classList.remove('open');
    forgotPasswordForm.classList.remove('open');
    sellerRegisterForm.classList.remove('open');
    shipperRegisterForm.classList.remove('open');
    deleteAllCartForm.classList.remove('open');
    addAddressForm.classList.remove('open');
    deleteAddressForm.classList.remove('open');
}

function showLogoutForm() {
    modal.classList.add('open');
    logoutForm.classList.add('open');
    registerForm.classList.remove('open');
    loginForm.classList.remove('open');
    forgotPasswordForm.classList.remove('open');
    sellerRegisterForm.classList.remove('open');
    shipperRegisterForm.classList.remove('open');
    deleteAllCartForm.classList.remove('open');
    addAddressForm.classList.remove('open');
    deleteAddressForm.classList.remove('open');
}

function showForgotPasswordForm() {
    modal.classList.add('open');
    forgotPasswordForm.classList.add('open');
    logoutForm.classList.remove('open');
    registerForm.classList.remove('open');
    loginForm.classList.remove('open');
    sellerRegisterForm.classList.remove('open');
    shipperRegisterForm.classList.remove('open');
    deleteAllCartForm.classList.remove('open');
    addAddressForm.classList.remove('open');
    deleteAddressForm.classList.remove('open');
}

function showSellerRegisterForm() {
    modal.classList.add('open');
    sellerRegisterForm.classList.add('open');
    forgotPasswordForm.classList.remove('open');
    logoutForm.classList.remove('open');
    registerForm.classList.remove('open');
    loginForm.classList.remove('open');
    shipperRegisterForm.classList.remove('open');
    deleteAllCartForm.classList.remove('open');
    addAddressForm.classList.remove('open');
    deleteAddressForm.classList.remove('open');
}

function showShipperRegisterForm() {
    modal.classList.add('open');
    shipperRegisterForm.classList.add('open');
    sellerRegisterForm.classList.remove('open');
    forgotPasswordForm.classList.remove('open');
    logoutForm.classList.remove('open');
    registerForm.classList.remove('open');
    loginForm.classList.remove('open');
    deleteAllCartForm.classList.remove('open');
    addAddressForm.classList.remove('open');
    deleteAddressForm.classList.remove('open');
}

function showDeleteAllCartForm() {
    modal.classList.add('open');
    deleteAllCartForm.classList.add('open');
    shipperRegisterForm.classList.remove('open');
    sellerRegisterForm.classList.remove('open');
    forgotPasswordForm.classList.remove('open');
    logoutForm.classList.remove('open');
    registerForm.classList.remove('open');
    loginForm.classList.remove('open');
    addAddressForm.classList.remove('open');
    deleteAddressForm.classList.remove('open');
}

function showAddAddressForm() {
    modal.classList.add('open');
    addAddressForm.classList.add('open');
    deleteAllCartForm.classList.remove('open');
    shipperRegisterForm.classList.remove('open');
    sellerRegisterForm.classList.remove('open');
    forgotPasswordForm.classList.remove('open');
    logoutForm.classList.remove('open');
    registerForm.classList.remove('open');
    loginForm.classList.remove('open');
    deleteAddressForm.classList.remove('open');
}

function showDeleteAddressForm() {
    modal.classList.add('open');
    deleteAddressForm.classList.add('open');
    addAddressForm.classList.remove('open');
    deleteAllCartForm.classList.remove('open');
    shipperRegisterForm.classList.remove('open');
    sellerRegisterForm.classList.remove('open');
    forgotPasswordForm.classList.remove('open');
    logoutForm.classList.remove('open');
    registerForm.classList.remove('open');
    loginForm.classList.remove('open');
}

function hideForm() {
    modal.classList.remove('open');
    registerForm.classList.remove('open');
    loginForm.classList.remove('open');
    logoutForm.classList.remove('open');
    forgotPasswordForm.classList.remove('open');
    sellerRegisterForm.classList.remove('open');
    shipperRegisterForm.classList.remove('open');
    deleteAllCartForm.classList.remove('open');
    ratingProductForm.classList.remove('open');
    deleteAddressForm.classList.remove('open');
}

for (const registerBtn of registerBtns) {
    registerBtn.addEventListener('click', showRegisterForm);
}

for (const loginBtn of loginBtns) {
    loginBtn.addEventListener('click', showLoginForm);
}

for (const backBtn of backBtns) {
    backBtn.addEventListener('click', hideForm);
}

forgotPasswordBtn.addEventListener('click', showForgotPasswordForm);

modal.addEventListener('click', hideForm);

modalBody.addEventListener('click', function(event) {
    event.stopPropagation(modalBody);
})

logoutBtn.addEventListener('click', showLogoutForm);

addAddressBtn.addEventListener('click', showAddAddressForm);

deleteAddressBtn.addEventListener('click', showDeleteAddressForm);

sellerRegisterBtn.addEventListener('click', showSellerRegisterForm);

shipperRegisterBtn.addEventListener('click', showShipperRegisterForm);






// // Login with Google
// const loginGoogleBtns = document.querySelectorAll('.js-login-google');

// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }

// for (const loginGoogleBtn of loginGoogleBtns) {
//     loginGoogleBtn.addEventListener('click', onSignIn);
// }

// //Login Facebook
// function statusChangeCallback(response) { // Called with the results from FB.getLoginStatus().
//     console.log('statusChangeCallback');
//     console.log(response); // The current login status of the person.
//     if (response.status === 'connected') { // Logged into your webpage and Facebook.
//         testAPI();
//     } else { // Not logged into your webpage or we are unable to tell.
//         document.getElementById('status').innerHTML = 'Please log ' +
//             'into this webpage.';
//     }
// }

// function checkLoginState() { // Called when a person is finished with the Login Button.
//     FB.getLoginStatus(function(response) { // See the onlogin handler
//         statusChangeCallback(response);
//     });
// }

// window.fbAsyncInit = function() {
//     FB.init({
//         appId: '359469145803979',
//         cookie: true, // Enable cookies to allow the server to access the session.
//         xfbml: true, // Parse social plugins on this webpage.
//         version: 'v3.0' // Use this Graph API version for this call.
//     });


//     FB.getLoginStatus(function(response) { // Called after the JS SDK has been initialized.
//         statusChangeCallback(response); // Returns the login status.
//     });
// };

// function testAPI() { // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
//     console.log('Welcome!  Fetching your information.... ');
//     FB.api('/me', function(response) {
//         console.log('Successful login for: ' + response.name);
//         document.getElementById('status').innerHTML =
//             'Thanks for logging in, ' + response.name + '!';
//     });
// }

// const loginFacebook = document.querySelector('.js-facebook-login');

// loginFacebook.addEventListener('click', checkLoginState);
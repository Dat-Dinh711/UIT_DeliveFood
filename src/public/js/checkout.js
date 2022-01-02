// Change Address
const changeBtn = document.querySelector('.js-change-address-btn')
const backBtn = document.querySelector('.js-btn-back')

const infoDiv = document.querySelector('.js-info-div')
const changeDiv = document.querySelector('.js-change-address-div');

changeBtn.addEventListener('click', function() {
    infoDiv.classList.add('close');
    changeDiv.classList.add('open');
});

backBtn.addEventListener('click', function() {
    infoDiv.classList.remove('close');
    changeDiv.classList.remove('open');
});

// Select a payment method
const paymentDelivery = document.querySelector('.payment-delivery');
const paymentCart = document.querySelector('.payment-cart');
const paymentPaypal = document.querySelector('.payment-paypal');

const activeTickDelivery = document.querySelector('.type-item-active-tick-delivery');
const activeTickCart = document.querySelector('.type-item-active-tick-cart');
const activeTickPaypal = document.querySelector('.type-item-active-tick-paypal');

const paymentCartForm = document.querySelector('.container__payment-total-cart');
const containerDelivery = document.querySelector('.container__payment-total-delivery');
const btnOrder = document.querySelector('.btn-order');
const btnOrderPaypal = document.querySelector('.btn-order-paypal');

const checkoutShippingNotify = document.querySelectorAll('.checkout-shipping-notify');
const normalCheckoutShippingNotify = document.querySelectorAll('.normal-checkout-shipping');

paymentCart.addEventListener('click', function() {
    paymentCart.classList.add('type-item-active');
    activeTickCart.classList.add('open');
    paymentCartForm.classList.add('open');
    btnOrder.classList.add('close');
    btnOrderPaypal.classList.add('close');
    containerDelivery.style = 'bottom: 40px';
    checkoutShippingNotify.forEach(item => {
        item.classList.remove('close');
    });

    paymentDelivery.classList.remove('type-item-active');
    activeTickDelivery.classList.remove('open');
    paymentPaypal.classList.remove('type-item-active');
    activeTickPaypal.classList.remove('open');
    normalCheckoutShippingNotify.forEach(item => {
        item.classList.add('close');
    });
});

paymentDelivery.addEventListener('click', function() {
    paymentDelivery.classList.add('type-item-active');
    activeTickDelivery.classList.add('open');
    containerDelivery.style = 'bottom: 0';

    paymentCart.classList.remove('type-item-active');
    activeTickCart.classList.remove('open');
    paymentPaypal.classList.remove('type-item-active');
    activeTickPaypal.classList.remove('open');
    btnOrder.classList.remove('close');
    btnOrderPaypal.classList.add('close');
    paymentPaypal.classList.remove('type-item-active');
    paymentCartForm.classList.remove('open');
    checkoutShippingNotify.forEach(item => {
        item.classList.add('close');
    });
    normalCheckoutShippingNotify.forEach(item => {
        item.classList.remove('close');
    });
});

paymentPaypal.addEventListener('click', function() {
    paymentPaypal.classList.add('type-item-active');
    activeTickPaypal.classList.add('open');
    btnOrderPaypal.classList.remove('close');
    btnOrder.classList.add('close');

    paymentDelivery.classList.remove('type-item-active');
    paymentCart.classList.remove('type-item-active');
    activeTickDelivery.classList.remove('open');
    activeTickCart.classList.remove('open');
    paymentCartForm.classList.remove('open');
    containerDelivery.style = 'bottom: 0';
    checkoutShippingNotify.forEach(item => {
        item.classList.remove('close');
    });
    normalCheckoutShippingNotify.forEach(item => {
        item.classList.add('close');
    });
});


// Validate Credit Cards
Stripe.setPublishableKey('pk_test_51K6GORG4Ozz25YtBlpv8af9jdRTmj25Y6kQvcYLDYZuWC8DnssFNE6r63zW0Qq3xh6nz83nz5gK9HhCmYxjfA5mr00VHDgLSh0');

var $form = $('#checkout-form');

$form.submit(function(event) {
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        name: $('#card-name').val(),
    }, stripeResponseHandler);
    return false;
});

function stripeResponseHandler(status, response) {
    if (response.error) {
        $form.find('#charge-error').text(response.error.message);
        $form.find('#charge-error').removeClass('hidden');
        $form.find('button').prop('disabled', false);
    } else {
        var token = response.id;
        $form.append($('<input type="hidden" name="stripeToken"/>').val(token));
        $form.get(0).submit();
    }
}
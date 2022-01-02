Validator({
    form: '#register-form',
    formGroupSelector: '.auth-form__group',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#userName'),
        Validator.isRequired('#phone'),
        Validator.isPhoneNumber('#phone'),
        /* Validator.isRequired('#email'),
         Validator.isEmail('#email'),
         Validator.isRequired('input[name="gender"]'),*/
        // Validator.isRequired('#role'),
        Validator.isRequired('#password'),
        Validator.minLength('#password', 6),
        Validator.isRequired('#re_password'),
        Validator.isConfirmPassword('#re_password', function() {
            return document.querySelector('#register-form #password').value;
        }, 'Mật khẩu nhập lại không chính xác'),
    ],
});

Validator({
    form: '#log-in-form',
    formGroupSelector: '.auth-form__group',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#userName'),
        Validator.isRequired('#password'),
    ]
});

Validator({
    form: '#forgot-password-form',
    formGroupSelector: '.auth-form__group',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#phone'),
        Validator.isPhoneNumber('#phone'),
        Validator.isRequired('#password'),
        Validator.minLength('#password', 6),
        Validator.isRequired('#re_password'),
        Validator.isConfirmPassword('#re_password', function() {
            return document.querySelector('#forgot-password-form #password').value;
        }, 'Mật khẩu nhập lại không chính xác'),
    ]
});

Validator({
    form: '#seller-form',
    formGroupSelector: '.auth-form__group',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#shopName'),
        Validator.isRequired('#shopAddress'),
    ]
});

Validator({
    form: '#shipper-form',
    formGroupSelector: '.auth-form__group',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#shipperName'),
        Validator.isRequired('#shipperAddress'),
        Validator.isRequired('#shipperTypeMotor'),
        Validator.isRequired('#shipperLicensePlates'),
    ]
});

Validator({
    form: '#add-address-form',
    formGroupSelector: '.auth-form__group',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#name'),
        Validator.isRequired('#phone'),
        Validator.isPhoneNumber('#phone'),
        Validator.isRequired('#address'),
    ]
});

Validator({
    form: '#edit-address-form',
    formGroupSelector: '.auth-form__group',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#name'),
        Validator.isRequired('#phone'),
        Validator.isPhoneNumber('#phone'),
        Validator.isRequired('#address'),
    ]
});

Validator({
    form: '#change-password-form',
    formGroupSelector: '.auth-form__group',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#password'),
        Validator.minLength('#password', 6),
        Validator.isRequired('#re_password'),
        Validator.isConfirmPassword('#re_password', function() {
            return document.querySelector('#change-password-form #password').value;
        }, 'Mật khẩu nhập lại không chính xác'),
    ]
});
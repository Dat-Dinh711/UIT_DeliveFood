// Toast function
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");

        // Auto remove toast
        const autoRemoveId = setTimeout(function() {
            main.removeChild(toast);
        }, duration + 1000);

        // Remove toast when clicked
        toast.onclick = function(e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: "fas fa-check-circle",
            info: "fas fa-info-circle",
            warning: "fas fa-exclamation-circle",
            error: "fas fa-exclamation-circle"
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
                    <div class="toast__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="toast__body">
                        <h3 class="toast__title">${title}</h3>
                        <p class="toast__msg">${message}</p>
                    </div>
                    <div class="toast__close">
                        <i class="fas fa-times"></i>
                    </div>
                `;
        main.appendChild(toast);
    }
}

function showSuccessRegisterToast() {
    toast({
        title: "Thành công!",
        message: "Bạn đã đăng ký thành công tài khoản tại UIT-DeliveFood.",
        type: "success",
        duration: 5000
    });
}

function showErrorUserNameRegisterToast() {
    toast({
        title: "Thất bại!",
        message: "Tên đăng nhập đã tồn tại. Vui lòng kiếm tra lại.",
        type: "error",
        duration: 5000
    });
}

function showErrorPhoneRegisterToast() {
    toast({
        title: "Thất bại!",
        message: "Số điện thoại đã tồn tại. Vui lòng kiếm tra lại.",
        type: "error",
        duration: 5000
    });
}

function showErrorUserNameLoginToast() {
    toast({
        title: "Thất bại!",
        message: "Tài khoản không tồn tại. Vui lòng kiếm tra lại.",
        type: "error",
        duration: 5000
    });
}

function showErrorPasswordLoginToast() {
    toast({
        title: "Thất bại!",
        message: "Mật khẩu không đúng. Vui lòng kiếm tra lại.",
        type: "error",
        duration: 5000
    });
}

function showSuccessLoginToast() {
    toast({
        title: "Thành công!",
        message: "Bạn đã đăng nhập thành công.",
        type: "success",
        duration: 5000
    });
}

function showRestrictToast() {
    toast({
        title: "Thất bại!",
        message: "Vui lòng đặng nhập để thực hiện thao tác này.",
        type: "error",
        duration: 5000
    });
}

function showNotSelectAddressToast() {
    toast({
        title: "Thất bại!",
        message: "Vui lòng thiết lập địa chỉ nhận hàng để thực hiện việc thanh toán.",
        type: "error",
        duration: 5000
    });
}

function showLogoutToast() {
    toast({
        title: "Đăng xuất thành công!",
        message: "Bạn đã đăng xuất khỏi tài khoản thành công.",
        type: "success",
        duration: 5000
    });
}

function showErrorForgotPasswordToast() {
    toast({
        title: "Thất bại!",
        message: "Số điện thoại này chưa được đăng ký tài khoản. Vui lòng kiếm tra lại.",
        type: "error",
        duration: 5000
    });
}

function showSuccessForgotPasswordToast() {
    toast({
        title: "Thành công!",
        message: "Cập nhật mật khẩu thành công.",
        type: "success",
        duration: 5000
    });
}

function showErrorShopNameToast() {
    toast({
        title: "Thất bại!",
        message: "Tên cửa hàng đã tồn tại.",
        type: "error",
        duration: 5000
    });
}

function showSuccessAddToCartToast() {
    toast({
        title: "Thành công!",
        message: "Sản phẩm đã được thêm vào giỏ hàng.",
        type: "success",
        duration: 5000
    });
}

function showSuccessReviewToast() {
    toast({
        title: "Thành công!",
        message: "Bạn đã đánh giá thành công sản phẩm.",
        type: "success",
        duration: 5000
    });
}

function showSuccessUpdateProfileToast() {
    toast({
        title: "Thành công!",
        message: "Bạn đã cập nhật thành công.",
        type: "success",
        duration: 5000
    });
}

function showSuccessAddAddressToast() {
    toast({
        title: "Thành công!",
        message: "Thêm địa chỉ thành công.",
        type: "success",
        duration: 5000
    });
}

function showSuccessDeleteAddressToast() {
    toast({
        title: "Thành công!",
        message: "Đã xóa thành công địa chỉ.",
        type: "success",
        duration: 5000
    });
}
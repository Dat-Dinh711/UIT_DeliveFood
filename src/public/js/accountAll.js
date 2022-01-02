const accountModalOverlay = document.querySelector('.account__content-modal-overlay');
const containerContent = document.querySelector('.container-content');
const header = document.querySelector('.header');
const navbar = document.querySelector('.account__navbar');
const content = document.querySelector('.account__content');
const date = document.querySelector('.account__content-info-content-date');

const dateDiv = document.querySelector('.js-date');
const dateTitle = document.querySelector('.js-date-title');
const dateList = document.querySelector('.js-date-list');
const dateItems = document.querySelectorAll('.js-date-item');
const dateIconUp = document.querySelector('.js-date-icon-up');
const dateIconDown = document.querySelector('.js-date-icon-down');

accountModalOverlay.addEventListener('click', function() {
    dateListHide();
    monthListHide();
    yearListHide();

    console.log('hello');
});

header.addEventListener('click', function() {
    dateListHide();
    monthListHide();
    yearListHide();
});

containerContent.addEventListener('click', function() {
    dateListHide();
    monthListHide();
    yearListHide();
});

navbar.addEventListener('click', function() {
    dateListHide();
    monthListHide();
    yearListHide();
});

content.addEventListener('click', function() {
    dateListHide();
    monthListHide();
    yearListHide();
});

date.addEventListener('click', function(event) {
    event.stopPropagation(date);
});

function dateListShow() {
    dateList.style.display = 'block';
    dateIconUp.style.display = 'block';
    dateIconDown.style.display = 'none';
}

function dateListHide() {
    dateList.style.display = 'none';
    dateIconUp.style.display = 'none';
    dateIconDown.style.display = 'block';
}

function dateSelected() {
    for (var dateItem of dateItems) {
        dateItem.addEventListener('click', function() {
            dateTitle.innerHTML = this.innerHTML;
        });
    }
}

dateDiv.addEventListener('click', function() {
    monthListHide();
    yearListHide();
    if (dateList.style.display == 'none') {
        dateListShow();
        dateSelected();
    } else {
        dateListHide();
    }
});


const monthDiv = document.querySelector('.js-month');
const monthTitle = document.querySelector('.js-month-title');
const monthList = document.querySelector('.js-month-list');
const monthItems = document.querySelectorAll('.js-month-item');
const monthIconUp = document.querySelector('.js-month-icon-up');
const monthIconDown = document.querySelector('.js-month-icon-down');

function monthListShow() {
    monthList.style.display = 'block';
    monthIconUp.style.display = 'block';
    monthIconDown.style.display = 'none';
}

function monthListHide() {
    monthList.style.display = 'none';
    monthIconUp.style.display = 'none';
    monthIconDown.style.display = 'block';
}

function monthSelected() {
    for (var monthItem of monthItems) {
        monthItem.addEventListener('click', function() {
            monthTitle.innerHTML = this.innerHTML;
        });
    }
}

monthDiv.addEventListener('click', function() {
    dateListHide();
    yearListHide();
    if (monthList.style.display == 'none') {
        monthListShow();
        monthSelected();
    } else {
        monthListHide();
    }
});


const yearDiv = document.querySelector('.js-year');
const yearTitle = document.querySelector('.js-year-title');
const yearList = document.querySelector('.js-year-list');
const yearItems = document.querySelectorAll('.js-year-item');
const yearIconUp = document.querySelector('.js-year-icon-up');
const yearIconDown = document.querySelector('.js-year-icon-down');

function yearListShow() {
    yearList.style.display = 'block';
    yearIconUp.style.display = 'block';
    yearIconDown.style.display = 'none';
}

function yearListHide() {
    yearList.style.display = 'none';
    yearIconUp.style.display = 'none';
    yearIconDown.style.display = 'block';
}

function yearSelected() {
    for (var yearItem of yearItems) {
        yearItem.addEventListener('click', function() {
            yearTitle.innerHTML = this.innerHTML;
        });
    }
}

yearDiv.addEventListener('click', function() {
    dateListHide();
    monthListHide();
    if (yearList.style.display == 'none') {
        yearListShow();
        yearSelected();
    } else {
        yearListHide();
    }
});
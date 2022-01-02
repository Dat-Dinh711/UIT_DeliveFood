// Slideshow
var counter = 1;
setInterval(function() {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > 4)
        counter = 1;
}, 5000);

// Slider for Recipe
const sliderProducts = document.querySelector('.container__recipe-products');
const sliderItems = document.querySelectorAll('.container__recipe-item');
const nextBtn = document.querySelector('.container__recipe-arrow-right');
const prevBtn = document.querySelector('.container__recipe-arrow-left');

const sliderLength = sliderItems.length;
let positionX = 0;
let index = 0;

window.addEventListener('load', function() {
    prevBtn.style = 'display: none';
});

nextBtn.addEventListener('click', function() {
    handleChangeSlide(1);
});

prevBtn.addEventListener('click', function() {
    handleChangeSlide(-1);
});

function handleChangeSlide(direction) {
    if (direction == 1) {
        index++;
        if (index > (sliderLength / 3) - 1) {
            return;
        }

        if (index >= (sliderLength / 3) - 1) {
            nextBtn.style = 'display: none';
        }

        if (index > 0) {
            prevBtn.style = 'display: flex';
        }

        positionX = positionX - 1200;
        sliderProducts.style = 'transform: translateX(' + positionX + 'px)';
    } else if (direction == -1) {
        index--;
        if (index < 0) {
            return;
        }
        if (index == 0) {
            prevBtn.style = 'display: none';
        }

        if (index < (sliderLength / 3) - 1) {
            nextBtn.style = 'display: flex';
        }

        positionX = positionX + 1200;
        sliderProducts.style = 'transform: translateX(' + positionX + 'px)';
    }
}

if (sliderLength <= 3) {
    nextBtn.style = 'display: none';
}
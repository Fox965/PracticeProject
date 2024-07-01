document.querySelector(`#user-button`).addEventListener(`click`, () => {
    document.querySelector(`#hidden-user`).classList.toggle(`hidden`);
})

// SLIDER
const slides = document.querySelectorAll(`.slide`);
let count = 5;
let position = 0;
document.querySelector(`#prev`).addEventListener(`click`, () => {
    if (position) {
        document.querySelector(`#slider-body`).style.transform = `translateX(${position += 280}px)`;
        --count;
    }
})

document.querySelector(`#next`).addEventListener(`click`, () => {
    if (count !== slides.length - 1) {
        document.querySelector(`#slider-body`).style.transform = `translateX(${position -= 280}px)`
        ++count;
    }
})
// END_SLIDER

// ANIMATION_MAIN_PAGE
let moving = 0
function handleScroll() {
    const messages = document.querySelectorAll('.message');

    messages.forEach((message, index) => {
        const rectMessage = message.getBoundingClientRect();
        const isVisibleMessage = rectMessage.top < window.innerHeight && rectMessage.bottom >= 0;

        if (isVisibleMessage && !message.classList.contains('visible')) {
            setTimeout(() => {
                message.classList.add('visible');
            }, index * 700);
        }
    });

    const moveableElements = document.querySelectorAll('.back-image');
    moveableElements.forEach(element => {
        const startTop = parseInt(element.getAttribute('data-start-top'));
        const startRight = parseInt(element.getAttribute('data-start-right'));
        const startLeft = parseInt(element.getAttribute('data-start-left'));

        const rectBackImage = element.getBoundingClientRect();
        const isVisibleBackImage = rectBackImage.top < window.innerHeight && rectBackImage.bottom >= 0;

        if (isVisibleBackImage) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const newTop = startTop + scrollTop * 0.5; // Изменяйте множитель для скорости движения
            const newRight = startRight - scrollTop * 0.3; // Изменяйте множитель для скорости движения
            const newLeft = startLeft - scrollTop * 0.3; // Изменяйте множитель для скорости движения

            if (startTop !== undefined) {
                element.style.top = `${newTop}px`;
            }
            if (startRight !== undefined) {
                element.style.right = `${newRight}px`;
            }
            if (startLeft !== undefined) {
                element.style.left = `${newLeft}px`;
            }
        }

    });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);
// END_ANIMATION_MAIN_PAGE
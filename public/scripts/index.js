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

let enterForm = document.querySelector(`#enterForm`);
let regForm = document.querySelector(`#regForm`);
let enterButton = document.querySelector(`#enterButton`);
let regButton = document.querySelector(`#regButton`);

let titleNode = document.querySelector(`#title`);

let showPass = document.querySelector(`#showPass`);
let passField = document.querySelector(`#passField`);

let showRegPass = document.querySelector(`#showRegPass`);
let passRegField = document.querySelector(`#passRegField`);
let passRegRepeatField = document.querySelector(`#passRegRepeatField`);

regButton.addEventListener(`click`, ()=>{
    enterForm.classList.add(`hidden`);
    regForm.classList.remove(`hidden`);

    titleNode.innerHTML = `Регистрация`;
})

enterButton.addEventListener(`click`, ()=>{
    regForm.classList.add(`hidden`);
    enterForm.classList.remove(`hidden`);

    titleNode.innerHTML = `Авторизация`;
})

showPass.addEventListener(`click`, (e)=>{
    if (showPass.classList.contains(`bg-[url('/assets/auth/eye-close.png')]`)){
        showPass.classList.remove(`bg-[url('/assets/auth/eye-close.png')]`);
        showPass.classList.add(`bg-[url('/assets/auth/eye-open.png')]`);
        passField.setAttribute('type', 'text');
    }
    else{
        showPass.classList.remove(`bg-[url('/assets/auth/eye-open.png')]`);
        showPass.classList.add(`bg-[url('/assets/auth/eye-close.png')]`);
        passField.setAttribute('type', 'password');
    }
})

showRegPass.addEventListener(`click`, (e)=>{
    if (showRegPass.classList.contains(`bg-[url('/assets/auth/eye-close.png')]`)){
        showRegPass.classList.remove(`bg-[url('/assets/auth/eye-close.png')]`);
        showRegPass.classList.add(`bg-[url('/assets/auth/eye-open.png')]`);
        passRegField.setAttribute('type', 'text');
        passRegRepeatField.setAttribute('type', 'text');
    }
    else{
        showRegPass.classList.remove(`bg-[url('/assets/auth/eye-open.png')]`);
        showRegPass.classList.add(`bg-[url('/assets/auth/eye-close.png')]`);
        passRegField.setAttribute('type', 'password');
        passRegRepeatField.setAttribute('type', 'password');
    }
})






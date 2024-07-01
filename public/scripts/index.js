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






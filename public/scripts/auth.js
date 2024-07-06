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

let enterSystem = document.querySelector(`#enterSystem`);
let regSystem = document.querySelector(`#regSystem`);

enterSystem.addEventListener(`click`, ()=>{
    alert(`НЕВЕРНЫЙ ЛОГИН ИЛИ ПАРОЛЬ!`);
})

regSystem.addEventListener(`click`, ()=>{
    enterForm.classList.add(`hidden`);
    regForm.classList.remove(`hidden`);
    titleNode.innerHTML = `Регистрация`;
})

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
    if (showPass.classList.contains(`lg:bg-[url('/assets/auth/eye-close.png')]`)){
        showPass.classList.remove(`lg:bg-[url('/assets/auth/eye-close.png')]`);
        showPass.classList.remove(`bg-[url('/assets/auth/eye-close-18.png')]`);

        showPass.classList.add(`lg:bg-[url('/assets/auth/eye-open.png')]`);
        showPass.classList.add(`bg-[url('/assets/auth/eye-open-18.png')]`);

        passField.setAttribute('type', 'text');
    }
    else{
        showPass.classList.remove(`lg:bg-[url('/assets/auth/eye-open.png')]`);
        showPass.classList.remove(`bg-[url('/assets/auth/eye-open-18.png')]`);
        showPass.classList.add(`lg:bg-[url('/assets/auth/eye-close.png')]`);
        showPass.classList.add(`bg-[url('/assets/auth/eye-close-18.png')]`);

        passField.setAttribute('type', 'password');
    }
})

showRegPass.addEventListener(`click`, (e)=>{
    if (showRegPass.classList.contains(`lg:bg-[url('/assets/auth/eye-close.png')]`)){
        showRegPass.classList.remove(`lg:bg-[url('/assets/auth/eye-close.png')]`);
        showRegPass.classList.remove(`bg-[url('/assets/auth/eye-close-18.png')]`);

        showRegPass.classList.add(`lg:bg-[url('/assets/auth/eye-open.png')]`);
        showRegPass.classList.add(`bg-[url('/assets/auth/eye-open-18.png')]`);

        passRegField.setAttribute('type', 'text');
        passRegRepeatField.setAttribute('type', 'text');
    }
    else{
        showRegPass.classList.remove(`lg:bg-[url('/assets/auth/eye-open.png')]`);
        showRegPass.classList.remove(`bg-[url('/assets/auth/eye-open-18.png')]`);

        showRegPass.classList.add(`lg:bg-[url('/assets/auth/eye-close.png')]`);
        showRegPass.classList.add(`bg-[url('/assets/auth/eye-close-18.png')]`);

        passRegField.setAttribute('type', 'password');
        passRegRepeatField.setAttribute('type', 'password');
    }
})
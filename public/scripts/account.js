let editAccount = document.querySelector(`#editAccount`);

let buttons = document.querySelector(`.buttons`);
let confirm = document.querySelector(`#confirm`);
let cancel = document.querySelector(`#cancel`);

let logCont = document.querySelector(`#logCont`);
let passCont = document.querySelector(`#passCont`);

let logField = document.querySelector(`#logField`);
let passField = document.querySelector(`#passField`);

editAccount.addEventListener(`click`, ()=>{
    buttons.classList.remove(`opacity-0`);
    logCont.classList.remove(`opacity-0`);
    passCont.classList.remove(`opacity-0`);
})

confirm.addEventListener(`click`, ()=>{
    buttons.classList.add(`opacity-0`);
    logCont.classList.add(`opacity-0`);
    passCont.classList.add(`opacity-0`);

    logField.value = '';
    passField.value = '';
})

cancel.addEventListener(`click`, ()=>{
    buttons.classList.add(`opacity-0`);
    logCont.classList.add(`opacity-0`);
    passCont.classList.add(`opacity-0`);

    logField.value = '';
    passField.value = '';
})


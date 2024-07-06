let editAccount = document.querySelector(`#editAccount`);

let buttons = document.querySelector(`.buttons`);
let confirm = document.querySelector(`#confirm`);
let cancel = document.querySelector(`#cancel`);

let logCont = document.querySelector(`#logCont`);
let passCont = document.querySelector(`#passCont`);

let logField = document.querySelector(`#logField`);
let passField = document.querySelector(`#passField`);

editAccount.addEventListener(`click`, ()=>{
    buttons.classList.remove(`hidden`);
    logField.removeAttribute("readonly");
    passField.removeAttribute("readonly");

    logCont.classList.remove(`opacity-0`);
    passCont.classList.remove(`opacity-0`);
    logField.classList.remove(`cursor-default`);
    passField.classList.remove(`cursor-default`);
    logField.classList.add(`cursor-text`);
    passField.classList.add(`cursor-text`);

})

confirm.addEventListener(`click`, ()=>{
    buttons.classList.add(`hidden`);
    logField.setAttribute("readonly", "readonly");
    passField.setAttribute("readonly", "readonly");

    logCont.classList.add(`opacity-0`);
    passCont.classList.add(`opacity-0`);
    logField.classList.add(`cursor-default`);
    passField.classList.add(`cursor-default`);
    logField.classList.remove(`cursor-text`);
    passField.classList.remove(`cursor-text`);
})

cancel.addEventListener(`click`, ()=>{
    buttons.classList.add(`hidden`);
    logField.setAttribute("readonly", "readonly");
    passField.setAttribute("readonly", "readonly");

    logCont.classList.add(`opacity-0`);
    passCont.classList.add(`opacity-0`);
    logField.classList.add(`cursor-default`);
    passField.classList.add(`cursor-default`);
    logField.classList.remove(`cursor-text`);
    passField.classList.remove(`cursor-text`);

    logField.value = '';
    passField.value = '';
})

document.querySelector('#imageInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const previewImage = document.querySelector('#avatarImage');
    const prevSrc = previewImage.getAttribute('data-prev-src');

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            previewImage.setAttribute('data-prev-src', e.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.src = prevSrc;
    }
});


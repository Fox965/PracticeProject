const userButton = document.querySelector(`#user-button`);
const hiddenUser = document.querySelector(`#hidden-user`);

userButton.addEventListener(`click`, () => {
    hiddenUser.classList.toggle(`hidden`);
})

document.addEventListener(`click`, (e) => {
    if (
        !hiddenUser.classList.contains(`hidden`) &&
        !hiddenUser.contains(e.target) &&
        !userButton.contains(e.target)
    ) {
        hiddenUser.classList.add(`hidden`);
    }
})

const burger = document.querySelector(`#burger`);
const mobileMenu = document.querySelector(`#mobile-menu`);

burger.addEventListener(`click`, () => {
    mobileMenu.classList.toggle(`translate-x-0`);
    mobileMenu.classList.toggle(`translate-x-full`);
    document.querySelector(`#bar-1`).classList.toggle(`translate-y-3.5`);
    document.querySelector(`#bar-1`).classList.toggle(`rotate-45`)
    document.querySelector(`#bar-2`).classList.toggle(`opacity-0`);
    document.querySelector(`#bar-3`).classList.toggle(`-translate-y-1.5`);
    document.querySelector(`#bar-3`).classList.toggle(`-rotate-45`)
})

document.addEventListener(`click`, (e) => {
    if (
        mobileMenu.classList.contains(`translate-x-0`) &&
        !mobileMenu.contains(e.target) &&
        !burger.contains(e.target)
    ) {
        mobileMenu.classList.remove(`translate-x-0`);
        mobileMenu.classList.add(`translate-x-full`);
        document.querySelector(`#bar-1`).classList.remove(`translate-y-3.5`);
        document.querySelector(`#bar-1`).classList.remove(`rotate-45`)
        document.querySelector(`#bar-2`).classList.remove(`opacity-0`);
        document.querySelector(`#bar-3`).classList.remove(`-translate-y-1.5`);
        document.querySelector(`#bar-3`).classList.remove(`-rotate-45`)
    }
})
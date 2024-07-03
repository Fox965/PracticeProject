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
const hiddenUser = document.querySelector(`#user-button`);

hiddenUser.addEventListener(`click`, () => {
    document.querySelector(`#hidden-user`).classList.toggle(`hidden`)
})
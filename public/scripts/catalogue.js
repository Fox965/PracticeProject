document.addEventListener(`DOMContentLoaded`, () => {
    //ВСПЛЫВАЮЩЕЕ ОКНО
    const dropdownContent = document.querySelector(`#dropdown-content`);
    const dropbtn = document.querySelector(`#dropbtn`);
    const valueDropbtn = document.querySelector(`#value-dropbtn`);

    dropbtn.addEventListener(`click`, () => {
        dropdownContent.classList.toggle(`hidden`);
    })

    document.addEventListener(`click`, (e) => {
        if (
            !dropdownContent.classList.contains(`hidden`) &&
            !dropdownContent.contains(e.target) &&
            !dropbtn.contains(e.target)
        ) {
            dropdownContent.classList.add(`hidden`);
        }
    })

    let tempDataValue = '';
    document.querySelector(`#dropdown-content`).addEventListener(`click`, (event) => {
        const genre = event.target.getAttribute(`data-value`);
        if (event.target.tagName === `BUTTON` && genre !== tempDataValue) {
            tempDataValue = genre
            valueDropbtn.textContent = genre;

            fetch(`/select-genre`, {
                method: `POST`,
                headers: {
                    'Content-Type': `application/json`
                },
                body: JSON.stringify({ genre: genre })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                })
                .catch((error) => {
                    console.error(`Error:`, error);
                });
        }

        dropdownContent.classList.toggle(`hidden`);
    });

    // ПОИСК
    document.querySelector(`#search-form`).addEventListener(`submit`, (e) => {
        e.preventDefault();

        fetch(`/search`, {
            method: `POST`,
            headers: {
                'Content-Type': `application/json`
            },
            body: JSON.stringify({valueForm: document.querySelector(`#input-search`).value })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
            })
            .catch((error) => {
                console.error(`Error:`, error);
            });
    })
});

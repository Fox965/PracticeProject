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
    body: JSON.stringify({ valueForm: document.querySelector(`#input-search`).value })
    })
    .then(response => response.json())
    .then(data => {
    if (data.success) {
    // Очищаем предыдущие результаты
    const resultsContainer = document.querySelector(`#piska`);
    resultsContainer.innerHTML = '';
    
    // Добавляем новые результаты
    data.data.forEach(book => {
    const bookElement = document.createElement(`a`);
    bookElement.href = `/book?id=${book.book_id}`; // Предполагается, что у книги есть поле id
    bookElement.className = `block max-w-60 w-full mx-auto`;
    
    const imgContainer = document.createElement(`div`);
    imgContainer.className = `max-w-60 w-full`;
    
    const imgElement = document.createElement(`img`);
    imgElement.src = book.book_image; // Предполагается, что у книги есть поле image
    imgElement.alt = book.book_name;
    imgElement.className = `w-full`;
    
    imgContainer.appendChild(imgElement);
    
    const textContainer = document.createElement(`div`);
    textContainer.className = `mt-2 text-center`;
    
    const titleElement = document.createElement(`h4`);
    titleElement.textContent = book.book_name;
    titleElement.className = `text-white text-lg font-black`;
    
    const priceElement = document.createElement(`span`);
    priceElement.textContent = `$${book.book_price}`; // Предполагается, что у книги есть поле price
    priceElement.className = `text-white text-lg mt-2`;
    
    textContainer.appendChild(titleElement);
    textContainer.appendChild(priceElement);
    
    bookElement.appendChild(imgContainer);
    bookElement.appendChild(textContainer);
    
    resultsContainer.appendChild(bookElement);
    });
    } else {
    console.log(data.message);
    }
    })
    .catch((error) => {
    console.error(`Error:`, error);
    });
    });
})
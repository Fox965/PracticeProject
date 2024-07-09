const applicationBtn = document.querySelector('#application-btn');
const applicationForm = document.querySelector('#application-form');
const darkening = document.querySelector('#darkening');
const blurOverlay = document.querySelector('#blur');
const closeBtn = document.querySelector('#close-btn');

const toggleFormVisibility = () => {
    applicationForm.classList.toggle(`hidden`);
    applicationForm.classList.toggle(`card-predlozhka`);
    darkening.classList.toggle(`hidden`);
    blurOverlay.classList.toggle(`blur`);
    document.body.classList.toggle(`overflow-hidden`);
};

applicationBtn.addEventListener('click', () => {
    const windowHeight = window.scrollY;
    const windowWidth = document.body.clientWidth;
    if (windowWidth < 375) {
        applicationForm.style.left = '10%';
    }
    toggleFormVisibility();
});

document.addEventListener('click', (e) => {
    if (!applicationForm.classList.contains('hidden') && !applicationForm.contains(e.target) && !applicationBtn.contains(e.target)) {
        toggleFormVisibility();
    }
});

closeBtn.addEventListener('click', toggleFormVisibility);

document.querySelector('#imageInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const previewImage = document.querySelector('#previewImage');
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
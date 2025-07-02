const burgerMenu = document.querySelector('.burgers-menu');
const mobileMenu = document.querySelector('.mobiles-menu');
const body = document.body;

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('open');
    mobileMenu.classList.toggle('open');


    body.classList.toggle('no-scroll');
});

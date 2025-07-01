const burgerMenu = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.mobile-menu');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  if (burgerMenu.classList.contains('active')) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
});

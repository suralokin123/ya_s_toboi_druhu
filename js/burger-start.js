const burgerMenu = document.querySelector('.burgers-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;
let scrollPosition = 0;
const mobileLinks = document.querySelectorAll('.mobile-menu a');

burgerMenu.addEventListener('click', () => {
  const isMenuOpen = mobileMenu.style.display === 'flex';

  if (isMenuOpen) {
    mobileMenu.style.display = 'none';
    body.style.position = 'static';
    body.style.top = 'auto';
    window.scrollTo(0, scrollPosition);
    burgerMenu.classList.remove('active'); // Удаляем класс
  } else {
    scrollPosition = window.pageYOffset;
    mobileMenu.style.display = 'flex';
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
    burgerMenu.classList.add('active'); // Добавляем класс
  }
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.style.display = 'none';
      body.style.position = 'static';
      body.style.top = 'auto';
      window.scrollTo(0, scrollPosition);
      burgerMenu.classList.remove('active');
    });
  });
  
});

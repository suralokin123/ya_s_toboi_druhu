document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slider-img');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');

    let currentIndex = 0;
    const slideWidth = slides[0].clientWidth; // Ширина одного слайда
    let isAnimating = false; // Флаг для предотвращения быстрых кликов

    // Клонируем первый и последний слайды для создания эффекта зацикливания
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    // Добавляем клоны в начало и конец обертки
    sliderWrapper.appendChild(firstClone);
    sliderWrapper.insertBefore(lastClone, slides[0]);

    // Обновляем массив слайдов после добавления клонов
    const allSlides = document.querySelectorAll('.slider-img');
    const totalSlides = allSlides.length; // Общее количество слайдов (включая клоны)

    // Устанавливаем начальное положение обертки, чтобы показать первый реальный слайд
    sliderWrapper.style.transform = `translateX(${-slideWidth}px)`; // Смещаем на один слайд влево, чтобы скрыть первый клон

    // Функция для перемещения слайдера
    function moveSlider(newIndex) {
        if (isAnimating) return; // Предотвращаем одновременные анимации
        isAnimating = true;

        sliderWrapper.style.transition = 'transform 0.5s ease'; // Включаем плавную анимацию
        sliderWrapper.style.transform = `translateX(${-slideWidth * newIndex}px)`;

        // Когда доходим до клонов, мгновенно переключаемся на реальные слайды
        setTimeout(() => {
            if (newIndex === 0) { // Переход с последнего слайда на первый
                sliderWrapper.style.transition = 'none'; // Отключаем анимацию
                currentIndex = totalSlides - 2; // Переключаемся на предпоследний слайд (реальный последний)
                sliderWrapper.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
            } else if (newIndex === totalSlides - 1) { // Переход с первого слайда на последний
                sliderWrapper.style.transition = 'none'; // Отключаем анимацию
                currentIndex = 1; // Переключаемся на второй слайд (реальный первый)
                sliderWrapper.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
            }
            isAnimating = false;
        }, 500); // Задержка должна соответствовать времени анимации
    }

    // Обработчики событий для кнопок
    nextButton.addEventListener('click', () => {
        currentIndex++;
        moveSlider(currentIndex);
    });

    prevButton.addEventListener('click', () => {
        currentIndex--;
        moveSlider(currentIndex);
    });

    // Автоматическая прокрутка (опционально)
    let intervalId;
    function startAutoScroll() {
        intervalId = setInterval(() => {
            currentIndex++;
            moveSlider(currentIndex);
        }, 3000); // Меняйте интервал по желанию (в миллисекундах)
    }

    function stopAutoScroll() {
        clearInterval(intervalId);
    }

    // Запускаем автоматическую прокрутку (если нужно)
     startAutoScroll();

    // Останавливаем автоматическую прокрутку при наведении мыши (опционально)
    slider.addEventListener('mouseenter', stopAutoScroll);
    slider.addEventListener('mouseleave', startAutoScroll);

    // Обработчик изменения размера окна (важно для адаптивности)
    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].clientWidth;
        sliderWrapper.style.transition = 'none';
        slideWidth = newSlideWidth;
        sliderWrapper.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
    });
});

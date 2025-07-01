const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResultsContainer = document.getElementById('search-results');
const searchResultItems = document.querySelectorAll('.search-poisk > article');

// Функция для скрытия всех результатов
function hideAllResults() {
    searchResultItems.forEach(item => {
        item.style.display = 'none';
    });
    searchResultsContainer.style.display = 'none'; // Скрываем контейнер
}

// Изначально скрываем все результаты
hideAllResults();

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    let resultsFound = false;

    // Сначала скрываем все результаты
    hideAllResults();

    // Если поисковый запрос пустой, показываем сообщение "Мероприятие не найдено"
    if (searchTerm === '') {
        alert("Мероприятие не найдено");
        return; // Выходим из функции, чтобы не выполнять поиск
    }

    // Если поисковый запрос "ближайшие мероприятия", показываем все результаты
    if (searchTerm.includes('ближайшие мероприятия')) {
        searchResultItems.forEach(item => {
            item.style.display = 'block';
        });
        searchResultsContainer.style.display = 'grid';
        resultsFound = true;
    } else {
        // Ищем соответствия по названию мероприятия
        searchResultItems.forEach(item => {
            const eventName = item.querySelector('h4').textContent.toLowerCase();
            if (eventName.includes(searchTerm)) {
                item.style.display = 'block';
                resultsFound = true;
            }
        });
        if(resultsFound){
             searchResultsContainer.style.display = 'grid';
        }
    }

    // Если ничего не найдено, выводим сообщение
    if (!resultsFound) {
        alert("Мероприятие не найдено");
    }
});

// Добавляем кнопку "Закрыть"
const closeButton = document.createElement('button');
closeButton.innerHTML = '&times;'; // Используем HTML-код для символа "X"
closeButton.classList.add('close-buttons'); // Добавляем класс для стилизации
closeButton.addEventListener('click', hideAllResults);
searchResultsContainer.style.position = 'relative'; // Добавляем позиционирование для контейнера
searchResultsContainer.appendChild(closeButton);

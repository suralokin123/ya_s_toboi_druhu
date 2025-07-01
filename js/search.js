const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const masterClass = document.querySelector('.search-pisk');
const oldEstate = document.querySelector('.search-pisk2');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();

    // Скрываем все результаты поиска
    masterClass.style.display = 'none';
    oldEstate.style.display = 'none';
    searchResults.style.display = 'none'; // Скрываем контейнер результатов

    if (searchTerm.includes('ближайшие мероприятия')) {
        // Показываем все результаты
        masterClass.style.display = 'block';
        oldEstate.style.display = 'block';
        searchResults.style.display = 'block'; // Показываем контейнер результатов
    } else if (searchTerm.includes('Парк-музей-Царицыно')) {
        // Показываем только "Мастерская росписи"
        masterClass.style.display = 'block';
        searchResults.style.display = 'block'; // Показываем контейнер результатов
    } else if (searchTerm.includes('старинная усадьба')) {
        // Показываем только "Старинная усадьба"
        oldEstate.style.display = 'block';
        searchResults.style.display = 'block'; // Показываем контейнер результатов
    } else {
        alert("Мероприятие не найдено");
    }
});


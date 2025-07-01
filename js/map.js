let map;
let markers = [];
let autocomplete;

function initMap() {
    return new Promise((resolve, reject) => { // Оборачиваем в Promise
        const mapDiv = document.getElementById("googleMap");

        map = new google.maps.Map(mapDiv, {
            center: {lat: 55.75, lng: 37.61}, // Москва, пример координат
            zoom: 12,
        });

        // Инициализация Autocomplete
        const input = document.getElementById("search-input1");
        autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo("bounds", map);
        autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                console.warn("Место не найдено: '" + place.name + "'");
                alert("Место '" + place.name + "' не найдено.");
                return;
            }
            goToPlace(place);
        });

        // Обработчик нажатия на кнопку "Искать"
        const searchButton = document.getElementById("search-button1");
        searchButton.addEventListener("click", performSearch);

        // Функция для выполнения поиска по тексту
        function performSearch() {
            const searchTerm = input.value;

            if (!searchTerm) {
                alert("Пожалуйста, введите адрес или название места для поиска.");
                return;
            }

            const service = new google.maps.places.PlacesService(map);
            service.findPlaceFromQuery(
                {
                    query: searchTerm,
                    fields: ['name', 'geometry'],
                },
                (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                        goToPlace(results[0]);
                    } else {
                        console.error("Поиск не удался: " + status);
                        alert("К сожалению, ничего не найдено.");
                    }
                }
            );
        }

        // Функция для перемещения карты и добавления маркера
        function goToPlace(place) {
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
            clearMarkers();
            addMarker(place.geometry.location, place.name);
        }

        // После инициализации карты вызываем resolve()
        resolve();
    });
}


// Функция для добавления маркеров для заданных мест
function addInitialMarkers() {
    const places = [
      { address: "ул. Шаболовка, 19А, Москва", title: "Детский сад № 2204" },
      { address: "ул. Летниковская, 11/10, Москва, 155114", title: "Мастерская росписи" }
    ];
  
    const geocoder = new google.maps.Geocoder();
  
    places.forEach(placeData => {
      geocoder.geocode({ 'address': placeData.address }, (results, status) => {
        if (status === 'OK') {
          addMarker(results[0].geometry.location, placeData.title);
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
        }
      });
    });
  }
  


// Функция для добавления маркера на карту
function addMarker(location, title) {
    const marker = new google.maps.Marker({
        map: map,
        position: location,
        title: title
    });
    markers.push(marker);
}


// Функция для очистки маркеров с карты
function clearMarkers() {
    markers.forEach(marker => {
        marker.setMap(null);
    });
    markers = [];
}

// Инициализация карты при загрузке страницы
function initialize() {
    initMap()
        .then(() => { // Вызываем addInitialMarkers только после resolve
            addInitialMarkers();
        })
        .catch((error) => {
            console.error("Ошибка инициализации карты:", error);
        });
}

// Дождитесь загрузки документа и вызовите initialize
document.addEventListener("DOMContentLoaded", initialize);
const API_KEY = "1e2cb50fff6384cf25692efcdb9ece14";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const weatherCard = document.querySelector(".weather-card");
const loading = document.querySelector(".loading");
const errorCard = document.querySelector(".error-card");

// Элементы вывода погоды
const cityName = document.querySelector(".city-name");
const temperature = document.querySelector(".temperature");
const feelsLikeTemp = document.querySelector(".feels-like-temp");
const weatherDescription = document.querySelector(".weather-description");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");

// Слушатель событий
searchBtn.addEventListener("click", getWeather);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather();
});

async function getWeather() {
  const city = searchInput.value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  // Обновляем интерфейс перед вызовом API
  searchBtn.disabled = true;
  weatherCard.style.display = "none";
  errorCard.style.display = "none";
  loading.style.display = "block";

  try {
    const response = await axios.get(API_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    displayWeather(response.data);
  } catch (err) {
    showError();
  } finally {
    searchBtn.disabled = false;
  }
}

 function displayWeather(data) {
   // Извлекаем данные из response
   const {
     name: city,
     main: { temp, feels_like, humidity: hum },
     weather,
     wind: { speed },
   } = data;

   const description = weather[0].description;
   const iconCode = weather[0].icon;
   const country = data.sys.country;

   // Обновляем DOM элементы
   cityName.textContent = `${city}, ${country}`;
   temperature.textContent = `${Math.round(temp)}°`;
   feelsLikeTemp.textContent = `${Math.round(feels_like)}°`;
   weatherDescription.textContent = description;
   humidity.textContent = `${hum}%`;
   wind.textContent = `${speed.toFixed(1)} m/s`;

   // Устанавливаем иконки
   weatherIcon.src = `http://openweathermap.org/img/w/${iconCode}.png`;
   weatherIcon.alt = description;

   // Показываем карточку погоды
   loading.style.display = "none";
   weatherCard.style.display = "block";
 }

 function showError() {
   loading.style.display = "none";
   errorCard.style.display = "block";
 }

 // Инициализируем с городом по умолчанию
 window.addEventListener("DOMContentLoaded", () => {
   searchInput.value = "London";
   getWeather();
 });
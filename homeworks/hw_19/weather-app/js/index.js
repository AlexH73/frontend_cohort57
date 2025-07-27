const cityEl = document.getElementById("city");
const temperature = document.getElementById("temperature");
const gusts = document.getElementById("gusts");
const wind = document.getElementById("wind");
const coordinatesEl = document.getElementById("coordinates");
const windDirectionEl = document.getElementById("wind-direction");
const weatherDescriptionEl = document.getElementById("weather-description");
const windArrowEl = document.getElementById("wind-arrow");
const weatherBg = document.getElementById("weather-bg");
const weatherCart = document.querySelector(".container");
const maxTempEl = document.getElementById("max-temp");
const minTempEl = document.getElementById("min-temp");
const hourlyContainer = document.getElementById("hourly-container");
const dailyContainer = document.getElementById("daily-container");
// Переменные для модального окна
const modal = document.getElementById("daily-detail-modal");
const modalTitle = document.getElementById("modal-title");
const modalWeatherIcon = document.getElementById("modal-weather-icon");
const modalWeatherDesc = document.getElementById("modal-weather-description");
const modalTempMax = document.getElementById("modal-temp-max");
const modalTempMin = document.getElementById("modal-temp-min");
const modalPrecipProb = document.getElementById("modal-precip-prob");
const modalPrecipSum = document.getElementById("modal-precip-sum");
const closeModal = document.querySelector(".close");

async function fetchWeather() {
  try {
    // Запрос локации
    const { data } = await axios.get(
      "https://api.bigdatacloud.net/data/reverse-geocode-client"
    );
    const { city, locality, principalSubdivision, latitude, longitude } = data;

    // Форматируем локацию
    let locationName = city || locality;
    if (principalSubdivision) {
      locationName += `, ${principalSubdivision}`;
    }

    cityEl.textContent = locationName;
    // я нашел как управлять округлением 😀😊😉
    coordinatesEl.textContent = `${latitude.toFixed(4)}, ${longitude.toFixed(
      4
    )}`;

    // Запрос погоды по локации
    const { data: weatherInfo } = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code&timezone=auto&forecast_days=12`
    );

    const { current_units, current, daily, hourly } = weatherInfo;
    let {
      temperature_2m,
      wind_gusts_10m,
      wind_speed_10m,
      wind_direction_10m,
      weather_code,
    } = current;

    const {
      temperature_2m: tempUnit,
      wind_gusts_10m: gustsUnit,
      wind_speed_10m: speedUnit,
    } = current_units;

    const maxTemp = daily.temperature_2m_max[0]; // Максимальная температура сегодня
    const minTemp = daily.temperature_2m_min[0]; // Минимальная температура сегодня

    // Обновляем вывод
    temperature.textContent = `${Math.round(temperature_2m)}${tempUnit}`;
    gusts.textContent = `${Math.round(wind_gusts_10m)}${gustsUnit}`;
    wind.textContent = `${Math.round(wind_speed_10m)}${speedUnit}`;
    windDirectionEl.textContent = getWindDirection(wind_direction_10m);
    weatherDescriptionEl.textContent = interpretWeatherCode(weather_code);
    weatherDescriptionEl.innerHTML = `
    ${interpretWeatherCode(weather_code)}
    <div class="weather-icon">${getWeatherIcon(weather_code)}</div>`;

    // Анимация стрелки
    if (wind_speed_10m > 15) {
      windArrowEl.classList.add("animated");
    } else {
      windArrowEl.classList.remove("animated");
    }
    updateWeatherClasses(weather_code);
    maxTempEl.textContent = `H: ${Math.round(maxTemp)}°`;
    minTempEl.textContent = `T: ${Math.round(minTemp)}°`;
    renderHourlyForecast(hourly);
    renderDailyForecast(weatherInfo.daily);
  } catch (error) {
    console.error("Fehler beim Abrufen der Wetterdaten:", error);
    cityEl.textContent = "Standort nicht verfügbar";
    temperature.textContent = "-- °C";
    weatherDescriptionEl.textContent = "Daten nicht verfügbar";

    // Скрываем блоки, которые не можем заполнить
    hourlyContainer.innerHTML = "";
    dailyContainer.innerHTML = "";
    document.querySelector(".hourly-forecast").style.display = "none";
    document.querySelector(".daily-forecast").style.display = "none";
  }
}

// Функция прогноза на 24 часа
function renderHourlyForecast(hourlyData) {
  if (!hourlyData || !hourlyData.temperature_2m) return;
  hourlyContainer.innerHTML = "";

  const now = new Date();
  const currentHour = now.getHours();

  // Берем прогноз на 24 часа, начиная с текущего часа
  for (let i = currentHour; i < currentHour + 24; i++) {
    const temp = hourlyData.temperature_2m[i];
    const weatherCode = hourlyData.weather_code[i];
    const time = new Date(hourlyData.time[i]);
    const precipitation = hourlyData.precipitation_probability[i] || 0;

    const hourItem = document.createElement("div");
    hourItem.className = "hourly-item";

    const timeElement = document.createElement("div");
    timeElement.className = "hourly-time";
    timeElement.textContent = getFormattedDate(time, "hour", i === currentHour);

    const iconElement = document.createElement("div");
    iconElement.className = "hourly-icon";
    iconElement.innerHTML = getWeatherIcon(weatherCode);

    const tempElement = document.createElement("div");
    tempElement.className = "hourly-temp";
    tempElement.textContent = `${Math.round(temp)}°`;

    const weatherElement = document.createElement("div");
    weatherElement.className = "hourly-weather";
    weatherElement.textContent = getShortWeatherDescription(weatherCode);

    hourItem.appendChild(timeElement);
    hourItem.appendChild(iconElement);

    if (precipitation > 0) {
      const precipElement = document.createElement("div");
      precipElement.className = "hourly-precip";
      precipElement.textContent = `${precipitation}mm`;
      precipElement.style.color = precipitation > 5 ? "#2980b9" : "#3498db";
      hourItem.appendChild(precipElement);
    }

    hourItem.appendChild(tempElement);
    hourItem.appendChild(weatherElement);

    hourlyContainer.appendChild(hourItem);

    if (i === currentHour) {
      hourItem.classList.add("current-hour");

      const progressBar = document.createElement("div");
      progressBar.className = "hour-progress";
      hourItem.appendChild(progressBar);
    }
  }
}

// Функция для 10-дневного прогноза
function renderDailyForecast(dailyData) {
  dailyContainer.innerHTML = "";

  // Проверка наличия данных
  if (!dailyData || !dailyData.time) {
    console.error("Keine täglichen Daten verfügbar", dailyData);
    return;
  }

  // Получаем текущую дату
  const today = new Date();

  // Проходим по всем дням (максимум 12)
  for (let i = 0; i < dailyData.time.length; i++) {
    const date = new Date(dailyData.time[i]);

    const dailyItem = document.createElement("div");
    dailyItem.className = "daily-item";

    // Форматируем дату
    const dateElement = document.createElement("div");
    dateElement.className = "daily-date";
    dateElement.textContent = getFormattedDate(date, "day", i);

    // Иконка погоды
    const iconElement = document.createElement("div");
    iconElement.className = "daily-icon";
    iconElement.innerHTML = getWeatherIcon(dailyData.weather_code[i]);

    // Температуры
    const tempContainer = document.createElement("div");
    tempContainer.className = "daily-temp";

    const maxTempElement = document.createElement("div");
    maxTempElement.className = "daily-temp-max";
    maxTempElement.textContent = `${Math.round(
      dailyData.temperature_2m_max[i]
    )}°C`;

    const minTempElement = document.createElement("div");
    minTempElement.className = "daily-temp-min";
    minTempElement.textContent = `${Math.round(
      dailyData.temperature_2m_min[i]
    )}°C`;

    tempContainer.appendChild(maxTempElement);
    tempContainer.appendChild(minTempElement);

    // Вероятность осадков
    const precipElement = document.createElement("div");
    precipElement.className = "daily-precip";
    precipElement.textContent = `${dailyData.precipitation_probability_max[i]}%`;

    const precipSum = dailyData.precipitation_sum[i];

    // Собираем элементы вместе
    dailyItem.appendChild(dateElement);
    dailyItem.appendChild(iconElement);
    dailyItem.appendChild(tempContainer);
    dailyItem.appendChild(precipElement);

    if (precipSum > 0) {
      const precipAmount = document.createElement("div");
      precipAmount.className = "daily-precip-amount";
      precipAmount.textContent = `${precipSum}mm`;
      dailyItem.appendChild(precipAmount);
    }

    dailyContainer.appendChild(dailyItem);

    dailyItem.addEventListener("click", () => {
      showDailyDetails(dailyData, i);
    });
  }
}

// Обработчик закрытия модального окна
closeModal.onclick = function () {
  modal.style.display = "none";
};

// Закрытие при клике вне окна
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Закрытие при нажатии клавиши Escape
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal.style.display = "none";
});

// Функция для получения подробного прогноза в модальном окне по клику
function showDailyDetails(dailyData, index) {
  const date = new Date(dailyData.time[index]);

  modalTitle.textContent = getFormattedDate(date, "detail", index);
  modalWeatherIcon.innerHTML = getWeatherIcon(dailyData.weather_code[index]);
  modalWeatherDesc.textContent = interpretWeatherCode(
    dailyData.weather_code[index]
  );
  modalTempMax.textContent = `${Math.round(
    dailyData.temperature_2m_max[index]
  )}°C`;
  modalTempMin.textContent = `${Math.round(
    dailyData.temperature_2m_min[index]
  )}°C`;
  modalPrecipProb.textContent = `${dailyData.precipitation_probability_max[index]}%`;
  modalPrecipSum.textContent = `${dailyData.precipitation_sum[index]} mm`;
  updateWeatherClasses(dailyData.weather_code[index]);
  modal.style.display = "block";
}

// Функция для форматирования даты
/**
 * Форматирует дату в соответствии с указанным форматом
 * @param {Date} date - Объект даты
 * @param {string} format - Тип формата ('detail', 'day', 'hour')
 * @param {boolean} [isCurrent=false] - Для формата 'hour': является ли текущим часом
 * @returns {string} Отформатированная строка с датой/временем
 */
function getFormattedDate(date, format, isCurrent = false) {
  // Проверка валидности даты
  if (!(date instanceof Date) || isNaN(date)) {
    console.error("Invalid date:", date);
    return "--";
  }

  const daysFull = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  const daysShort = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const monthNum = date.getMonth() + 1;
  const year = date.getFullYear();
  const dayOfWeek = date.getDay();
  const hour = date.getHours();

  switch (format) {
    case "detail": // Для модального окна
      return `${isCurrent === 0 ? "Heute" : isCurrent === 1 ? "Morgen" : ""}${
        isCurrent < 2 ? " - " : ""
      }${daysFull[dayOfWeek]}, ${day}. ${month} ${year}`;

    case "day": // Для карточки дня
      const today = new Date();
      const isToday = date.toDateString() === today.toDateString();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const isTomorrow = date.toDateString() === tomorrow.toDateString();

      if (isToday) return "Heute";
      if (isTomorrow) return "Morgen";
      return `${daysShort[dayOfWeek]}, ${day
        .toString()
        .padStart(2, "0")}.${monthNum.toString().padStart(2, "0")}`;

    case "hour": // Для почасового прогноза
      return isCurrent ? "Jetzt" : `${hour.toString().padStart(2, "0")}:00`;

    default:
      console.warn("Unknown date format:", format);
      return date.toLocaleDateString("de-DE");
  }
}

// Получаем определение погоды по коду
function interpretWeatherCode(code) {
  const weatherCodes = {
    0: "Klarer Himmel",
    1: "Überwiegend klar",
    2: "Teilweise bewölkt",
    3: "Bedeckt",
    45: "Nebel",
    48: "Reifnebel",
    51: "Leichter Nieselregen",
    53: "Mäßiger Nieselregen",
    55: "Starker Nieselregen",
    56: "Gefrierender Nieselregen: Leicht",
    57: "Gefrierender Nieselregen: Stark",
    61: "Leichter Regen",
    63: "Mäßiger Regen",
    65: "Starker Regen",
    66: "Gefrierender Regen: Leicht",
    67: "Gefrierender Regen: Stark",
    71: "Leichter Schneefall",
    73: "Mäßiger Schneefall",
    75: "Starker Schneefall",
    77: "Schneegriesel",
    80: "Leichte Regenschauer",
    81: "Mäßige Regenschauer",
    82: "Starke Regenschauer",
    85: "Leichte Schneeschauer",
    86: "Starke Schneeschauer",
    95: "Gewitter",
    96: "Gewitter mit leichtem Hagel",
    99: "Gewitter mit starkem Hagel",
  };

  return weatherCodes[code] || "Unbekannter Wetterkennwert";
}

// Сокращенный вариант
function getShortWeatherDescription(code) {
  const shortDescriptions = {
    0: "Klar",
    1: "Klar",
    2: "Teilw. bew.",
    3: "Bedeckt",
    45: "Nebel",
    48: "Reifnebel",
    51: "Niesel",
    53: "Niesel",
    55: "Niesel",
    56: "Niesel",
    57: "Niesel",
    61: "Regen",
    63: "Regen",
    65: "Stark Regen",
    66: "Frostregen",
    67: "Frostregen",
    71: "Schnee",
    73: "Schnee",
    75: "Stark Schnee",
    77: "Schneegriesel",
    80: "Schauer",
    81: "Schauer",
    82: "Stark Schauer",
    85: "Schneeschauer",
    86: "Stark Schneeschauer",
    95: "Gewitter",
    96: "Gewitter Hagel",
    99: "Stark Gewitter",
  };

  return shortDescriptions[code] || "--";
}

// Направление ветра
function getWindDirection(degrees) {
  // N = Nord(Север);
  // O = Ost(Восток);
  // S = Süd(Юг);
  // W = West(Запад);
  // NO = Nordost(Северо - восток);
  // SO = Südost(Юго - восток);
  // SW = Südwest(Юго - запад);
  // NW = Nordwest(Северо - запад);
  const directions = ["N", "NO", "O", "SO", "S", "SW", "W", "NW"];
  const index = Math.round((degrees % 360) / 45) % 8;
  // Поворачиваем стрелку по направлению ветра
  if (windArrowEl) {
    const arrowSvg = windArrowEl.querySelector("svg");
    arrowSvg.style.transform = `rotate(${degrees}deg)`;
  }

  return directions[index];
}

// Управление классами погоды
function updateWeatherClasses(code) {
  // Удаляем предыдущие классы
  const removeClasses = (element, prefix) => {
    const classes = Array.from(element.classList).filter((c) =>
      c.startsWith(prefix)
    );
    classes.forEach((c) => element.classList.remove(c));
  };

  // Обновляем классы для карточки
  removeClasses(weatherCart, "weather-bg-");
  weatherCart.classList.add(`weather-bg-${code}`);

  // Обновляем классы для фона
  removeClasses(weatherBg, "weather-image-");
  weatherBg.classList.add(`weather-image-${code}`);

  // Обновляем классы для модального окна
  removeClasses(modal, "weather-image-");
  modal.classList.add(`weather-image-${code}`);
}

// Получаем иконки по коду
function getWeatherIcon(code) {
  const icons = {
    0: "☀️",
    1: "🌤️",
    2: "⛅",
    3: "☁️",
    45: "🌫️",
    48: "🌫️",
    51: "🌧️",
    53: "🌧️",
    55: "🌧️",
    56: "🌧️",
    57: "🌧️",
    61: "🌧️",
    63: "🌧️",
    65: "⛈️",
    66: "🌧️",
    67: "🌧️",
    71: "❄️",
    73: "❄️",
    75: "❄️",
    77: "❄️",
    80: "🌧️",
    81: "🌧️",
    82: "⛈️",
    85: "❄️",
    86: "❄️",
    95: "⛈️",
    96: "⛈️",
    99: "⛈️",
  };
  return icons[code] || "❓";
}

// Запуск
fetchWeather();

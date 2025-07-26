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
    weatherBg.style.backgroundImage = getWeatherImage(weather_code);
    weatherCart.style.background = getWeatherBackground(weather_code);
    maxTempEl.textContent = `H: ${Math.round(maxTemp)}°`;
    minTempEl.textContent = `T: ${Math.round(minTemp)}°`;
    renderHourlyForecast(hourly);
    renderDailyForecast(weatherInfo.daily);
  } catch (error) {
    console.error("Fehler beim Abrufen der Wetterdaten:", error);
    cityEl.textContent = "Standort nicht verfügbar";
    temperature.textContent = "-- °C";
    weatherDescriptionEl.textContent = "Daten nicht verfügbar";
  }
}

// Функция прогноза на 24 часа
function renderHourlyForecast(hourlyData) {
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
    timeElement.textContent = formatHour(time, i === currentHour);

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

  // Получаем текущую дату
  const today = new Date();

  // Проходим по всем дням (максимум 10)
  for (let i = 0; i < dailyData.time.length; i++) {
    const date = new Date(dailyData.time[i]);
    const dayName = getDayName(date, i, today);

    const dailyItem = document.createElement("div");
    dailyItem.className = "daily-item";

    // Форматируем дату
    const dateElement = document.createElement("div");
    dateElement.className = "daily-date";
    dateElement.textContent = dayName;

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

// Функция для получения подробного прогноза в модальном окне по клику
function showDailyDetails(dailyData, index) {
  const date = new Date(dailyData.time[index]);
  const formattedDate = formatDetailDate(date, index);

  modalTitle.textContent = formattedDate;
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
  modal.style.background = getWeatherImage(dailyData.weather_code[index]);
  modal.style.display = "block";
  renderTempChart(dailyData, index);
}

// Функция для форматирования даты в модальном окне
function formatDetailDate(date, index) {
  const days = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
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
  const year = date.getFullYear();
  const dayName = days[date.getDay()];

  if (index === 0) {
    return `Heute - ${dayName}, ${day}. ${month} ${year}`;
  } else if (index === 1) {
    return `Morgen - ${dayName}, ${day}. ${month} ${year}`;
  }

  return `${dayName}, ${day}. ${month} ${year}`;
}

// Функция для получения названия дня недели сокр.
function getDayName(date, index, today) {
  const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  // Для сегодняшнего дня
  if (index === 0) {
    return "Heute";
  }

  // Для завтрашнего дня
  if (index === 1) {
    return "Morgen";
  }

  // Остальные дни
  return `${days[date.getDay()]}, ${day}. ${month}. ${year}`;
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

// Создаем фон по коду
function getWeatherBackground(code) {
  const backgrounds = {
    0: "linear-gradient(135deg, rgb(135 206 235 / 60%), rgb(30 144 255 / 29%))", // ясно
    1: "linear-gradient(135deg, rgb(182 142 105 / 25%), rgb(244 239 221))", // преимущественно ясно
    2: "linear-gradient(135deg, rgb(25 89 110 / 24%), rgb(119 136 153 / 37%))", // частично облачно
    3: "linear-gradient(135deg, rgb(119 136 153 / 27%), rgb(105 105 105 / 35%))", // облачно
    45: "linear-gradient(135deg, rgb(211 211 211 / 55%), rgb(169, 169, 169))", // туман
    48: "linear-gradient(135deg, rgb(211 211 211 / 31%), rgb(169 169 169 / 67%))", // инейный туман
    51: "linear-gradient(135deg, rgb(70 130 180 / 62%), rgb(95 158 160 / 34%))", // слабая морось
    53: "linear-gradient(135deg, rgb(70 130 180 / 11%), rgb(95 158 160 / 43%))", // умеренная морось
    55: "linear-gradient(135deg, rgb(210 223 235 / 62%), rgb(105 128 129 / 75%))", // сильная морось
    56: "linear-gradient(135deg, rgb(146 146 146 / 41%), rgb(77 101 83 / 65%))",
    57: "linear-gradient(135deg, rgb(181 188 205 / 59%), rgb(122 129 117 / 71%))",
    61: "linear-gradient(135deg, rgb(65 62 34 / 50%), rgb(211 196 165 / 78%))", // слабый дождь
    63: "linear-gradient(135deg, rgb(77 108 109 / 44%), rgb(178 197 200 / 74%))", // умеренный дождь
    65: "linear-gradient(135deg, rgb(71 92 89 / 61%), rgb(133 170 165 / 64%))", // сильный дождь
    66: "linear-gradient(135deg, rgb(159 166 178 / 57%), rgb(137 143 158 / 38%))",
    67: "linear-gradient(135deg, rgb(61 99 101 / 58%), rgb(183 202 208 / 54%))",
    71: "linear-gradient(135deg, rgb(97 106 106 / 22%), rgb(191 195 203 / 61%))", // слабый снег
    73: "linear-gradient(135deg, rgb(25 27 79 / 64%), rgb(114 129 134 / 62%))", // умеренный снег
    75: "linear-gradient(135deg, rgb(193 219 251 / 89%), rgb(141 158 211 / 65%))", // сильный снег
    77: "linear-gradient(135deg, rgb(230 233 234 / 61%), rgb(181 189 200 / 65%))",
    80: "linear-gradient(135deg, rgb(193 200 204 / 27%), rgb(80 135 150 / 82%))", // слабые ливни
    81: "linear-gradient(135deg, rgb(135 129 135 / 75%), rgb(148 143 145 / 69%))", // умеренные ливни
    82: "linear-gradient(135deg, rgb(190 189 191 / 85%), rgb(119 119 95 / 55%))", // сильные ливни
    85: "linear-gradient(135deg, rgb(202 224 245 / 74%), rgb(130 142 172 / 45%))", // снегопады
    86: "linear-gradient(135deg, rgb(82 87 94 / 50%), rgb(117 156 191 / 46%))", // сильные снегопады
    95: "linear-gradient(135deg, rgb(78 79 73 / 51%), rgb(231 173 105 / 52%))", // гроза
    96: "linear-gradient(135deg, rgb(126 132 156 / 61%), rgb(43 44 48 / 51%))", // гроза с градом
    99: "linear-gradient(135deg, rgb(178 177 185 / 47%), rgb(51 49 55 / 48%))", // сильная гроза с градом
  };

  return backgrounds[code] || "linear-gradient(135deg, #6e8efb, #a777e3)";
}

// Получаем изображения по коду
function getWeatherImage(code) {
  const images = {
    0: 'url("../../../assets/weather-app/images/0.jpeg")',
    1: 'url("../../../assets/weather-app/images/1.jpeg")',
    2: 'url("../../../assets/weather-app/images/2.jpeg")',
    3: 'url("../../../assets/weather-app/images/3.jpeg")',
    45: 'url("../../../assets/weather-app/images/45.jpeg")',
    48: 'url("../../../assets/weather-app/images/48.jpeg")',
    51: 'url("../../../assets/weather-app/images/51.jpeg")',
    53: 'url("../../../assets/weather-app/images/53.jpeg")',
    55: 'url("../../../assets/weather-app/images/55.jpeg")',
    56: 'url("../../../assets/weather-app/images/56.jpeg")',
    57: 'url("../../../assets/weather-app/images/57.jpeg")',
    61: 'url("../../../assets/weather-app/images/61.jpeg")',
    63: 'url("../../../assets/weather-app/images/63.jpeg")',
    65: 'url("../../../assets/weather-app/images/65.jpeg")',
    66: 'url("../../../assets/weather-app/images/66.jpeg")',
    67: 'url("../../../assets/weather-app/images/63.jpeg")',
    71: 'url("../../../assets/weather-app/images/71.jpeg")',
    73: 'url("../../../assets/weather-app/images/73.jpeg")',
    75: 'url("../../../assets/weather-app/images/75.jpeg")',
    77: 'url("../../../assets/weather-app/images/77.jpeg")',
    80: 'url("../../../assets/weather-app/images/80.jpeg")',
    81: 'url("../../../assets/weather-app/images/81.jpeg")',
    82: 'url("../../../assets/weather-app/images/82.jpeg")',
    85: 'url("../../../assets/weather-app/images/85.jpeg")',
    86: 'url("../../../assets/weather-app/images/86.jpeg")',
    95: 'url("../../../assets/weather-app/images/95.jpeg")',
    96: 'url("../../../assets/weather-app/images/96.jpeg")',
    99: 'url("../../../assets/weather-app/images/99.jpeg")',
  };

  return images[code] || images[0];
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

// Форматируем дату
function formatHour(date, isCurrent) {
  const hour = date.getHours();
  return isCurrent ? "Jetzt" : `${hour}:00`;
}

// Запуск
fetchWeather();

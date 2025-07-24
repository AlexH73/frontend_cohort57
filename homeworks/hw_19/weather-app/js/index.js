const cityEl = document.getElementById("city");
const temperature = document.getElementById("temperature");
const gusts = document.getElementById("gusts");
const wind = document.getElementById("wind");
const coordinatesEl = document.getElementById("coordinates");
const windDirectionEl = document.getElementById("wind-direction");
const weatherDescriptionEl = document.getElementById("weather-description");
const windArrowEl = document.getElementById("wind-arrow");

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
    // я нашел ка управлять округлением 😀😊😉 
    coordinatesEl.textContent = `${latitude.toFixed(4)}, ${longitude.toFixed(
      4
    )}`;

    // Запрос погоды по локации
    const { data: weatherInfo } = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code&timezone=auto`
    );

    const { current_units, current } = weatherInfo;
    const {
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

    // Обновляем вывод
    temperature.textContent = `${Math.round(temperature_2m)}${tempUnit}`;
    gusts.textContent = `${Math.round(wind_gusts_10m)}${gustsUnit}`;
    wind.textContent = `${Math.round(wind_speed_10m)}${speedUnit}`;
    windDirectionEl.textContent = getWindDirection(wind_direction_10m);
    weatherDescriptionEl.textContent = interpretWeatherCode(weather_code);
  } catch (error) {
    console.error("Fehler beim Abrufen der Wetterdaten:", error);
    cityEl.textContent = "Standort nicht verfügbar";
    temperature.textContent = "-- °C";
    weatherDescriptionEl.textContent = "Daten nicht verfügbar";
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

function getWindDirection(degrees) {
  const directions = ["N", "NO", "O", "SO", "S", "SW", "W", "NW"];
  const index = Math.round((degrees % 360) / 45) % 8;

  // Поворачиваем стрелку по направлению ветра
  if (windArrowEl) {
    windArrowEl.style.transform = `rotate(${degrees}deg)`;
  }

  return directions[index];
}

// Запуск
fetchWeather();

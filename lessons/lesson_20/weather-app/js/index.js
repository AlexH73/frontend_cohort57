const cityEl = document.getElementById("city");
const temperature = document.getElementById("temperature");
const gusts = document.getElementById("gusts");
const wind = document.getElementById("wind");
const codeEl = document.getElementById("code");
const ctx = document.getElementById("myChart");

async function fetchWeather() {
  const { data } = await axios.get(
    "https://api.bigdatacloud.net/data/reverse-geocode-client"
  );
  //   console.log(data);
  const { city, latitude, longitude } = data;

  cityEl.textContent = city;
  //
  console.log(city, latitude, longitude);

  // Сделайте запрос
  //   https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code
  //  замените координаты и выведите в консоль всю полученную информацию
  const { data: weatherInfo } = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code`
  );

  const { current_units, current, hourly } = weatherInfo;
  const { temperature_2m, wind_gusts_10m, wind_speed_10m, weather_code } =
    current;
  const {
    temperature_2m: tempUnit,
    wind_gusts_10m: gustsUnit,
    wind_speed_10m: speedUnit,
  } = current_units;

  temperature.textContent += temperature_2m + tempUnit;
  gusts.textContent = wind_gusts_10m + gustsUnit;
  wind.textContent = wind_speed_10m + speedUnit;

  codeEl.textContent = interprete(weather_code); // код погоды
  // принимает числовой код -> строка с расшифровкой

  const { temperature_2m: temperatures, time: times } = hourly;
  new Chart(ctx, {
    type: "line",
    data: {
      labels: times,
      datasets: [
        {
          label: "Temperature",
          data: temperatures,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function interpreteWeatherCode(code) {}

fetchWeather();

// const dog = {
//   nickname: "Tyson",
//   age: 5,
//   isBoy: true,
//   favToy: {
//     type: "ball",
//   },
// };

// const { age, favToy } = dog; // деструктуризация destructuring assignment ES6
// const { type } = favToy;

// // const age = dog.age;
// console.log(age);

// console.log(type);

//Примитивные типы: string, number, boolean, null, undefined, bigint, symbol
let x = 10;
let y = 12n; // постфикс

// NaN - это одно из значений типа number

// 0	Clear sky
// 1 Mainly clear
// 2 partly cloudy
// 3 overcast
// 45 Fog
// 48 depositing rime fog
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity
// 56, 57	Freezing Drizzle: Light and dense intensity
// 61, 63, 65	Rain: Slight, moderate and heavy intensity
// 66, 67	Freezing Rain: Light and heavy intensity
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
// 77	Snow grains
// 80, 81, 82	Rain showers: Slight, moderate, and violent
// 85, 86	Snow showers slight and heavy
// 95 *	Thunderstorm: Slight or moderate
// 96, 99 *	Thunderstorm with slight and heavy hail

// const codesAndInterpretations = new Map();
// codesAndInterpretations.set(0, "Clear sky");
// codesAndInterpretations.set(1, "Mainly clear");
// codesAndInterpretations.set(2, "Overcast");

// codesAndInterpretations.get(2);

// new Set();

function interprete(code) {
  const codesAndInterpretations = {
    0: "Clear sky",
    1: "Mainly cloudy",
    2: "Partly cloudy",
    3: "Bewölkt",
    45: "Nebel",
    48: "Eisnebel",
    51: "Leichter Nieselregen",
    53: "Mäßiger Nieselregen",
    55: "Starker Nieselregen",
    61: "Leichter Regen",
    63: "Mäßiger Regen",
    65: "Starker Regen",
    66: "Gefrierender leichter Regen",
    67: "Gefrierender starker Regen",
    71: "Leichter Schneefall",
    73: "Mäßiger Schneefall",
    75: "Starker Schneefall",
    77: "Schneekörner",
    80: "Leichter Regenschauer",
    81: "Mäßiger Regenschauer",
    82: "Heftiger Regenschauer",
    85: "Leichter Schneeschauer",
    86: "Heftiger Schneeschauer",
    95: "Gewitter",
    96: "Gewitter mit leichtem Hagel",
    99: "Gewitter mit starkem Hagel",
  };

  return codesAndInterpretations[code] || "Wrong code";
}

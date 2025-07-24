const cityEl = document.getElementById("city");
const temperature = document.getElementById("temperature");
const gusts = document.getElementById("gusts");
const wind = document.getElementById("wind");

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

  const { current_units, current } = weatherInfo;
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

  console.log(weather_code); // код погоды
  // принимает числовой код -> строка с расшифровкой
}

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

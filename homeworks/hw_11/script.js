// ! === Задание 1 === ///
// массив объектов:
const starWarsHeroes = [
  { name: "Anakin Skywalker", age: 30, isJedi: true },
  { name: "Luke Skywalker", age: 25, isJedi: true },
  { name: "Han Solo", age: 35, isJedi: false },
  { name: "Princess Leia", age: 30, isJedi: false },
  { name: "Obi-Wan Kenobi", age: 60, isJedi: true },
];

// Создаем новый массив с джедаями младше 40 лет 
const warsHeroesAges = starWarsHeroes.filter((el) => el.age < 40);

// Посчет возраста всех с джедаев
sumOfAges = starWarsHeroes.reduce((acc, el) => acc + el.age, 0);

// Повышаем возраст героев на 10 лет
const updatedAgesHeroes = starWarsHeroes.map((el) => ({
  ...el,
  age: el.age + 10,
}));

// Создаем новый массив и меняем указанную персону
const updatedStarWarsHeroes = starWarsHeroes.map((el) =>
  el.name === "Anakin Skywalker"
    ? { name: "Darth Vader", age: 50, isJedi: false }
    : el
);

// Создаем новый массив, наполняем его указанными элементами из старого
const namesAndIsJedi = starWarsHeroes.map((el) => ({
  name: el.name,
  isJedi: el.isJedi,
}));

console.log(namesAndIsJedi);

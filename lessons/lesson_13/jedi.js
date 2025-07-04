// Используйте методы массивов.

// 1.2 Создайте новый массив с джедаями младше 40 лет

// 1.3 Посчитайте возраст всех джедаев

// 1.4 Повысьте возраст героев на 10 лет

// 1.5 Создайте новый массив, где "Anakin Skywalker" заменен на:
// `{ name: "Darth Vader", isJedi: false, age: 30 }`

// 1.6 Создайте на основе старого массива новый массив объектов по образу:
// `[{ name: "Luke Skywalker", isJedi: true }, { name: "Han Solo", isJedi: false }, ...]`

const starWarsHeroes = [
  { name: "Anakin Skywalker", age: 30, isJedi: true },
  { name: "Luke Skywalker", age: 25, isJedi: true },
  { name: "Han Solo", age: 35, isJedi: false },
  { name: "Princess Leia", age: 30, isJedi: false },
  { name: "Obi-Wan Kenobi", age: 60, isJedi: true },
];

// * 1.2 filter()

// * длинная запись
// const youngJedi = starWarsHeroes.filter(el => (el.isJedi === true) && (el.age < 40))

// * короткая запись
const youngJedi = starWarsHeroes.filter((el) => el.isJedi && el.age < 40);

// * 1.3 filter() + reduce()

const jediAge = starWarsHeroes
  .filter((el) => el.isJedi)
  .reduce((acc, el) => acc + el.age, 0);

// * 1.4 map() + ...spread operator
// копируем все сво-ва массива и изменяем только нужные из них

const olderHeroes = starWarsHeroes.map((el) => ({ ...el, age: el.age + 10 }));

// * 1.5 map() + ...spread operator + ternary operator

const sithRevenge = starWarsHeroes.map((el) =>
  el.name === "Anakin Skywalker"
    ? { ...el, name: "Darth Vader", isJedi: false }
    : el
);

// * 1.6 map()

const shortHeroes = starWarsHeroes.map((el) => ({
  name: el.name,
  isJedi: el.isJedi,
}));

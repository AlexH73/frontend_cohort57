// Spread syntax - синтаксис "распыление"

// ...

// При работе с примитивными типами данных - мы храним в переменной значение

let str1 = "hello";
let str2 = str1;

str1 = "Good";

// console.log(str1);
// console.log(str2);

const fruits = ["apple", "mango", "orange"];
const fruits2 = fruits;

fruits[0] = "banana";

// console.log(fruits);
// console.log(fruits2);

// Как скопировать элементы массива в новый массив

const cars = ["BMW", "Audi", "Mercedes"];

const carsCopy = [...cars];
carsCopy[0] = "Opel";
// console.log(cars);
// console.log(carsCopy);

// Как объединить два массива в третий с помощью spread

const cities1 = ["Berlin", "Paris"];
const cities2 = ["London", "Budapest"];
const joinedCities = [...cities2, ...cities1];
// console.log(joinedCities);

// Мы можем создать массив и добавить в него элемент
const vegetables = ["cucumber","tomato"];
const newVegetables = [...vegetables, "carrot"];
console.log(newVegetables);

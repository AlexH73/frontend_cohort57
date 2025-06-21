// Вывод в консоль
// console.log("hello world")

// Создание переменных
// const, let, и var

let dog = "Тузик";
dog = "Шарик";
//console.log(dog);

let bird;
bird = "Woody";

const car = "Audi";
//car = "Tesla"
//! TypeError: Assignment to constant variable.
//console.log(car);

var age = 52;

// Примитивные типы данных
// 1. string - является примитивом

let str1 = "Можно в двойных ковычках";
let str2 = "Можно в одинарных";

let str3 = "13";
let str4 = str1 + ", " + str2.toLowerCase();

//console.log(str1.toUpperCase());

//console.log(str4);

// 2. Number
let num1 = 9;
let num2 = 9.6;

// 3. bigInt
let num3 = 1239n; // больший диапазон, чем у number

// 4. Boolean
let isDrunk = true;

// условная кострукция
// if (isDrunk) {
//     console.log("Ты пьян");
// }

const result = isDrunk ? "Ты пьян!!" : "Ты не пьян";

// console.log(result);

// 5. undefined

let my_name;
//console.log(my_name);

//6. null - отсутствие значения
let empty = null;

console.log(empty);

// 7. symbol
// Новый тип,раньше его не было и сейчас остается малопопулярным
// Используется для создания уникальных значений внутри программы
let s1 = Symbol("something");
console.log(s1);const num7 = Number("129&8*#");
